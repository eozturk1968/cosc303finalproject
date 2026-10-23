// test_mancala.js — basic checks for mancala.js
// Run: node test_mancala.js
const assert = require("assert");
const { Mancala } = require("./mancala.js");

// 1. Initial state
let g = new Mancala();
assert.strictEqual(g.board.reduce((a, b) => a + b), 48);
assert.strictEqual(g.current, 0);

// 2. Extra turn: pit 2 has 4 seeds -> last lands in store (index 6)
g.move(2);
assert.strictEqual(g.board[6], 1);
assert.strictEqual(g.current, 0, "should get extra turn");

// 3. Invalid moves rejected
assert.strictEqual(g.move(2), false, "empty pit");
assert.strictEqual(g.move(8), false, "opponent's pit");

// 4. Normal move switches turn
g.move(0);
assert.strictEqual(g.current, 1);

// 5. Capture
g = new Mancala();
g.board = [1,0,0,0,0,0, 0, 0,0,0,5,3,0, 0];  // opposite of pit 1 is 11
g.move(0);               // 1 seed -> lands in empty pit 1, captures pit 11
assert.strictEqual(g.board[6], 4, "captured 3 + 1");
assert.strictEqual(g.board[11], 0);

// 6. Seed conservation over a random game
g = new Mancala();
while (!g.over) {
  const [lo, hi] = g.pitRange(g.current);
  const moves = [];
  for (let p = lo; p <= hi; p++) if (g.isValidMove(p)) moves.push(p);
  g.move(moves[Math.floor(Math.random() * moves.length)]);
  assert.strictEqual(g.board.reduce((a, b) => a + b), 48);
}
assert.ok([0, 1, -1].includes(g.winner()));

console.log("All tests passed.");
console.log(g.toString());
