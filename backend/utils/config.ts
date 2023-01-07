import readline from "readline";
import { seedDatabaseWithJournies } from "../seed";

export const askUserForSeed = async (question: string) => {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(question, (ans) => {
      if (ans === "YES") {
        seedDatabaseWithJournies();
      } else if (ans === "NO") {
        console.log("Okay, no data is seeded");
      }
      rl.close();
      resolve(ans);
    })
  );
};

export const PORT = process.env.PORT ?? 3000;
