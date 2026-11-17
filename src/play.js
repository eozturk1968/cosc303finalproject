import readline from 'node:readline/promises';
import { stdin as input, stdout as output } from 'node:process';
import { minimax, is_game_over, simulate_move } from './ai.js';

// Setup readline interface for terminal input
const rl = readline.createInterface({ input, output });

// Helper to render the Mancala board nicely in the console
function display_board(board) {
    const p2_pits = board.slice(7, 13).reverse(); // Reversed so left-to-right matches visual opponent row
    const p1_pits = board.slice(0, 6);
    const p1_store = board[6];
    const p2_store = board[13];

    console.log("\n========================================");
    console.log(` AI Store (P2): [ ${p2_store} ]`);
    console.log(` Opponent Pits:   ${p2_pits.join("  ")} (Indices 12 -> 7)`);
    console.log("----------------------------------------");
    console.log(` Your Pits:       ${p1_pits.join("  ")} (Indices 0 -> 5)`);
    console.log(` Your Store (P1): [ ${p1_store} ]`);
    console.log("========================================\n");
}

async function run_game() {
    console.log("Welcome to Terminal Mancala!");
    
    // Choose Difficulty
    console.log("Select Difficulty:");
    console.log("1. Easy   (Depth 1)");
    console.log("2. Medium (Depth 3)");
    console.log("3. Hard   (Depth 5)");
    
    const choice = await rl.question("Enter choice (1-3): ");
    let ai_depth = 1;
    if (choice === "2") ai_depth = 3;
    if (choice === "3") ai_depth = 5;

    console.log(`\nGame started! You are Player 1 (pits 0-5). AI is Player 2 (depth ${ai_depth}).`);

    let board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
    let is_maximizing = true; // true = Player 1 (Human), false = Player 2 (AI)

    while (!is_game_over(board)) {
        display_board(board);

        if (is_maximizing) {
            // --- HUMAN TURN ---
            let valid_move = false;
            let pit_index = -1;

            while (!valid_move) {
                const input_str = await rl.question("Your turn! Choose a pit (0 to 5): ");
                pit_index = parseInt(input_str.trim(), 10);

                if (isNaN(pit_index) || pit_index < 0 || pit_index > 5) {
                    console.log("Invalid input. Please enter a number between 0 and 5.");
                } else if (board[pit_index] === 0) {
                    console.log("That pit is empty! Choose another one.");
                } else {
                    valid_move = true;
                }
            }

            let result = simulate_move(pit_index, board, is_maximizing);
            board = result.new_board;

            if (result.landed_in_store) {
                console.log("✨ You landed in your store! You get an extra turn! ✨");
            } else {
                is_maximizing = false; 
            }

        } else {
            // --- AI TURN (WITH THOUGHT INSPECTION) ---
            console.log("🤖 AI is thinking...");

            const p1_goal = (board.length / 2) - 1;
            const p2_goal = board.length - 1;
            const start_pos = p1_goal + 1; // 7
            const end_pos = p2_goal;       // 13

            console.log("  ┌────────────────────────────────────────┐");
            console.log("  │         AI Candidate Analysis          │");
            console.log("  └────────────────────────────────────────┘");

            // Evaluate each candidate move at the root level to show reasoning
            for (let i = start_pos; i < end_pos; i++) {
                if (board[i] === 0) continue; // Skip empty pits

                let { new_board, landed_in_store } = simulate_move(i, board, false);
                let next_is_maximizing = landed_in_store ? false : true;
                let next_depth = (next_is_maximizing === false) ? ai_depth : ai_depth - 1;

                let eval_res = minimax(new_board, next_depth, next_is_maximizing);
                console.log(`    Pit ${i} (${board[i]} stones) ➔ Projected Score: ${eval_res.score}`);
            }
            console.log("  ──────────────────────────────────────────");

            // Get the actual best move decision from minimax
            let ai_result = minimax(board, ai_depth, is_maximizing);
            console.log(`  🎯 AI Final Decision: Played pit ${ai_result.move} (Score: ${ai_result.score})\n`);

            let result = simulate_move(ai_result.move, board, is_maximizing);
            board = result.new_board;

            if (result.landed_in_store) {
                console.log("✨ AI landed in its store and gets an extra turn! ✨");
            } else {
                is_maximizing = true; 
            }
        }
    }

    // --- GAME OVER ---
    display_board(board);
    console.log("=== GAME OVER ===");
    const final_p1 = board[6];
    const final_p2 = board[13];
    console.log(`Final Scores -> You: ${final_p1} | AI: ${final_p2}`);

    if (final_p1 > final_p2) {
        console.log("🎉 Congratulations, you won!");
    } else if (final_p2 > final_p1) {
        console.log("🤖 AI wins! Better luck next time.");
    } else {
        console.log("🤝 It's a tie!");
    }

    rl.close();
}

run_game();
