const mn = require("mongoose");
const prod = require("./models/Product");

const products = [
  {
    name: "iphone",
    img: "https://m.media-amazon.com/images/I/61Qsf4nQiZL.AC_UY327_FMwebp_QL65.jpg",
    price: 140000,
    desc: "good quality of camera",
  },
  {
    name: "macbook",
    img: "https://tse1.mm.bing.net/th/id/OIP.oVqhQ6YzJeg0cSwyR2LkUgHaE-?pid=Api&P=0&h=180",
    price: 250000,
    desc: "aukat se bahar",
  },
  {
    name: "apple watch",
    img: "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8YXBwbGUlMjB3YXRjaHxlbnwwfHwwfHx8MA%3D%3D",
    price: 35000,
    desc: "thoda aukat ke andhar",
  },
  {
    name: "headphones",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGJsdWV0b290aHxlbnwwfHwwfHx8MA%3D%3D",
    price: 25000,
    desc: "highly flexible",
  },
  {
    name: "ipad pro",
    img: "https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aXBhZCUyMHByb3xlbnwwfHwwfHx8MA%3D%3D",
    price: 100000,
    desc: "highly recommended",
  },
];

async function seeddb() {
  //dealing with db so wait till all entered in db
  await prod.insertMany(products);
  console.log("data seeded succesfully");
}

module.exports = seeddb;
