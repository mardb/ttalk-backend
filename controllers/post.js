
exports.getPosts = (req, res ) => {
  res.send({
    posts: [
      {title: 'First post'},
      {title: 'second post'}
    ]
  })
} 