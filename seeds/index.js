const mongoose = require('mongoose');
const Campground = require('../models/campground');
const zips = require('./zipsext');
const {places, descriptors} = require('./seedHelpers');
const { push } = require('./zips');


mongoose.connect('mongodb://0.0.0.0:27017/CampProject');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected')
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 150; i++) {
        const rand = Math.floor(Math.random() * 29353)
        const campground = new Campground({
        title: `${sample(descriptors)} ${sample(places)}`,
        zip: `${zips[rand]._id}`,
        state: `${zips[rand].state}`,
        city: `${zips[rand].city}`,
        price: Math.floor(Math.random() * 250),
        owner: '62734261b4f228302fdd1a13',
        image: '/img.png',
        updated: Date.now(),
        description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis nulla quia adipisci error aut aperiam vel veritatis at excepturi facilis? Obcaecati et rem voluptates saepe officia quasi dicta est doloremque!',
        location: {
            type: "Point",
            coordinates: zips[rand].loc
        }
    });
    
    await campground.save();
    }
}

seedDB().then(() => {
    console.log('We done filling the database')
    mongoose.connection.close();
});