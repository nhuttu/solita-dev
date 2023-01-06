import readline from "readline";
import { seedJournies } from "../seed";

export const askUserForSeed = async (question: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(question, (ans) => {
      if (ans === "YES") {
        seedJournies();
      } else if (ans === "NO") {
        console.log("Okay, no data is seeded");
      }
      rl.close();
      resolve(ans);
    })
  );
};

export const PORT = process.env.PORT ?? 3000;
