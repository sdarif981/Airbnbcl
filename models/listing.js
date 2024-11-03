const mongoose=require("mongoose");

const listingSchema=mongoose.Schema({
  title:{
    type:String,
    required:true
  },
  description:String,
  image:{
    default:"https://th.bing.com/th/id/OIP.rvSWtRd_oPRTwDoTCmkP5gHaE8?rs=1&pid=ImgDetMain",
    type:String,
    set:(v)=>v===""?"https://th.bing.com/th/id/OIP.rvSWtRd_oPRTwDoTCmkP5gHaE8?rs=1&pid=ImgDetMain":v,
  },
  price:Number,
  location:String,
  country:String,
});

const Listing=mongoose.model("Listing",listingSchema);
module.exports=Listing;