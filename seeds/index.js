const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1/yelp-camp");

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      //Your USER id
      author: "644b8b5118f89ab8c2042367",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      // here is just store the url

      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Commodi quasi aliquid quas dolorum inventore explicabo vero molestias, neque dolor fugit facilis,deleniti itaque dignissimos illum facere omnis hic provident magnam.",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url: "https://res.cloudinary.com/dxaobslel/image/upload/v1683104557/YelpCamp/tybrhv74cyuevhj7pwdc.png",
          filename: "YelpCamp/tybrhv74cyuevhj7pwdc",
        },
        {
          url: "https://res.cloudinary.com/dxaobslel/image/upload/v1683104558/YelpCamp/uotcn4ppwc46d3fxqnyj.jpg",
          filename: "YelpCamp/uotcn4ppwc46d3fxqnyj",
        },
      ],
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
