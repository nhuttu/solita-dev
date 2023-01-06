import app from "./app";
import http from "http";
import { PORT, askUserForSeed } from "./utils/config";

// NOTE: to be used later, make it optional for user to NOT seed the database on every launch
// const ans = async () =>
//   await askUserForSeed(
//     "Do you want to seed the database with the CSV files (YES/NO)?"
//   );
// ans();
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
