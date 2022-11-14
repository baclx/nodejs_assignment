const db = require("../models");
const Post = db.post;
const Comment = db.comment;

const allAccess = (req, res) => {
  res.status(200).send("Public Content.");
};

const userBoard = (req, res) => {
  res.status(200).send("User Content.");
};

const adminBoard = (req, res) => {
  res.status(200).send("Admin Content.");
};

const moderatorBoard = (req, res) => {
  res.status(200).send("Moderator Content.");
};

// post
const getAllPost = (req, res) => {
  Post.findAll({ include: ["comments"] })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

const createPost = (req, res) => {
  // return Post.create({
  //   title: req.body.title,
  //   description: req.body.description,
  // })
  //   .then((post) => {
  //     return res.send(post);
  //   })
  //   .catch((err) => {
  //     console.log(">> Error while creating post: ", err);
  //   })

  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const post = {
    title: req.body.title,
    description: req.body.description,
  };

  // Save Tutorial in the database
  Post.create(post)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    });
}

// commet
const getAllComment = (req, res) => {
  Comment.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
}

const createComment = (req, res, postId) => {
  const comment = {
    name: req.body.name,
    text: req.body.text,
    postId: req.body.postId.id,
  };

  Comment.create(comment)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Comment."
      });
    });
};

module.exports = {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  getAllPost,
  createPost,
  getAllComment,
  createComment,
}