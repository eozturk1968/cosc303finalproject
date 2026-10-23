const PITS = 6;
const SEEDS = 4;
const STORE = [6, 13];
 
class Mancala {
  constructor(seeds = SEEDS) {
    this.board = Array(14).fill(seeds);
    this.board[STORE[0]] = 0;
    this.board[STORE[1]] = 0;
    this.current = 0;      // whose turn: 0 or 1
    this.over = false;
  }
 
  pitRange(player) {
    const start = player === 0 ? 0 : 7;
    return [start, start + PITS - 1];
  }
 
  isValidMove(pit) {
    if (this.over) return false;
    const [lo, hi] = this.pitRange(this.current);
    return pit >= lo && pit <= hi && this.board[pit] > 0;
  }
 
  // Returns true if move was made.
  move(pit) {
    if (!this.isValidMove(pit)) return false;
 
    const player = this.current;
    const oppStore = STORE[1 - player];
    let seeds = this.board[pit];
    this.board[pit] = 0;
    let i = pit;
 
    // Sow seeds counter-clockwise, skipping opponent's store
    while (seeds > 0) {
      i = (i + 1) % 14;
      if (i === oppStore) continue;
      this.board[i]++;
      seeds--;
    }
 
    // Capture: last seed lands in own empty pit, opposite pit has seeds
    const [lo, hi] = this.pitRange(player);
    if (i >= lo && i <= hi && this.board[i] === 1) {
      const opp = 12 - i;
      if (this.board[opp] > 0) {
        this.board[STORE[player]] += this.board[opp] + 1;
        this.board[opp] = 0;
        this.board[i] = 0;
      }
    }
 
    this.checkGameOver();
 
    // Extra turn if last seed landed in own store
    if (!this.over && i !== STORE[player]) {
      this.current = 1 - player;
    }
    return true;
  }
 
  sideEmpty(player) {
    const [lo, hi] = this.pitRange(player);
    for (let p = lo; p <= hi; p++) if (this.board[p] > 0) return false;
    return true;
  }
 
  checkGameOver() {
    if (!this.sideEmpty(0) && !this.sideEmpty(1)) return;
    // Sweep remaining seeds into each owner's store
    for (const player of [0, 1]) {
      const [lo, hi] = this.pitRange(player);
      for (let p = lo; p <= hi; p++) {
        this.board[STORE[player]] += this.board[p];
        this.board[p] = 0;
      }
    }
    this.over = true;
  }
 
  winner() {
    if (!this.over) return null;
    const a = this.board[STORE[0]], b = this.board[STORE[1]];
    return a > b ? 0 : b > a ? 1 : -1;   // -1 = tie
  }
 
  toString() {
    const b = this.board;
    const top = b.slice(7, 13).reverse().map(n => String(n).padStart(2)).join(" ");
    const bot = b.slice(0, 6).map(n => String(n).padStart(2)).join(" ");
    return `    ${top}\n${String(b[13]).padStart(2)}                    ${b[6]}\n    ${bot}`;
  }
}
 
if (typeof module !== "undefined") module.exports = { Mancala, STORE };
