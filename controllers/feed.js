const { validataionResult } = require('express-validator/check');
const Post = require('../models/post')

exports.getPosts = (req, res, next) => {
    res.status(200).json({
        posts: [{
            _id: '1',
            title: 'First Post',
            content: 'This is the first post!',
            imageUrl: 'images/main.png',
            creator: {
                name: "Max"
            },
            createdAt: new Date()
        }]
    });
}

exports.addPosts = (req, res, next) => { //post a post 
    const errors = validataionResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ message: 'Validation failed' })
    }
    const title = req.body.title;
    const content = req.body.content;
    const post = new Post({
        title: title,
        content: content,
        creator: { name: "Max" },
    });
    post.save().then(result => {
        console.log(result);
        res.status(201).json({
            message: 'Post created successfully!',
            post: result
        });
    }).catch(err => {
        console.log(err)
    })

};