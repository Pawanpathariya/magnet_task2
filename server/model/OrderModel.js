const mongoose=require('mongoose');
const OrderSchem=new mongoose.Schema({
name  : String,
email :String,
address : String,
city     :String,
state    :String,
pincode  :String,
Product  :[],
totalamount :String,
OrderId  : String
})

module.exports=mongoose.model("order",OrderSchem)