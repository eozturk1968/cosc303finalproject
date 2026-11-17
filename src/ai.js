/* Strategy:
 * 	The best moves are almost always the moves where your last piece 
 * 	ends either in your store or empty pit. 
 *
 * 	The score function should take the board and a specific move as input, 
 * 	and it should output the score.
 *
 * 	A simple scoring system should follow:
 * 		Final stone ends in store -> score 1 + get another turn (great move)
 * 		Final stone ends in pit -> take opposing pit stones (great move: proportional to number of  stones opponent has in respective pit)
 *  	Only want to give stones to other player IF they are guaranteed to, when playing this pit, give stones back to you.
 *  	
 *  For this iteration, the ai will only look at the present state (doesn't care about future moves)
 *
 *  [p0 p1 p2 p3 p4 p5 G6 p7 p8 p9 p10 p11 p12 G13]
 */

// Wrapper function as needed


export function score(mv, board) {

    const ai_goal_pos = (board.length / 2) - 1;
    const opp_goal_pos = board.length - 1;

    let num_stones = board[mv];
    let cur_pos = mv;

    let tmp_board = [...board];

    if (num_stones == 0) return -Infinity;

    // 1. Distribute stones one by one
    tmp_board[mv] = 0;
    while (num_stones > 0) {
        cur_pos = (cur_pos + 1) % tmp_board.length;
        if (cur_pos === opp_goal_pos) continue;
        tmp_board[cur_pos]++;
        num_stones--;
    }

    // 2. Evaluate board before and after
    let store_gain = tmp_board[ai_goal_pos] - board[ai_goal_pos];
    let got_extra_turn = (cur_pos === ai_goal_pos);
    let ai_stones_after = 0;
    let opp_stones_after = 0;

    for (let i = 0; i < ai_goal_pos; i++) {
        ai_stones_after += tmp_board[i];
    }

    for (let i = ai_goal_pos + 1; i < opp_goal_pos; i++) {
        opp_stones_after += tmp_board[i];
    }

    // 3. Determine final score
    let score = 0;
    
    score += (store_gain * 10);
    if (got_extra_turn) score += 15;
    score += (ai_stones_after - opp_stones_after);

    return score;
}

export function select_best_move(board) {
    const ai_goal_pos = (board.length / 2) - 1;
    let best_score = -Infinity;
    let best_move = null;

    // Determine best move (score & position) of legal moves
    for (let i = 0; i < ai_goal_pos; i++) {
        if (board[i] === 0) continue;

        let move_score = score(i, board);

        if (move_score > best_score) {
            best_score = move_score;
            best_move = i;
        }
    }

    return {
        move: best_move,
        score: best_score
    };
}

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

/*
export function simulate_move(mv, board) {

    if (board[mv] === 0) {
        return {
            board: board,
            landed_in_store: false
        };
    }

    const ai_goal_pos  = 
    const opp_goal_pos = board.length - 1;

    let num_stones = board[mv];
    let cur_pos = mv;
    board[mv] = 0;

    // Simulate move
    while (num_stones > 0) {
        cur_pos = (cur_pos + 1) % board.length;
        
        if (cur_pos === opp_goal_pos) continue;
        else {
            board[cur_pos]++;
            num_stones--;
        }
    }

    return {
        board: board,
        landed_in_store: (
    };
}

*/
export function minimax(board, depth, is_maximizing) {
    
    // 1. Base Case
    if (depth === 0 || is_game_over(board)) {
        return { score: evaluate_board_state(board), move: null };
    }

    const ai_goal_pos = (board.length / 2) - 1;
    const opp_goal_pos = board.length - 1;

    let current_player_start = is_maximizing ? 0 : ai_goal_pos + 1;
    let current_player_end = is_maximizing ? ai_goal_pos : opp_goal_pos;

    let best_move = null;

    if (is_maximizing) {
        let max_eval = -Infinity;
        
        for (let i = current_player_start; i < current_player_end; i++) {
            if (board[i] === 0) continue;

            let { new_board, landed_in_store } = simulate_move(i, board);
        }
    }
}


/*
// Test function
export function selectBestMove(board) {
    
    const goal_pos = (board.length / 2) - 1;
    let max = 0;
    let mv  = null;

    let valid_moves = [];
    for (let i = 0; i < goal_pos; i++) {
        let val = score(i, board);

        if (val > max) {
            max = val;
            mv = i;
        }
    }

    return {
        move:  mv,
        score: max 
    };
}

*/
// other conditions:
// 	stones loop to opponents side. you score, their stones may loop over or may not
// 	stones dont loop. you dont score. you dont give stones to opponent. probably worst move

// sudo:
// figure out how many stones are in the starting pi  x
// figure out where the last stone woudl end up       x
// if stone ends in your goal, +7
// if stone ends in an empty pit of yours, +4 for each stone in opposition pit
// if stone ends in in oppositions position:
// 	+3 for each stone that ends up in your goal
// 	+2 for each opponent pit that is guaranteed to return a stone to you
// 	-1 for each one pit that does not return a stone to you
