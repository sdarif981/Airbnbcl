const express =require("express");
const app=express();
const mongoose=require("mongoose");
const Listing=require("./models/listing.js");
const path = require('path');
const ejsMate=require('ejs-mate');

const MONGO_URL='mongodb://127.0.0.1:27017/wanderwall';
const methodOverride = require('method-override');
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.static(path.join(__dirname,"/public")));
app.engine("ejs",ejsMate);

// app.use(express.static(path.join(__dirname,"public")));


main()
.then(res=>console.log("connected to db"))
.catch(err => console.log(err));
 
async function main() {
  await mongoose.connect(MONGO_URL);

}
app.get("/",(req,res)=>{
  res.send("Iam here");
});

app.delete("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndDelete(id);
  res.redirect(`/listings`);
});

//put
app.put("/listings/:id",async(req,res)=>{
  let {id}=req.params;
  await Listing.findByIdAndUpdate(id,{...req.body.listing});
  res.redirect(`/listings/${id}`);
});

//edit
app.get("/listings/:id/edit",async(req,res)=>{
  let {id}=req.params;
 const list=await Listing.findById(id);
    res.render("listings/edit.ejs",{list});
});

//create
app.post("/listings",async(req,res)=>{
  const newlist=new Listing(req.body.listing);
  await newlist.save();
  res.redirect("/listings");
});
//new route
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
});

//show route
app.get("/listings/:id",async(req,res)=>{
 let {id}=req.params;
 const list=await Listing.findById(id);
 res.render("listings/show.ejs",{list});
});

//index route
app.get("/listings",async(req,res)=>{
 let allListings=await Listing.find({});
//  console.log(allListings);
 res.render("listings/index",{allListings});
});

// app.get("/testListing",async(req,res)=>{
//   let sampleListing=new Listing({
//       title:"My new villa",
//       description:"by the beach",
//       price:1200,
//       location:"Calangute,goa",
//       country:"India",
//   });
//   await sampleListing.save();
//   console.log("sample was succesful");
//   res.send("succesfully added");

// })

app.listen("8080",(req,res)=>{
  console.log("listening to port 8080");
});