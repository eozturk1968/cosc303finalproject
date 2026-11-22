// AI Heuristic Program

/* Simulates given move, returns new board and boolean (if final stone lands in store) */
export function simulate_move(mv, board, is_maximizing) {

    if (board[mv] === 0) {
        return {
            new_board: [...board],
            landed_in_store: false
        };
    }

    const p1_goal = (board.length / 2) - 1; 
    const p2_goal = board.length - 1;

    // Dynamically set goals and edges based on who is moving
    const cur_goal = (is_maximizing) ? p2_goal : p1_goal;
    const opp_goal = (is_maximizing) ? p1_goal : p2_goal;

    const start_pos = (is_maximizing) ? p1_goal + 1 : 0;
    const end_pos = (is_maximizing) ? p2_goal : p1_goal;

    let num_stones = board[mv];
    let cur_pos = mv;

    let tmp_board = [...board];
    tmp_board[mv] = 0;

    // Drop stones one by one 
    while (num_stones > 0) {
        cur_pos = (cur_pos + 1) % tmp_board.length;
        if (cur_pos === opp_goal) continue;
        
        tmp_board[cur_pos]++;
        num_stones--;
    }

    // Check final position of stone
    let landed_in_store = (cur_pos === cur_goal);

    // Capture Rule
    if (!landed_in_store) {
        if (cur_pos >= start_pos && cur_pos < end_pos && tmp_board[cur_pos] === 1) {
            let capture_pos = p2_goal - cur_pos - 1;
            if (tmp_board[capture_pos] > 0) {
                tmp_board[cur_goal] += tmp_board[capture_pos] + 1;
                tmp_board[capture_pos] = 0;
                tmp_board[cur_pos] = 0;
            }
        }
    }

    return {
        new_board: tmp_board,
        landed_in_store: landed_in_store
    };
}

/* Helper: traces where the last stone from `startPit` lands without mutating `board`. */
export function find_landing_index(board, startPit, oppGoal) {
    const stones = board[startPit];
    if (!stones || stones <= 0) return null;

    let pos = startPit;
    const len = board.length;
    let remaining = stones;

    while (remaining > 0) {
        pos = (pos + 1) % len;
        if (pos === oppGoal) continue;
        remaining--;
    }

    return pos;
}

/* Given board, evaluates score from AI's perspective (higher score indicates AI, or p2, is doing better) */
export function evaluate_board(board) {

    const p1_goal = (board.length / 2) - 1;
    const p2_goal = board.length - 1;

    // Weights
    const STORE_WEIGHT = 10;
    const SIDE_STONE_WEIGHT = 1;
    const POS_STEP_WEIGHT = 0.25;
    const OWN_GOAL_BONUS = 5;
    const EMPTY_PIT_BONUS = 1.5;
    const CAPTURE_BONUS_PER_STONE = 4;

    // Values
    let p1_store = board[p1_goal];
    let p2_store = board[p2_goal];
    let p1_side_stones = 0;
    let p2_side_stones = 0;
    let p1_pos_score = 0;
    let p2_pos_score = 0;
    let p1_tactics = 0;
    let p2_tactics = 0;

    // Human (p1)
    for (let i = 0; i < p1_goal; i++) {
        const stones = board[i];

        p1_side_stones += stones;
        p1_pos_score += stones * (1 + (i * POS_STEP_WEIGHT));

        if (stones > 0) {
            const land_pos = find_landing_index(board, i, p2_goal);
            if (land_pos == p1_goal)
                p1_tactics += OWN_GOAL_BONUS;
            else if (land_pos !== null && land_pos < p1_goal && board[land_pos] === 0) {
                const capture_pit = p2_goal - land_pos - 1;
                const capture_stones = board[capture_pit];
                p1_tactics += EMPTY_PIT_BONUS + (capture_stones * CAPTURE_BONUS_PER_STONE);
            }
        }
    }

    // AI (p2)
    for (let i = p1_goal + 1; i < p2_goal; i++) {
        const stones = board[i];
        const dist_from_start = i - (p1_goal + 1);

        p2_side_stones += stones;
        p2_pos_score += stones * (1 + (dist_from_start * POS_STEP_WEIGHT));

        if (stones > 0) {
            const land_pos = find_landing_index(board, i, p1_goal);
            if (land_pos === p2_goal) 
                p2_tactics += OWN_GOAL_BONUS;
            else if (land_pos !== null && land_pos > p1_goal && land_pos < p2_goal && board[land_pos] === 0) {
                const capture_pit = p2_goal - land_pos - 1;
                const capture_stones = board[capture_pit];
                p2_tactics += EMPTY_PIT_BONUS + (capture_stones * CAPTURE_BONUS_PER_STONE);
            }
        }
    }

    const store_diff = (p2_store - p1_store) * STORE_WEIGHT;
    const side_diff = (p2_side_stones - p1_side_stones) * SIDE_STONE_WEIGHT;
    const pos_diff = p2_pos_score - p1_pos_score;
    const tactics_diff = p2_tactics - p1_tactics;

    return store_diff + side_diff + pos_diff + tactics_diff;

}

/* Given a board, returns if the game is or is not over */
export function is_game_over(board) {

    const p1_goal = (board.length / 2) - 1;
    const p2_goal = board.length - 1;

    let p1_has_stones = false;
    let p2_has_stones = false;

    // Check Player 1's side
    for (let i = 0; i < p1_goal; i++) {
        if (board[i] !== 0) {
            p1_has_stones = true;
            break;
        }
    }

    // Check Player 2's side
    for (let i = p1_goal + 1; i < p2_goal; i++) {
        if (board[i] !== 0) {
            p2_has_stones = true;
            break;
        }
    }

    // Game is over if either side has zero stones
    return !p1_has_stones || !p2_has_stones;
}



export function minimax(board, depth, is_maximizing) {
    
    // 1. Base Case
    if (depth === 0 || is_game_over(board)) {
        return { score: evaluate_board(board), move: null };
    }

    const p1_goal = (board.length / 2) - 1;
    const p2_goal = board.length - 1;

    // Dynamically determine positions based on player move
    const start_pos = (is_maximizing) ? p1_goal + 1 : 0;
    const end_pos = (is_maximizing) ? p2_goal : p1_goal;

    let best_move = null;

    if (is_maximizing) {

        let max_eval = -Infinity;

        // Check each legal move
        for (let i = start_pos; i < end_pos; i++) {

            if (board[i] === 0) continue;

            let { new_board, landed_in_store } = simulate_move(i, board, is_maximizing);

            // Extra Turn Rule
            let next_is_maximizing = (landed_in_store) ? is_maximizing : !is_maximizing;

            let eval_result = minimax(new_board, depth - 1, next_is_maximizing);

            if (eval_result.score > max_eval) {
                max_eval = eval_result.score;
                best_move = i;
            };
        }
        return { score: max_eval, move: best_move };
    }

    else {

        let min_eval = Infinity;

        for (let i = start_pos; i < end_pos; i++) {

            if (board[i] === 0) continue;

            let { new_board, landed_in_store } = simulate_move(i, board, is_maximizing);

            // Extra Turn Rule
            let next_is_maximizing = (landed_in_store) ? is_maximizing : !is_maximizing;

            let eval_result = minimax(new_board, depth - 1, next_is_maximizing);

            if (eval_result.score < min_eval) {
                min_eval = eval_result.score;
                best_move = i;
            }
        }
        return { score: min_eval, move: best_move };
    }
}
