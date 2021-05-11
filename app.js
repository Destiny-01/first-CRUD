const express = require("express");
const app = express();
const fs = require("fs");
const posts = require("./posts.json");

app.use(express.json());
app.use(express.urlencoded());

// Create a new post
app.post("/posts", (req, res) => {
  console.log(req.body.newPost);
  posts.push(req.body.newPost);
  let file = JSON.stringify(posts, null, 2);
  fs.writeFile("posts.json", file, (err) => {
    if (err) return res.status(500).json({ message: err });
  });
  return res.status(200).json({ message: "new post created" });
});

// Get all posts
app.get("/posts", (req, res) => {
  return res.json({ posts });
});

// Get a single post
app.get("/posts/:id", (req, res) => {
  let id = req.params.id;
  let foundFile = posts.find((post) => {
    return String(post.id) === id;
  });
  if (foundFile) {
    return res.status(200).json({ post: foundFile });
  } else {
    return res.status(404).json({ message: "post not found" });
  }
});

// Update a single post
app.put("/posts/:id", (req, res) => {
  let id = req.params.id;
  let foundFile = posts.find((post) => {
    return String(post.id) === id;
  });

  if (foundFile) {
    posts.pop();
    ffile = posts.push(req.body.updatePost);
    let file = JSON.stringify(posts, null, 2);
    fs.writeFile("posts.json", file, (err) => {
      if (err) return res.status(500).json({ message: err });
    });
    return res.status(200).json({ post: foundFile });
  } else {
    return res.status(404).json({ message: "post not found" });
  }
});

app.listen(3000, () => {
  console.log("Server is up and running");
});
