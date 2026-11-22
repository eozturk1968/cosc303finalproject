// Benchmark for AI (AI vs random)

import { minimax, is_game_over, simulate_move, evaluate_board } from "./ai.js";

const INITIAL_BOARD = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
const P1_GOAL = 6;  // Human / Random side: pits 0..5, goal 6
const P2_GOAL = 13; // AI (maximizing) side: pits 7..12, goal 13
const AI_DEPTH = 1;
const GAMES = 100;

function get_legal_pits(board, is_ai) {
    const start = is_ai ? P1_GOAL + 1 : 0;
    const end = is_ai ? P2_GOAL : P1_GOAL;
    const legal = [];
    for (let i = start; i < end; i++) {
        if (board[i] > 0) legal.push(i);
    }
    return legal;
}

function sweep_remaining(board) {
    const swept = [...board];
    let p1_rem = 0;
    for (let i = 0; i < P1_GOAL; i++) {
        p1_rem += swept[i];
        swept[i] = 0;
    }

    let p2_rem = 0;
    for (let i = P1_GOAL + 1; i < P2_GOAL; i++) {
        p2_rem += swept[i];
        swept[i] = 0;
    }

    swept[P1_GOAL] += p1_rem;
    swept[P2_GOAL] += p2_rem;
    return swept;
}

function pick_random_move(board, is_ai) {
    const legal = get_legal_pits(board, is_ai);
    if (legal.length === 0) return null;
    const idx = Math.floor(Math.random() * legal.length);
    return legal[idx];
}

function play_single_game({ ai_depth = AI_DEPTH, ai_starts = false, max_turns = 300 }) {
    let board = [...INITIAL_BOARD];
    let is_ai_turn = ai_starts;
    let turns = 0;
    let ai_think_ms = 0;

    while (!is_game_over(board) && turns < max_turns) {
        turns++;

        if (is_ai_turn) {
            const legal = get_legal_pits(board, true);
            if (legal.length === 0) break;

            const t0 = performance.now();
            const res = minimax(board, ai_depth, true);
            ai_think_ms += performance.now() - t0;

            const move = legal.includes(res.move) ? res.move : legal[0];
            const sim = simulate_move(move, board, true);
            board = sim.new_board;

            if (!sim.landed_in_store) {
                is_ai_turn = false;
            }
        } else {
            const move = pick_random_move(board, false);
            if (move === null) break;

            const sim = simulate_move(move, board, false);
            board = sim.new_board;

            if (!sim.landed_in_store) {
                is_ai_turn = true;
            }
        }
    }

    const final_board = sweep_remaining(board);
    const p1_score = final_board[P1_GOAL]; // Random / P1
    const p2_score = final_board[P2_GOAL]; // AI / P2

    let outcome = "tie";
    if (p2_score > p1_score) outcome = "ai_win";
    else if (p1_score > p2_score) outcome = "random_win";

    return {
        outcome,
        p1_score,
        p2_score,
        score_diff: p2_score - p1_score,
        turns,
        ai_think_ms,
        final_eval: typeof evaluate_board === "function" ? evaluate_board(final_board) : null,
    };
}

function run_benchmark({ games = 50, ai_depth = AI_DEPTH, alternate_starter = true }) {
    let ai_wins = 0;
    let random_wins = 0;
    let ties = 0;
    let total_ai_diff = 0;
    let total_ai_ms = 0;
    let total_turns = 0;

    for (let g = 0; g < games; g++) {
        const ai_starts = alternate_starter ? g % 2 === 1 : false;
        const stats = play_single_game({ ai_depth, ai_starts });

        if (stats.outcome === "ai_win") ai_wins++;
        else if (stats.outcome === "random_win") random_wins++;
        else ties++;

        total_ai_diff += stats.score_diff;
        total_ai_ms += stats.ai_think_ms;
        total_turns += stats.turns;
    }

    const win_rate = ((ai_wins / games) * 100).toFixed(1);
    const avg_diff = (total_ai_diff / games).toFixed(2);
    const avg_turns = (total_turns / games).toFixed(1);
    const avg_game_ai_ms = (total_ai_ms / games).toFixed(1);

    console.log("=== AI vs. Random Benchmark ===");
    console.log(`Games: ${games} | AI Depth: ${ai_depth} (max=true, pits 7-12, goal 13)`);
    console.log(`AI Wins: ${ai_wins} (${win_rate}%) | Random Wins: ${random_wins} | Ties: ${ties}`);
    console.log(`Avg Score Diff (AI - Random): ${avg_diff >= 0 ? "+" : ""}${avg_diff}`);
    console.log(`Avg Turns/Game: ${avg_turns} | Avg AI Search Time/Game: ${avg_game_ai_ms} ms`);
}

run_benchmark({ games: GAMES, ai_depth: AI_DEPTH, alternate_starter: true });
