const mongoose = require('mongoose');
const Campground = require('../models/campground');
const zips = require('./zipsext');
const {places, descriptors} = require('./seedHelpers');

mongoose.connect('mongodb+srv://mike:mike@cluster0.nfhnw.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'))
db.once('open', () => {
    console.log('Database connected')
});

// const sample = array => array[Math.floor(Math.random() * array.length)];

// const seedDB = async () => {
//     await Campground.deleteMany({});
//     for (let i = 0; i < 500; i++) {
//         const rand = Math.floor(Math.random() * 29353)
//         const campground = new Campground({
//         title: `${sample(descriptors)} ${sample(places)}`,
//         zip: `${zips[rand]._id}`,
//         state: `${zips[rand].state}`,
//         city: `${zips[rand].city}`,
//         price: Math.floor(Math.random() * 250),
//         owner: '627dd5bb4daddb676c4d73ad',
//         image: '/img.png',
//         updated: Date.now(),
//         description: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Perspiciatis nulla quia adipisci error aut aperiam vel veritatis at excepturi facilis? Obcaecati et rem voluptates saepe officia quasi dicta est doloremque!',
//         location: {
//             type: "Point",
//             coordinates: zips[rand].loc
//         },
//         images: []
//     });
    
//     await campground.save();
//     }
// }

const photos = [
    {
      filename: 'Camp/tentrr-camping-vermont.jpg_b2pxgu',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332014/Camp/tentrr-camping-vermont.jpg_b2pxgu.webp'
    },
    {
      filename: 'Camp/tent-camping.jpg_hxpsk2',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332014/Camp/tent-camping.jpg_hxpsk2.webp'
    },
    {
      filename: 'Camp/stelprdb5375897_dw4eax',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332014/Camp/stelprdb5375897_dw4eax.webp'
    },
    {
      filename: 'Camp/camping_gw4ro1',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332014/Camp/camping_gw4ro1.webp'
    },
    {
      filename: 'Camp/camping-near-portland.jpg_ibunos',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332014/Camp/camping-near-portland.jpg_ibunos.webp'
    },
    {
      filename: 'Camp/b892be50-72bd-4e12-b7d7-7c19e8094cf4-DNR_Photo_Starve_Hollow_2_lramqb',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332014/Camp/b892be50-72bd-4e12-b7d7-7c19e8094cf4-DNR_Photo_Starve_Hollow_2_lramqb.webp'
    },
    {
      filename: 'Camp/acadia-national-park-camping-tent-open-to-trees-scott-goodwill-unsplash-1.jpg_kbtkhz',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332014/Camp/acadia-national-park-camping-tent-open-to-trees-scott-goodwill-unsplash-1.jpg_kbtkhz.webp'
    },
    {
      filename: 'Camp/636353868459517736-Southshore2_euoisp',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332014/Camp/636353868459517736-Southshore2_euoisp.webp'
    },
    {
      filename: 'Camp/636026211322259802-Wilderness-State-Park-campi-1-_tfnpdn',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332013/Camp/636026211322259802-Wilderness-State-Park-campi-1-_tfnpdn.webp'
    },
    {
      filename: 'Camp/5d16218921a8610d317c4357_kdhgf3',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332013/Camp/5d16218921a8610d317c4357_kdhgf3.webp'
    },
    {
      filename: 'Camp/3a2186_d11a6eaef8ee40959f5bf4508cb6c0d7_mv2_u88wpe',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332013/Camp/3a2186_d11a6eaef8ee40959f5bf4508cb6c0d7_mv2_u88wpe.webp'
    },
    {
      filename: 'Camp/30jour600.1_dutgtc',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332013/Camp/30jour600.1_dutgtc.webp'
    },
    {
      filename: 'Camp/22296700_G_jwzja1',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332013/Camp/22296700_G_jwzja1.jpg'
    },
    {
      filename: 'Camp/21camp600.1a_giyerg',
      url: 'https://res.cloudinary.com/campmike/image/upload/v1652332013/Camp/21camp600.1a_giyerg.webp'
    }
  ]

const campNew = async () => {const camps = await Campground.find();
for (let i = 0; i <= 15; i++) {
    const r = Math.ceil(Math.random() * 4);
    for (let c = 0; c < r; c++) {
    camps[i].images.push(photos[Math.floor(Math.random() * 14)])}
    camps[i].updated = Date.now();
    await camps[i].save()
}}

// seedDB()
console.log(photos)
campNew().then(() => {
        console.log('We done filling the database')
        mongoose.connection.close();
});