import { score }          from './ai.js'
import { selectBestMove } from './ai.js'

function runTests() {
    console.log("Running AI Tests...");

    // Test Case 1: Standard starting board
    let board1 = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    let t1     = selectBestMove(board1);
    console.log("Move: " + t1.move + " | Score: " + t1.score + "\n");
}

runTests();
