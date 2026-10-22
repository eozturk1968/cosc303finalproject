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

    const num_stones   = board[mv];	
    const goal_pos     = (board.length / 2) - 1;
    const opp_goal_pos = board.length - 1;

    let score          = 0;
    let cur_num_stones = board[mv];
    let tmp_board      = [...board];

    // Begin playing (Depth = 1)
    tmp_board[mv] = 0;
    for (let i = 0; i < num_stones; i++) {

        let cur_pos = (mv + i + 1) % tmp_board.length;
        cur_num_stones--;

        // Intermediate stones dropped 
        if (cur_num_stones > 0) {

            if (cur_pos < goal_pos) {
            }
            else if (cur_pos > goal_pos && cur_pos < opp_goal_pos) {
                score -= 1;
            }
            else if (cur_pos == goal_pos) {
                score += 4;
            }
            else if (cur_pos == opp_goal_pos) {
                score -= 4;
            }

        }

        // Final stone dropped
        else {
            
            // Extra Turn Rule
            if (cur_pos == goal_pos) score += 7;

            // Capture Rule
            else if (tmp_board[cur_pos] == 0 && cur_pos < goal_pos) {
                let opp_pos = cur_pos + (tmp_board.length - 2) - (cur_pos * 2);
                score += tmp_board[opp_pos] * 3;
            }
            else {}
        }

        // Add stone to new position
        tmp_board[cur_pos]++;

    }
    return score;
}

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
