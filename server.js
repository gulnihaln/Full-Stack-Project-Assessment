const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require("pg");
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());
// Store and retrieve your videos from here
// If you want, you can copy "exampleresponse.json" into here to have some data to work with
const videos = require("./exampleresponse.json");
const pool = new Pool({
  connectionString:
"postgres://mhrhxllswldlqf:7a7306697db4035c958b01170453ef4b7c27810455c2edf4e14882db911ea8b7@ec2-34-255-134-200.eu-west-1.compute.amazonaws.com:5432/d893894n24v5ra",  ssl: {
    rejectUnauthorized: false,
  },
  user: "mhrhxllswldlqf",
  host: "ec2-54-228-139-34.eu-west-1.compute.amazonaws.com",
  database: "dapnscot6ihjdt",
  password: "",
  port: 5432,
});

// GET "/"
app.get("/", (req, res) => {
    // const rating
    const selectQuery = `SELECT * FROM fullstack_videos ORDER BY rating`;
    pool.query(selectQuery, (error, result) => {
      if (error) {
        console.log(error)
        return res.status(500).send("ERROR");
      }
      res.send(result.rows);
    });
});

app.post("/", (req, res) => {
  console.log(req.body)
  const title = req.body.title;
  const url = req.body.url;
  // const date
  // const time
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