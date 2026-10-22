import { score }          from './ai.js'
import { selectBestMove } from './ai.js'

function runTests() {
    console.log("Running AI Tests...");

    // Test Case 1: Standard starting board
    let board1 = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    let t1     = selectBestMove(board1);
    console.log("Move: " + t1.move + " | Score: " + t1.score + "\n");

    // Test Case 2: Partial empty pits on the AI side 
    let board2 = [0, 0, 0, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    let t2 = selectBestMove(board2);
    console.log("Test 2: Move " + t2.move + " | Score: " + t2.score);
    if (t2.move >= 3 && t2.move <= 5) {
        console.log(" Test 2 passed: AI skipped empty pits\n");
    } else console.error(" Test 2 failed: AI picked empty pit\n");


    // Test Case 3: All AI pits empty
    let board3 = [0, 0, 0, 0, 0, 0, 0, 4, 4, 4, 4, 4, 4, 0];
    let t3 = selectBestMove(board3);
    console.log(`Test 3 (All Empty): Move = ${t3.move} | Score = ${t3.score}`);

    if (t3.move === null) {
        console.log(" Test 3 Passed: Handled no-moves gracefully.\n");
    } else {
        console.error(" Test 3 Failed: Should have returned null when no moves available.\n");
    }

    // Test 4: End on goal or empty pit; should choose empty pit move
    let board4 = [3, 3, 3, 0, 1, 1, 0, 4, 4, 4, 4, 4, 4, 0];
    let t4 = selectBestMove(board4);
    console.log("Test 4 (Selection): Move: " + t4.move + " | Score: " + t4.score);

    if (t4.move == 0) console.log(" Test 4 Passed: Best move selected\n");
    else console.log(" Test 4 Failed: Different move selected\n");

}

runTests();
