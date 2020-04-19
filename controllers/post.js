const Post = require('../models/post')

exports.getPosts = (req, res ) => {
 const posts = Post.find()
 .select("_id title body")
 .then( posts => {
   res.json({ posts })
 })
 .catch(err => console.log(err))
} ;

exports.createPost = (req, res) => {
  const post = new Post(req.body)
  // console.log("creating a post.. ", post)
  post.save()
  .then(result => {
    res.json({
      post: result
    });
  })
}
 
exports.updatePost = (req, res) => {
  // res.sendStatus(200) // 200 = Success/OK
  Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPost) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    res.json(updatedPost);
  });
};

// DELETE City Destroy
exports.deletePost = (req, res) => {
  // res.sendStatus(200);
  Post.findByIdAndDelete(req.params.id), (err, deletedPost) => {
    if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
    res.json(deletedPost);
  };
}

exports.showPost = (req, res) => {
  Post.findById(req.params.id, (err, foundPost) => {
      if (err) return res.status(400).json({status: 400, error: 'Something went wrong, please try again'});
      res.json(foundPost);
  });
}