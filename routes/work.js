import express from "express";

export const workRoute = express.Router();
export const workItems = [];

workRoute.get("/work", function (req, res) {
  res.render("index", { listTitle: "Work", listItems: workItems });
});

workRoute.post("/work", function (req, res) {
  res.redirect("/");
});
