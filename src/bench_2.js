// Benchmark for AI vs. AI at different depths

import { minimax, is_game_over, simulate_move, evaluate_board } from "./ai.js";

const INITIAL_BOARD = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
const P1_GOAL = 6;  // Shallow AI (minimizing): pits 0..5, goal 6
const P2_GOAL = 13; // Deep AI (maximizing): pits 7..12, goal 13

function get_legal_pits(board, is_p2) {
    const start = is_p2 ? P1_GOAL + 1 : 0;
    const end = is_p2 ? P2_GOAL : P1_GOAL;
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

function play_single_game({ p1_depth, p2_depth, p2_starts = false, max_turns = 300 }) {
    let board = [...INITIAL_BOARD];
    let is_p2_turn = p2_starts;
    let turns = 0;
    let p1_think_ms = 0;
    let p2_think_ms = 0;

    while (!is_game_over(board) && turns < max_turns) {
        turns++;

        if (is_p2_turn) {
            const legal = get_legal_pits(board, true);
            if (legal.length === 0) break;

            const t0 = performance.now();
            // P2 is maximizing (true)
            const res = minimax(board, p2_depth, true);
            p2_think_ms += performance.now() - t0;

            const move = legal.includes(res.move) ? res.move : legal[0];
            const sim = simulate_move(move, board, true);
            board = sim.new_board;

            if (!sim.landed_in_store) {
                is_p2_turn = false;
            }
        } else {
            const legal = get_legal_pits(board, false);
            if (legal.length === 0) break;

            const t0 = performance.now();
            // P1 is minimizing (false)
            const res = minimax(board, p1_depth, false);
            p1_think_ms += performance.now() - t0;

            const move = legal.includes(res.move) ? res.move : legal[0];
            const sim = simulate_move(move, board, false);
            board = sim.new_board;

            if (!sim.landed_in_store) {
                is_p2_turn = true;
            }
        }
    }

    const final_board = sweep_remaining(board);
    const p1_score = final_board[P1_GOAL];
    const p2_score = final_board[P2_GOAL];

    let outcome = "tie";
    if (p2_score > p1_score) outcome = "p2_win";
    else if (p1_score > p2_score) outcome = "p1_win";

    return {
        outcome,
        p1_score,
        p2_score,
        score_diff: p2_score - p1_score,
        turns,
        p1_think_ms,
        p2_think_ms,
        final_eval: typeof evaluate_board === "function" ? evaluate_board(final_board) : null,
    };
}

function run_depth_matchup({ games = 20, p1_depth = 2, p2_depth = 4, alternate_starter = true }) {
    let p2_wins = 0;
    let p1_wins = 0;
    let ties = 0;
    let total_diff = 0;
    let total_p1_ms = 0;
    let total_p2_ms = 0;
    let total_turns = 0;

    for (let g = 0; g < games; g++) {
        const p2_starts = alternate_starter ? g % 2 === 1 : false;
        const stats = play_single_game({ p1_depth, p2_depth, p2_starts });

        if (stats.outcome === "p2_win") p2_wins++;
        else if (stats.outcome === "p1_win") p1_wins++;
        else ties++;

        total_diff += stats.score_diff;
        total_p1_ms += stats.p1_think_ms;
        total_p2_ms += stats.p2_think_ms;
        total_turns += stats.turns;
    }

    const p2_win_rate = ((p2_wins / games) * 100).toFixed(1);
    const p1_win_rate = ((p1_wins / games) * 100).toFixed(1);
    const avg_diff = (total_diff / games).toFixed(2);
    const avg_turns = (total_turns / games).toFixed(1);
    const avg_p1_ms = (total_p1_ms / games).toFixed(1);
    const avg_p2_ms = (total_p2_ms / games).toFixed(1);

    console.log("=== AI vs. AI Depth Benchmark ===");
    console.log(`Games: ${games} | P2 (max) Depth: ${p2_depth} vs. P1 (min) Depth: ${p1_depth}`);
    console.log(`P2 Wins: ${p2_wins} (${p2_win_rate}%) | P1 Wins: ${p1_wins} (${p1_win_rate}%) | Ties: ${ties}`);
    console.log(`Avg Score Diff (P2 - P1): ${avg_diff >= 0 ? "+" : ""}${avg_diff}`);
    console.log(`Avg Turns/Game: ${avg_turns} | Avg Think/Game -> P2: ${avg_p2_ms} ms, P1: ${avg_p1_ms} ms`);
}

// Example: test a few depth pairings (keep game counts modest at higher depths until alpha-beta is in)
run_depth_matchup({ games: 20, p1_depth: 1, p2_depth: 3, alternate_starter: true });
run_depth_matchup({ games: 20, p1_depth: 2, p2_depth: 4, alternate_starter: true });
run_depth_matchup({ games: 10, p1_depth: 3, p2_depth: 5, alternate_starter: true });
