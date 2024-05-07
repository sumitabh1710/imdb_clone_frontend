import React, { useEffect, useState } from "react";
import "./Home.css";
import { useNavigate } from "react-router-dom";
import api from "../../Api";
import { updateMovieDetails } from "../../app/detailsSlice";
import { useDispatch } from "react-redux";

const Home = () => {
  const naviagte = useNavigate();
  const dispatch = useDispatch();

  const [movieList, setMovieList] = useState([]);

  dispatch(updateMovieDetails({}));

  const getAllMovieList = async () => {
    try {
      const res = await api.getAllMovieList(`/movies`);
      setMovieList(await res.json());
    } catch (error) {
      console.error("Error fetching Movies:", error);
    }
  };

  const handleMoiveClick = (id) => {
    naviagte(`/details/${id}`);
  };

  const handleOnAddClick = () => {
    naviagte(`/add`);
  };

  useEffect(() => {
    if (movieList.length == 0) {
      getAllMovieList();
    }
  }, []);

  return (
    <div className="main_container">
      <button
        style={{ cursor: "pointer", marginTop: "10px", marginLeft: "10px" }}
        onClick={handleOnAddClick}
      >
        Add
      </button>
      <div className="movie_list_container">
        {movieList.map((each) => (
          <div
            className="each_movie_container"
            onClick={() => handleMoiveClick(each.id)}
            key={each.id}
          >
            <img
              src={each.poster_url}
              width="200px"
              height="250px"
              style={{ marginTop: "20px" }}
            ></img>
            <p
              style={{
                fontSize: "18px",
                marginBottom: "0",
                fontWeight: "bold",
              }}
            >
              {each.name}
            </p>
            {/* <p
              style={{
                marginTop: "0",
                marginBottom: "0",
                fontWeight: "lighter",
              }}
            >
              Produced By: {each.producer_id}
            </p>
            <p
              style={{
                marginBottom: "0",
                fontWeight: "lighter",
              }}
            >
              Actors:{" "}
              {each.actors.map((each) => (
                  <span>{each}, </span>
                ))}
            </p> */}
            <p
              style={{
                fontWeight: "lighter",
              }}
            >
              Year of release: {each.year_of_release}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
