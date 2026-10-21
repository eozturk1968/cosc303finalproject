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
 */

function score(mv, pits, stores) {
	// sudo:
	// figure out how many stones are in the starting pi
	// figure out where the last stone woudl end up
	// if stone ends in your goal, +7
	// if stone ends in an empty pit of yours, +4 for each stone in opposition pit
	// if stone ends in in oppositions position:
	// 	+3 for each stone that ends up in your goal
	// 	+2 for each opponent pit that is guaranteed to return a stone to you
	// 	-1 for each one pit that does not return a stone to you
}
