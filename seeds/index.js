const mongoose = require('mongoose');
const cities = require('./cities')
const { places, descriptors } = require("./seedHelpers");
// # Models 
const Campground = require("../models/campground");

mongoose.connect('mongodb://localhost:27017/Yelp', { useNewUrlParser: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected!")
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});

    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        let randomIndex = Math.floor(Math.random() * 1000) + 5;
        randomIndex = randomIndex.toString()
        const camp = new Campground({
            author: '6325d84e21428fcda6157237',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            image: 'https://picsum.photos/400/400?random=' + randomIndex,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illum perspiciatis repudiandae quas amet nobis, quae, ullam iure maxime reprehenderit voluptate temporibus exercitationem doloremque unde quasi porro facere eaque ipsam quibusdam.',
            price: price
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});