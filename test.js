const mongoose = require('mongoose');

const BlogPost = require('./models/BlogPost');

mongoose.connect('mongodb://localhost/my_database');

// BlogPost.create({
//     title: 'The Mythbuster’s Guide to Saving Money on Energy Bills',
//     body: 'If you have been here a long time, you might remember when I went on ITV Tonight to dispense a masterclass in saving money on energy bills. Energy-saving is one of my favourite money topics, because once you get past the boring bullet-point lists, a whole new world of thrifty nerdery opens'
// });

// BlogPost.find({
//     title: /How/
// }, (error, blogpost) => {
//     console.log(error, blogpost);
// });

let id =  '5d1e5b4f4e5b1f2b1c8b5e8d';

BlogPost.findById(id, (error, blogpost) => {
    console.log(error, blogpost);
});

BlogPost.findByIdAndUpdate(id, {
    title: 'Updated title'
}, (error, blogpost) => {
    console.log(error, blogpost);
});

BlogPost.findByIdAndDelete(id, {
    title: 'Updated title'
}, (error, blogpost) => {
    console.log(error, blogpost);
});