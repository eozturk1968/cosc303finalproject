import { score } from './ai.js';
import { selectBestMove } from './ai.js';

function runTests() {
    console.log("Running AI Tests...\n");

    // -------------------------------------------------------------
    // Test Case 1: Standard starting board
    // -------------------------------------------------------------
    let board1 = [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4];
    let t1 = selectBestMove(board1);
    console.log(`Test 1 (Standard): Move = ${t1.move} | Score = ${t1.score}`);
    
    if (t1.move >= 6 && t1.move <= 11) {
        console.log("Test 1 Passed: Move is within AI's side.\n");
    } else {
        console.error("Test 1 Failed: AI picked outside its side!\n");
    }


    // -------------------------------------------------------------
    // Test Case 2: Partial empty pits on the AI side
    // Pits 6, 7, and 8 are empty. AI must skip them and pick 9, 10, or 11.
    // -------------------------------------------------------------
    let board2 = [4, 4, 4, 4, 4, 4, 0, 0, 0, 4, 4, 4];
    let t2 = selectBestMove(board2);
    console.log(`Test 2 (Partial Empty): Move = ${t2.move} | Score = ${t2.score}`);

    if (t2.move >= 9 && t2.move <= 11) {
        console.log("Test 2 Passed: AI correctly skipped empty pits.\n");
    } else {
        console.error("Test 2 Failed: AI picked an empty pit or invalid index!\n");
    }


    // -------------------------------------------------------------
    // Test Case 3: All AI pits are empty (Edge case / No moves left)
    // -------------------------------------------------------------
    let board3 = [4, 4, 4, 4, 4, 4, 0, 0, 0, 0, 0, 0];
    let t3 = selectBestMove(board3);
    console.log(`Test 3 (All Empty): Move = ${t3.move} | Score = ${t3.score}`);

    if (t3.move === null) {
        console.log("Test 3 Passed: Handled no-moves gracefully.\n");
    } else {
        console.error("Test 3 Failed: Should have returned null when no moves available.\n");
    }

    console.log("All tests completed!");
}

runTests();
