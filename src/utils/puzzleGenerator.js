import { isSolvable } from "./solvability.js";
import generateZeroLastGoal from "./goalGenerator.js";

class PuzzleGenerator {
  constructor(size = 3, solvable = false, iterations = 10) {
    this.goal = generateZeroLastGoal(size);
    this.iterations = iterations;

    return this.shuffle(solvable);
  }
  shuffle(solv) {
    const multArr = JSON.parse(JSON.stringify(this.goal));
    let iters = this.iterations;

    while (iters) {
      for (let i = 0; i < multArr.length; i++) {
        for (let j = 0; j < multArr[i].length; j++) {
          let i1 = Math.floor(Math.random() * multArr.length);
          let j1 = Math.floor(Math.random() * multArr.length);

          // swap values
          [multArr[i][j], multArr[i1][j1]] = [multArr[i1][j1], multArr[i][j]];
          iters--;

          if (iters <= 0) break;
        }
        if (iters <= 0) break;
      }
    }

    // check the solvability
    const isSolv = isSolvable(multArr, this.goal, multArr[0].length);

    // check if the solvability is the same as the desired one.
    if ((isSolv && solv) || (!isSolv && !solv))
      return multArr.map((r) => r.map((c) => parseInt(c)));

    // otherwise shuffle again until u get what u want boy.
    return this.shuffle(solv);
  }
}

export default PuzzleGenerator;
