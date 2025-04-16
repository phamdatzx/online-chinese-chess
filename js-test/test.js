let arrayA = [
  [
    { a: 1, b: 2 },
    { c: 3, d: 4 },
  ],
  [
    { a: 3, b: 4 },
    { c: 3, d: 4 },
  ],
  [
    { a: 5, b: 6 },
    { c: 3, d: 4 },
  ],
];

let arrayB = arrayA.map((row) => [...row]);

arrayB[0][0].a = 100;

console.log(arrayA[0][0].a); // 100
