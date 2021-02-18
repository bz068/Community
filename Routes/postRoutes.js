const router = require("express").Router();
const auth = require("../middleware/auth");
const Post = require("../Models/postModel");

// ADD POST
router.post("/", auth, async (req, res) => {
  try {
    const { title, body } = req.body;

    if (!title || !body) {
      return res.status(400).json({ errorMessage: "Please Enter All Fields." });
    }

    newPost = new Post({
      title,
      body,
    });

    const savedPost = await newPost.save();

    res.status(200).json({ errorMessage: "Post Added" });
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// DISPLAY ALL POSTS
router.get("/", async (req, res) => {
  try {
    const allPosts = await Post.find();

    res.json(allPosts);
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// ADD COMMENT
router.post("/comment", auth, async (req, res) => {
  try {
    const { _id, body } = req.body;

    if (!body && !_id) {
      return res.status(400).json({ errorMessage: "Please Enter All Fields." });
    }

    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
      const post = await Post.findOneAndUpdate(
        { _id },
        { $push: { comments: body } }
      );
      if (!post) {
        return res.status(400).json({ errorMessage: "Post not Found!" });
      }
      res.json(post);
    } else {
      return res.status(400).json({ errorMessage: "Error with your Request" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

// GET POST BY ID
router.get("/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    if (_id.match(/^[0-9a-fA-F]{24}$/)) {
      const post = await Post.findOne({ _id });
      if (!post) {
        return res.status(400).json({ errorMessage: "Post not Found!" });
      }
      res.json(post);
    } else {
      return res.status(400).json({ errorMessage: "Error with your Request" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send();
  }
});

module.exports = router;
