const express = require("express");

const router = express.Router();

const BlogPost = require("../models/blogPost");

// routes
router.get("/", (req, res) => {
  BlogPost.find({})
    .then((data) => {
      console.log(("data:", data));
      res.json(data);
    })
    .catch((error) => {
      console.log("error:", daerrorta);
    });
});

// router.post("/save", (req, res) => {
//   console.log("body: ", req.body);

//   res.json({
//     msg: "we received your data!!!",
//   });
// });

router.post("/save", (req, res) => {
  console.log("Body:", req.body);
  const data = req.body;

  const newBlogPost = new BlogPost(data);

  // save
  newBlogPost.save((error) => {
    if (error) {
      res.status(500).json({ msg: "sorry, internal server error" });
      return;
    }

    // BlogPost
    res.json({
      msg: "Your data has been saved!!!!!!",
    });
  });
});

router.get("/name", (req, res) => {
  const data = [
    {
      username: "0520",
      age: 5,
    },
  ];
  res.json(data);
});

module.exports = router;
