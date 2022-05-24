import express from "express"
import homeController from "../controller/homeController"

let router = express.Router();

let initWebRountes = (app) => {
    router.get("/", homeController.getHomePage);


    router.post("/registerUser", homeController.registerAuth);
    router.post("/login", homeController.login);
    router.put("/updateUser/:id", homeController.updateUser);
    router.put("/deleteUser/:id", homeController.deleteUser);
    router.get("/getUser/:id", homeController.getUser);
    router.put("/:id/follow", homeController.followUser);
    router.put("/:id/unFollow", homeController.unFollowUser);

    router.post("/createPost", homeController.createPost);
    router.put("/updatePost/:id", homeController.updatePost);
    router.put("/deletePost/:id", homeController.deletePost);
    router.get("/getPost/:id", homeController.getPost);
    router.put("/like/:id", homeController.likePost);
    router.put("/dislike/:id", homeController.dislikePost);


    router.get("/timeline", homeController.getTimeline);



    return app.use("/", router);
}
module.exports = { initWebRountes: initWebRountes } 
