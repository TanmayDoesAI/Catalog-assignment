// STEP 1: Reading the input and parsing it
const fs = require('fs');
const math = require('mathjs');

// Read the test input file (change the filename as needed)
const testInput = fs.readFileSync('input1.json', 'utf8'); 
const data = JSON.parse(testInput);

// Read number of roots (n) and minimum required roots (k)
const n = data.keys.n;
const k = data.keys.k;

// Compute the degree of the polynomial
const degree = k - 1;

// Extract and decode all roots
const points = [];
for (const key in data) {
  if (key !== 'keys') {
    const x = parseInt(key);
    const base = parseInt(data[key].base);
    const value = data[key].value;
    const y = parseInt(value, base);
    points.push({ x: x, y: y });
  }
}

// STEP 2: Setting up the matrices for least squares fitting
const A = [];
const yValues = [];

for (let i = 0; i < points.length; i++) {
  const x = points[i].x;
  const yValue = points[i].y;
  const row = [];
  // Change: Build the matrix with powers from 0 to degree
  for (let j = 0; j <= degree; j++) {
    row.push(Math.pow(x, j));
  }
  A.push(row);
  yValues.push(yValue);
}

// Convert A and yValues to math.js matrices
const A_matrix = math.matrix(A);
const y_matrix = math.matrix(yValues);

// Compute (A^T * A) and (A^T * y)
const AT = math.transpose(A_matrix);
const ATA = math.multiply(AT, A_matrix);
const ATy = math.multiply(AT, y_matrix);

// Solve for coefficients using least squares (normal equations)
const coeffs = math.lusolve(ATA, ATy);
const coeffsArray = coeffs.toArray().flat();

// Print the coefficients
console.log('Coefficients:');
coeffsArray.forEach((coeff, index) => {
  console.log(`c${index} = ${coeff}`);
});

// STEP 3: Calculating residuals to identify incorrect roots
const residualsData = [];

for (let i = 0; i < points.length; i++) {
  const x = points[i].x;
  const yActual = points[i].y;
  let yPredicted = 0;
  // Change: Use powers from 0 to degree to match coefficients
  for (let j = 0; j <= degree; j++) {
    yPredicted += coeffsArray[j] * Math.pow(x, j);
  }
  const residual = Math.abs(yActual - yPredicted);
  residualsData.push({ x: x, y: yActual, residual: residual });
}

// Compute mean and standard deviation of residuals
const residuals = residualsData.map(data => data.residual);
const residualsMean = residuals.reduce((a, b) => a + b, 0) / residuals.length;
const residualsStd = Math.sqrt(
  residuals.reduce((a, b) => a + Math.pow(b - residualsMean, 2), 0) / residuals.length
);

// Adjust the threshold for small datasets
const threshold = residualsMean + residualsStd;

// Identify possible incorrect roots based on the threshold
const incorrectRoots = residualsData.filter(data => data.residual > threshold);

// Output the residuals and threshold for debugging
console.log('\nResiduals for all points:');
residualsData.forEach(data => {
  console.log(`Point x=${data.x}, y=${data.y}, residual=${data.residual}`);
});
console.log(`Residuals Mean: ${residualsMean}`);
console.log(`Residuals Std Deviation: ${residualsStd}`);
console.log(`Threshold: ${threshold}\n`);

// Output the possible incorrect roots
console.log('Possible incorrect roots (residuals greater than threshold):');
incorrectRoots.forEach(data => {
  console.log(`Point x=${data.x}, y=${data.y}, residual=${data.residual}`);
});

// Write the results to 'output.txt'
let output = 'Possible incorrect roots (residuals greater than threshold):\n';
incorrectRoots.forEach(data => {
  output += `Point x=${data.x}, y=${data.y}, residual=${data.residual}\n`;
});

fs.writeFileSync('output.txt', output);
