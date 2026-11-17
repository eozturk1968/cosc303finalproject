import { minimax, is_game_over, simulate_move, evaluate_board } from './ai.js';

// 1. Setup a standard starting Mancala board (4 stones in each pit, 0 in stores)
let test_board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];

console.log("--- INITIAL BOARD STATE ---");
console.log(test_board);

// 2. Test Depth 1 (Easy Mode equivalent)
let easy_decision = minimax(test_board, 1, true);
console.log("Easy Mode (Depth 1) Choice:", easy_decision);

// 3. Test Depth 3 (Medium Mode foresight)
let medium_decision = minimax(test_board, 3, true);
console.log("Medium Mode (Depth 3) Choice:", medium_decision);

// 4. Test Depth 5 (Hard Mode deep dive)
let hard_decision = minimax(test_board, 5, true);
console.log("Hard Mode (Depth 5) Choice:", hard_decision);

// A custom board where stones are heavily clustered
// Let's see how Depth 1 vs Depth 5 evaluates this
let tactical_board = [
  1, 6, 2, 0, 5, 3,  // P1 pits (0-5) + P1 store (6)
  2, 0, 4, 1, 3, 2,  // P2 pits (7-12) + P2 store (13)
  2                  // P2 store value
];

// Fix the array length to be explicitly 14
let test_board_14 = [1, 6, 2, 0, 5, 3, 2, 2, 0, 4, 1, 3, 2, 2];

console.log("--- TACTICAL TEST BOARD ---");
console.log("Easy (Depth 1):", minimax(test_board_14, 1, true));
console.log("Hard (Depth 5):", minimax(test_board_14, 5, true));
