import express from "express";
import multer from "multer";
import fileService from "../services/file.service";

const upload = multer({ dest: "assets/" });

const router = express.Router();

router.post("/journey", upload.single("file"), async (req, res) => {
  if (req.file) {
    const response = await fileService.uploadJourneyCSVFile(req.file.path);
    if (response) {
      res.status(200).send("File successfully uploaded");
    } else {
      res
        .status(400)
        .send("The CSV file didn't contain a single valid journey row!");
    }
  } else {
    res.status(400).send("No file was provided! Provide a CSV file!");
  }
});

router.post("/station", upload.single("file"), async (req, res) => {
  if (req.file) {
    const response = await fileService.uploadStationCSVFile(req.file.path);
    if (response) {
      res.status(200).send("File successfully uploaded");
    } else {
      res
        .status(400)
        .send("The CSV file didn't contain a single valid station row!");
    }
  } else {
    res.status(400).send("No file was provided! Provide a CSV file!");
  }
});

export default router;
