import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
// import videosData from "./exampleresponse.json";
import AllVideoCards from "./components/AllVideoCards";

function App() {
  const [videos, setVideos] = useState([]);
  // fetch data
  const fetchData = () => {
    fetch("https://fullstack-gulnihal.herokuapp.com/", {
      mode:  "no-cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods":
          "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          setVideos(data);
        }
      })
      .catch((e) => console.log(e));
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <Header videos={videos} setVideos={setVideos} fetchData={fetchData} />
      <AllVideoCards
        videos={videos}
        setVideos={setVideos}
        fetchData={fetchData}
      />
    </div>
  );
}

export default App;
