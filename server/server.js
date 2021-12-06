const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = require("./exampleresponse.json");

// GET "/"
app.get("/", (req, res) => {
  res.json(videos);
});

app.post("/", (req, res) => {
  console.log(req.body)
  const title = req.body.title;
  const url = req.body.url;
  if(!title || !url ){
    res.json({
      result: "failure",
      message: "Video could not be saved",
    });
    return
  }
  const newVideo = {
    id: videos[videos.length -1].id +1,
    title: title,
    url: url,
    rating: 0
  };

  videos.push(newVideo);
  res.send( {id: newVideo.id} );
});

app.get("/:id", (req, res) => {
  const id = +req.params.id;
  const filterVideos = videos.filter((video) => video.id === id);
  if (filterVideos.length === 0) {
    res.json({
      result: "failure",
      message: "No videos found",
    });
    return;
  }
  res.send(filterVideos);
});

app.delete("/:id", (req, res) => {
  const id = +req.params.id;
  const index = videos.findIndex((video) => video.id === id);
  if (index === -1) {
    return res.status(400).send({
      result: "failure",
      message: "Video could not be deleted",
    });
  }
  videos.splice(index, 1);
  res.send({});
});

app.listen(port, () => console.log(`Listening on port: ${port}`));