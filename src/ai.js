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
    const cur_goal = (is_maximizing) ? p1_goal : p2_goal;
    const opp_goal = (is_maximizing) ? p2_goal : p1_goal;

    const start_pos = (is_maximizing) ? 0 : p1_goal + 1;
    const end_pos = (is_maximizing) ? p1_goal : p2_goal;

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
            let opp_pos = p2_goal - cur_pos - 1;
            if (tmp_board[opp_pos] > 0) {
                tmp_board[cur_goal] += tmp_board[opp_pos] + 1;
                tmp_board[opp_pos] = 0;
                tmp_board[cur_pos] = 0;
            }
        }
    }

    return {
        new_board: tmp_board,
        landed_in_store: landed_in_store
    };
}


/* Given a board, evaluates the position from Player 1's perspective (indices 0-6)
 * and returns a numeric rating (score) */
export function evaluate_board(board) {
    const p1_goal = (board.length / 2) - 1;
    const p2_goal = board.length - 1;

    // Total stones in each board
    let p1_store = board[p1_goal];
    let p2_store = board[p2_goal];

    // Total stones on each player side
    let p1_side_stones = 0;
    let p2_side_stones = 0;

    for (let i = 0; i < p1_goal; i++) {
        p1_side_stones += board[i];
    }

    for (let i = p1_goal + 1; i < p2_goal; i++) {
        p2_side_stones += board[i];
    }

    // Evaluate score based on player's turn
    let score = ((p1_store - p2_store) * 10) + (p1_side_stones - p2_side_stones);

    return score;
}


/* Given a board, returns if the game is or is not over */
export function is_game_over(board) {

    const goal_pos_1 = (board.length / 2) - 1;
    const goal_pos_2 = board.length - 1;

    let p1_has_stones = false;
    let p2_has_stones = false;

    // Check Player 1's side
    for (let i = 0; i < goal_pos_1; i++) {
        if (board[i] !== 0) {
            p1_has_stones = true;
            break;
        }
    }

    // Check Player 2's side
    for (let i = goal_pos_1 + 1; i < goal_pos_2; i++) {
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
        return { score: evaluate_board(board, is_maximizing), move: null };
    }

    const p1_goal = (board.length / 2) - 1;
    const p2_goal = board.length - 1;

    // Dynamically determine positions based on player move
    const start_pos = (is_maximizing) ? 0 : p1_goal + 1;
    const end_pos = (is_maximizing) ? p1_goal : p2_goal;

    let best_move = null;

    if (is_maximizing) {

        let max_eval = -Infinity;

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
