import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";

const UploadForm = ({ getAllMedias }) => {
  const [name, setName] = useState("");
  const [videos, setVideos] = useState([]);
  const [uploaded, setUploaded] = useState(null);

  const hadleSubmit = (e) => {
    e.preventDefault();

    let formdata = new FormData();
    for (let key in videos) {
      formdata.append("videos", videos[key]);
    }

    formdata.append("name", name);

    axios
      .post(`${BACKEND_URI}/api/v1/media/create`, formdata, {
        onUploadProgress: (data) => {
          setUploaded(Math.round((data.loaded / data.total) * 100));
        },
      })
      .then((success) => {
        getAllMedias();
        alert("Submitted successfully");
      })
      .catch((error) => {
        console.log(error);
        alert("Error happened!");
      });
  };

  return (
    <>
      <form onSubmit={hadleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="videos">Upload Videos</label>
          <input
            type="file"
            name="videos"
            id="videos"
            multiple
            className="form-control"
            accept=".mp4, .mkv"
            onChange={(e) => {
              setVideos(e.target.files);
            }}
          />
        </div>

        {uploaded && (
          <div className="progress mt-2">
            <div
              className="progress-bar"
              role="progressbar"
              aria-valuenow={uploaded}
              aria-valuemin="0"
              aria-valuemax="100"
              style={{ width: `${uploaded}%` }}
            >
              {`${uploaded}%`}
            </div>
          </div>
        )}

        <button type="submit" className="btn btn-primary mt-2">
          Submit
        </button>
      </form>
    </>
  );
};

export default UploadForm;
