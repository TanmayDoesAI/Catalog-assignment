// STEP 1: Reading the input and parsing it
const fs = require('fs');

const testInput = fs.readFileSync('input0.json', 'utf8');  
const data = JSON.parse(testInput);

// Read number of roots (n) and minimum required roots (k)
const n = data.keys.n;
const k = data.keys.k;

// Extract roots
const roots = [];
for (const key in data) {
  if (key !== 'keys') {
    roots.push({
      x: parseInt(key),
      base: parseInt(data[key].base),
      value: data[key].value
    });
  }
}

// STEP 2: Decode the Y values from different bases
const decodedYValues = roots.map(root => parseInt(root.value, root.base));

// STEP 3: Find constant term (c) using Lagrange interpolation
function findConstantTerm(xValues, yValues) {
  let constantTerm = 0;
  
  for (let i = 0; i < k; i++) {
    let term = yValues[i];
    
    for (let j = 0; j < k; j++) {
      if (i !== j) {
        term *= -xValues[j] / (xValues[i] - xValues[j]);
      }
    }
    
    constantTerm += term;
  }
  
  return constantTerm;
}

const xValues = roots.slice(0, k).map(root => root.x);
const yValues = decodedYValues.slice(0, k);

const constantTerm = findConstantTerm(xValues, yValues);

// printing and writing result to output.txt
console.log('Constant term (c):', constantTerm);

fs.writeFileSync('output0.txt', `Constant term (c): ${constantTerm}\n`);
