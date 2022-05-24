import User from "../model/User"
import bcrypt from "bcrypt"
import Post from "../model/Post"


let getHomePage = async (req, res) => {
    try {
        console.log("ok nhe")
    }
    catch (e) {
        console.log(e);
    };
}


let registerUser = async (req, res) => {
    // try {
    //     let user = await new User({
    //         username: req.body.username,
    //         email: req.body.email,
    //         password: req.body.password,
    //         city: req.body.city,
    //         from: req.body.from,
    //         desc: req.body.desc,
    //         relationship: req.body.relationship
    //     })
    //     console.log(user)
    //     await user.save()
    //     res.status(200).json(user);
    // } catch (e) {
    //     console.log(e);
    // }
}

let registerAuth = async (req, res) => {
    let salt = await bcrypt.genSalt(10)
    let hashedPassword = await bcrypt.hash(req.body.password, salt);
    try {
        let user = await new User({
            username: req.body.username,
            email: req.body.email,
            password: hashedPassword,
            city: req.body.city,
            from: req.body.from,
            desc: req.body.desc,
            relationship: req.body.relationship
        })

        await user.save()
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json(e);
    }
}

let login = async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        !user && res.status(404).json("user not found");

        let validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(404).json("wrong password");

        res.status(200).json(user);
    }
    catch (e) {
        res.status(500).json(e);
    }
}

let updateUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            try {
                let salt = await bcrypt.genSalt(10);
                req.body.password = await bcrypt.hash(req.body.password, salt);
            }
            catch (e) {
                res.status(500).json(e);
            }
        }

        try {
            let user = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body
            })
            return res.status(200).json("Account update succeed");
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
    else
        return res.status(403).json("you can update only your account");
}


let deleteUser = async (req, res) => {
    if (req.body.userId === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            return res.status(200).json("Account delete succeed");
        }
        catch (e) {
            res.status(500).json(e);
        }
    }
    else
        return res.status(403).json("you can delete only your account");
}

let getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id);
        !user && res.status(404).json("user not found");
        let { password, updatedAt, createdAt, ...other } = user._doc
        res.status(200).json(other);
    }
    catch (e) {
        res.status(500).json(e);
    }
}


let followUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            let currentUser = await User.findById(req.body.userId);
            if (!(user.followers.includes(req.body.userId))) {
                console.log("aaaa");
                await user.updateOne({ $push: { followers: req.body.userId } });
                await currentUser.updateOne({ $push: { followings: req.params.id } });
                res.status(200).json("user has been followed");
            }
            else
                res.status(403).json("you allready follow this user");
        }
        catch (e) {
            res.status(500).json(e);
        }
    } else
        res.status(403).json("you can't follow yourself");
}


let unFollowUser = async (req, res) => {
    if (req.body.userId !== req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            let currentUser = await User.findById(req.body.userId);
            if ((user.followers.includes(req.body.userId))) {
                await user.updateOne({ $pull: { followers: req.body.userId } });
                await currentUser.updateOne({ $pull: { followings: req.params.id } });
                res.status(200).json("user has been unfollowed");
            }
            else
                res.status(403).json("you don't follow this user");
        }
        catch (e) {
            res.status(500).json(e);
        }
    } else
        res.status(403).json("you can't unfollow yourself");
}

let createPost = async (req, res) => {
    try {
        let newPost = new Post(req.body);
        // !newPost && res.status(400).json("error when create post");
        let savePost = await newPost.save();
        // !savePost && res.status(400).json("save post error");
        res.status(200).json(savePost);
    } catch (e) {
        res.status(500).json(e);
    }
}

let updatePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("the post has been updated");
        }
        else
            res.status(403).json("you can update only your post");
    }
    catch (e) {
        res.status(500).json(e);
    }
}


let deletePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("the post has been deleted");
        }
        else
            res.status(403).json("you can delete only your post");
    }
    catch (e) {
        res.status(500).json(e);
    }
}

let likePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("post has been liked");
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
}
let dislikePost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        if (post.likes.includes(req.body.userId)) {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("post has been disliked");
        }
    }
    catch (e) {
        res.status(500).json(e);
    }
}

let getPost = async (req, res) => {
    try {
        let post = await Post.findById(req.params.id);
        !post && res.status(404).json("not found post");
        res.status(200).json(post);
    }
    catch (e) {
        res.status(500).json(e);
    }
}

let getTimeline = async (req, res) => {
    let postArray = [];
    try {
        let currentUser = await User.findById(req.body.userId);
        let userPosts = await Post.find({ userId: currentUser._id });
        let friendPosts = await Promise.all(
            currentUser.followings.map((friendId) => {
                return Post.find({ userId: friendId });
            })
        );
        res.json(userPosts.concat(...friendPosts))
    }
    catch (e) {
        res.status(500).json(e);
    }
}

module.exports = {
    getHomePage: getHomePage,
    registerUser: registerUser,
    registerAuth: registerAuth,
    login: login,
    updateUser: updateUser,
    deleteUser: deleteUser,
    getUser: getUser,
    followUser: followUser,
    unFollowUser: unFollowUser,
    createPost: createPost,
    updatePost: updatePost,
    deletePost: deletePost,
    likePost: likePost,
    dislikePost: dislikePost,
    getPost: getPost,
    getTimeline: getTimeline,
}