const { validataionResult } = require('express-validator/check');

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
    // create post in db
    res.status(201).json({
        message: 'Post created successfully!',
        post: {
            id: new Date().toISOString(),
            title: title,
            content: content,
            creator: { name: "Max" },
            createdAt: new Date()
        }
    });
};