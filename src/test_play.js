import readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { minimax, is_game_over, simulate_move, find_landing_index, evaluate_board } from "./ai.js";

const rl = readline.createInterface({ input, output });

function display_board(board) {
  const aiGoal = `[13 (AI Goal): ${board[13]}]`;
  const aiPits = [12, 11, 10, 9, 8, 7]
    .map((i) => `[${i}:${board[i]}]`.padStart(7, " "))
    .join(" ");

  const humanGoal = `[6 (Human Goal): ${board[6]}]`;
  const humanPits = [0, 1, 2, 3, 4, 5]
    .map((i) => `[${i}:${board[i]}]`.padStart(7, " "))
    .join(" ");

  const goalPad = " ".repeat(aiGoal.length + 2);

  console.log("\n========================================================");
  console.log(`  AI (max) : ${aiGoal}  ${aiPits}`);
  console.log(`  Human(min): ${goalPad}${humanPits}  ${humanGoal}`);
  console.log("========================================================\n");
}

function sweep_remaining_stones(board) {
  const swept = [...board];
  const p1_goal = swept.length / 2 - 1; // 6
  const p2_goal = swept.length - 1; // 13

  let p1_rem = 0;
  for (let i = 0; i < p1_goal; i++) {
    p1_rem += swept[i];
    swept[i] = 0;
  }

  let p2_rem = 0;
  for (let i = p1_goal + 1; i < p2_goal; i++) {
    p2_rem += swept[i];
    swept[i] = 0;
  }

  swept[p1_goal] += p1_rem;
  swept[p2_goal] += p2_rem;
  return swept;
}

function get_pv_line(board, depth, is_ai_turn) {
  const line = [];
  let curBoard = [...board];
  let curIsAi = is_ai_turn;

  for (let d = depth; d > 0; d--) {
    if (is_game_over(curBoard)) break;
    const res = minimax(curBoard, d, curIsAi);
    if (res.move === null || res.move === undefined) break;

    const sim = simulate_move(res.move, curBoard, curIsAi);
    line.push(`${curIsAi ? "AI" : "You"}->${res.move}${sim.landed_in_store ? "*" : ""}`);
    curBoard = sim.new_board;
    if (!sim.landed_in_store) {
      curIsAi = !curIsAi;
    }
  }

  return line;
}

async function run_game() {
  console.log("=== Mancala Debug & Test Runner (./b.js) ===");
  console.log("Convention: Human (min) = pits 0-5, goal 6 | AI (max) = pits 7-12, goal 13");
  console.log("Select AI Search Depth:");
  console.log("  1. Depth 1 (Fast / Shallow)");
  console.log("  2. Depth 3 (Medium)");
  console.log("  3. Depth 5 (Deeper)");

  const choice = (await rl.question("Enter choice (1-3, default 2): ")).trim();
  let ai_depth = 3;
  if (choice === "1") ai_depth = 1;
  if (choice === "3") ai_depth = 5;

  const whoStarts = (await rl.question("Who starts? (h = Human, a = AI, default h): "))
    .trim()
    .toLowerCase();

  let board = [4, 4, 4, 4, 4, 4, 0, 4, 4, 4, 4, 4, 4, 0];
  let is_ai_turn = whoStarts === "a"; // true = AI (maximizing), false = Human (minimizing)

  console.log(
    `\nGame started! ${is_ai_turn ? "AI (max)" : "Human (min)"} moves first at depth ${ai_depth}.\n`
  );

  while (!is_game_over(board)) {
    display_board(board);

    if (!is_ai_turn) {
      // --- HUMAN TURN (pits 0..5, is_maximizing = false) ---
      let pit_index = -1;
      while (true) {
        const raw = await rl.question("Your turn (Human, pits 0-5): ");
        const parsed = Number.parseInt(raw.trim(), 10);
        if (Number.isNaN(parsed) || parsed < 0 || parsed > 5) {
          console.log("Enter a valid pit index from 0 to 5.");
        } else if (board[parsed] === 0) {
          console.log(`Pit ${parsed} is empty. Pick a pit with stones.`);
        } else {
          pit_index = parsed;
          break;
        }
      }

      const beforeScore = typeof evaluate_board === "function" ? evaluate_board(board) : null;
      const result = simulate_move(pit_index, board, false);
      board = result.new_board;
      const afterScore = typeof evaluate_board === "function" ? evaluate_board(board) : null;

      console.log(
        `Human played pit ${pit_index} | landed_in_store=${result.landed_in_store}` +
          (beforeScore !== null ? ` | eval: ${beforeScore} -> ${afterScore}` : "")
      );

      if (result.landed_in_store) {
        console.log("Landed in Human goal (6) -> extra turn!");
      } else {
        is_ai_turn = true;
      }
    } else {
      // --- AI TURN (pits 7..12, is_maximizing = true) ---
      console.log(`AI (max, depth ${ai_depth}) evaluating legal moves...`);

      const candidates = [];
      for (let i = 7; i <= 12; i++) {
        if (board[i] === 0) continue;
        const sim = simulate_move(i, board, true);
        const nextIsAi = sim.landed_in_store ? true : false;
        const childDepth = Math.max(0, ai_depth - 1);
        const childRes = minimax(sim.new_board, childDepth, nextIsAi);
        candidates.push({
          pit: i,
          stones: board[i],
          landed: sim.landed_in_store,
          score: childRes.score,
        });
      }

      for (const c of candidates) {
        console.log(
          `  Pit ${c.pit} (${c.stones} stones)${c.landed ? " [free turn]" : ""} -> child score: ${c.score}`
        );
      }

      const t0 = performance.now();
      const ai_decision = minimax(board, ai_depth, true);
      const elapsed = (performance.now() - t0).toFixed(1);

      if (ai_decision.move === null || ai_decision.move === undefined) {
        console.log("AI has no legal moves available.");
        break;
      }

      const pv = get_pv_line(board, ai_depth, true);
      console.log(
        `AI chose pit ${ai_decision.move} in ${elapsed} ms | minimax score: ${ai_decision.score}` +
          (pv.length ? ` | line: ${pv.join(" -> ")}` : "")
      );

      const result = simulate_move(ai_decision.move, board, true);
      board = result.new_board;

      if (result.landed_in_store) {
        console.log("Landed in AI goal (13) -> extra turn!");
      } else {
        is_ai_turn = false;
      }
    }
  }

  const finalBoard = sweep_remaining_stones(board);
  display_board(finalBoard);

  const humanFinal = finalBoard[6];
  const aiFinal = finalBoard[13];
  const finalEval = typeof evaluate_board === "function" ? evaluate_board(finalBoard) : null;

  console.log("=== GAME OVER ===");
  console.log(
    `Human Goal (6): ${humanFinal} | AI Goal (13): ${aiFinal}` +
      (finalEval !== null ? ` | Final Eval: ${finalEval}` : "")
  );

  if (aiFinal > humanFinal) {
    console.log("AI wins.");
  } else if (humanFinal > aiFinal) {
    console.log("Human wins.");
  } else {
    console.log("Tie game.");
  }

  rl.close();
}

run_game();
