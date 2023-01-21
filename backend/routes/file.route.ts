import express from "express";
import multer from "multer";
import fileService from "../services/file.service";
import { seedDatabaseWithJournies } from "../utils/seed";

const upload = multer({ dest: "assets/" });

const router = express.Router();

router.post("/journey", upload.single("file"), async (req, res) => {
  if (req.file) {
    const response = await fileService.uploadJourneyCSVFile(req.file.path);
    if (response) {
      res.status(200).send("File successfully uploaded");
    } else {
      res.status(400).send("The CSV file didn't contain a single valid row!");
    }
  } else {
    res.status(400).send("No file was provided! Provide a CSV file!");
  }
});

export default router;
