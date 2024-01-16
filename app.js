import express from "express";
import bodyParser from "body-parser";
import { sep, join } from "path";
import { fileURLToPath } from "url";
import { date } from "./date.js";
import { workRoute, workItems } from "./routes/work.js";

const __dirname = join(fileURLToPath(import.meta.url), ".." + sep);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

const items = ["Buy food", "Cook food", "Eat food"];
app.get("/", function (req, res) {
  res.render("index", { listTitle: date(), listItems: items });
});

app.post("/", function (req, res) {
  if (req.body.button === "Work") {
    workItems.push(req.body.newList);
    res.redirect("/work");
  } else {
    items.push(req.body.newList);
    res.redirect("/");
  }
});

app.use("/", workRoute);

app.listen(3000, function () {
  console.log("Your server is running on port 3000");
});
