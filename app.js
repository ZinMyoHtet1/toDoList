import express from "express";
import bodyParser from "body-parser";
import { sep, join } from "path";
import { fileURLToPath } from "url";
import { date } from "./date.js";
import { workRoute, workItems } from "./routes/work.js";
import mongoose from "mongoose";
import _ from "lodash"

const __dirname = join(fileURLToPath(import.meta.url), ".." + sep);
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/todolistDB",{useNewUrlParser: true});

const itemSchema={
  name: String,
};

const listSchema={
  name: String,
  items: [itemSchema]
}

const Item=mongoose.model("Item",itemSchema);
const List=mongoose.model("List",listSchema);

const item1=new Item({
  name: "Welcom to ToDoList app"
});

const item2=new Item({
  name: "Hit + sign to add new item"
})

const item3=new Item({
  name: "<-- hit this to delete an item"
})

const defaultItems=[item1,item2,item3];


// const items = ["Buy food", "Cook food", "Eat food"];
app.get("/", function (req, res) {
  Item.find({}).then(foundItems=>{
    if(foundItems.length===0){
      Item
      .insertMany(defaultItems)
      .then(()=>console.log("You add default items successfully"))
      .catch(err=>console.log(err));
      
      res.redirect("/");
    }else{
      res.render("index", { listTitle: "Today", listItems: foundItems });
    }
  }).catch(err=>console.log(err))
  // res.render("index", { listTitle: date(), listItems: foundItems });
});

app.post("/", function (req, res) {
  const insertItem=req.body.newList;
  const list=req.body.list;
  const newItem=new Item({
    name: insertItem
  });

  if(list==="Today"){
    newItem
    .save()
    .then(()=>console.log("successfully added new item to item collection"))
    .catch(err=>console.log(err));
    res.redirect('/')
  }else{
    List
    .findOne({name: list}).then(result=>{
      result.items.push(newItem);
      result.save().catch(err=>console.log(err));
      res.redirect(`/${list}`)
    })
  }

  
});

app.post("/delete",function(req,res){
  const deleteItemId=req.body.checkbox;
  const list=req.body.list;
  console.log(list)

  if(list==="Today"){
    Item
    .findByIdAndDelete(deleteItemId)
    .then(_=>console.log("successfully deleted an item"))
    .catch(err=>console.log(err));
    res.redirect("/");
  }else{
    List
    .findOneAndUpdate({name: list},{$pull: {items: {_id: deleteItemId}}})
    .catch(err=>console.log(err));
    res.redirect(`/${list}`);
  }
 
});

app.get("/:newRoute",function(req,res){  
  const newRoute=_.capitalize(req.params.newRoute);
List.findOne({name: newRoute}).then(foundItem=>{
  if(foundItem){
    res.render('index',{listTitle: foundItem.name,listItems: foundItem.items})
  }else{
    const list=new List({
      name: newRoute,
      items: defaultItems
    })
    list
    .save()
    .then(_=>console.log('Successsfully new Rooute to list collection'))
    .catch(err=>console.log(err));
    res.redirect(`/${req.params.newRoute}`);
  }
}).catch(err=>console.log(err))

})

app.use("/", workRoute);

app.listen(3000, function () {
  console.log("Your server is running on port 3000");
});
