const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.get("/api/test/all", controller.allAccess);

  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.userBoard
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken, authJwt.isModerator],
    controller.moderatorBoard
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken, authJwt.isAdmin],
    controller.adminBoard
  );

  // post
  app.get(
    "/api/post",
    controller.getAllPost
  );

  app.post(
    "/api/post",
    controller.createPost
  )

  app.put(
    "/api/post/:id",
    controller.updatePost
  )

  app.delete(
    "/api/post/:id",
    controller.deletePost
  )

  // comment
  app.get(
    "/api/comment",
    controller.getAllComment
  );

  app.post(
    "/api/comment",
    controller.createComment
  )

  app.put(
    "/api/comment/:id",
    controller.updateComment
  )
};
