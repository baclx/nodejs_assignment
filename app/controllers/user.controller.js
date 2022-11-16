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

const updatePost = (req, res) => {
  const id = req.params.id;

  Post.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      console.log(num);
      if (num == 1) {
        res.send({
          message: "Post was updated successfully"
        });
      } else {
        res.send({
          message: `Cannot update Post with id = ${id}. Maybe Post was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Post with id=" + id
      });
    })
}

const deletePost = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id }
  })
    .then(num => {
      console.log(num);
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully"
        });
      } else {
        res.send({
          message: `Cannot delete Post with id = ${id}. Maybe Post was not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Post with id = " + id
      });
    })
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

const updateComment = (req, res) => {
  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      console.log(num);
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully"
        });
      } else {
        res.send({
          message: `Cannot update Comment with id = ${id}. Maybe Comment was not found or req.body is empty!`
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: "Error updating Comment with id = " + id
      });
    })
}

const deleteComment = (req, res) => {
  const id = req.params.id;

  Comment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully"
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id = ${id}. Maybe Comment was not found`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error deleting Comment with id = " + id
      });
    })
}

module.exports = {
  allAccess,
  userBoard,
  adminBoard,
  moderatorBoard,
  getAllPost,
  createPost,
  updatePost,
  deletePost,
  getAllComment,
  createComment,
  updateComment,
}