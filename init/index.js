const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

const MONGOOSE_URL = "mongodb://127.0.0.1:27017/wanderLust";
main()
  .then((res) => {
    console.log("Connected Sucessfully");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect(MONGOOSE_URL);
}

const initDB = async()=>{
    await Listing.deleteMany({});
    initData.data =  initData.data.map((obj)=>({...obj,owner:"692c6a8cb95d7cbcae39733e"}));
    await Listing.insertMany(initData.data);
    console.log("Data was initilazied");
};

initDB();
