import React, { useState } from "react";
import { useSelector } from "react-redux";
import api from "../../Api";
import { useNavigate } from "react-router-dom";

const Edit = () => {
  const movieDetails = useSelector((state) => state.details.movieDetails);
  const navigate = useNavigate();

  const [newDetails, setNewDetails] = useState(movieDetails);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const updateMovie = async (body) => {
    try {
      const res = await api.updateMovie(`/movies/${body.id}`, body);
      if (res.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error update Movies:", error);
    }
  };

  const handleOnSaveClick = () => {
    updateMovie(newDetails);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "40px 0",
      }}
    >
      <p style={{ marginBottom: "5px", fontWeight: "bold" }}>Movie Name</p>
      <input
        value={newDetails.name}
        name="name"
        onChange={handleChange}
        style={{ marginBottom: "10px", width: "300px" }}
      ></input>
      <p style={{ marginBottom: "5px", fontWeight: "bold" }}>Poster url</p>
      <input
        value={newDetails.poster_url}
        name="poster_url"
        onChange={handleChange}
        style={{ marginBottom: "10px", width: "300px" }}
      ></input>
      <p style={{ marginBottom: "5px", fontWeight: "bold" }}>Year of release</p>
      <input
        value={newDetails.year_of_release}
        name="year_of_release"
        onChange={handleChange}
        style={{ marginBottom: "10px", width: "300px" }}
      ></input>
      <p style={{ marginBottom: "5px", fontWeight: "bold" }}>Plot</p>
      <textarea
        value={newDetails.plot}
        name="plot"
        rows="5"
        onChange={handleChange}
        style={{ marginBottom: "10px", width: "400px" }}
      ></textarea>
      <button onClick={handleOnSaveClick}>Save</button>
    </div>
  );
};

export default Edit;
