import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api";
import { useDispatch, useSelector } from "react-redux";
import {
  updateActorsDetails,
  updateMovieDetails,
  updateProducerDetails,
} from "../../app/detailsSlice";

const Details = () => {
  const { id } = useParams();

  const movieDetails = useSelector((state) => state.details.movieDetails);
  const actorsDetails = useSelector((state) => state.details.actorsDetails);
  const producerDetails = useSelector((state) => state.details.producerDetails);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getMovieById = async () => {
    try {
      const res = await api.getMovieById(`/movies/${id}`);
      //   setMovieDetials(await res.json());
      dispatch(updateMovieDetails(await res.json()));
    } catch (error) {
      console.error("Error fetching Movies:", error);
    }
  };

  const getActorsById = async (id) => {
    try {
      const res = await api.getActorById(`/actors/${id}`);
      return await res.json();
    } catch (error) {
      console.error("Error fetching Movies:", error);
    }
  };

  const getProducersById = async (id) => {
    try {
      const res = await api.getProducerById(`/producers/${id}`);
      return await res.json();
    } catch (error) {
      console.error("Error fetching Movies:", error);
    }
  };

  useEffect(() => {
    if (Object.keys(movieDetails).length === 0) {
      getMovieById();
    } else {
      let helperArray = [];
      const actors_ids = movieDetails.actor_ids
        .split(",")
        .map((e) => Number(e));
      const promises = actors_ids.map((element) => {
        return getActorsById(element).then((res) => {
          helperArray.push(res);
        });
      });
      Promise.all(promises)
        .then(() => {
          dispatch(updateActorsDetails(helperArray));
        })
        .catch((error) => {
          console.error("Error fetching actor details:", error);
        });
      getProducersById(movieDetails.producer_id).then((res) => {
        dispatch(updateProducerDetails(res));
      });
    }
  }, [movieDetails]);

  const handleOnEditClick = () => {
    navigate(`/edit/${movieDetails.id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "20px 0",
      }}
    >
      <button style={{ cursor: "pointer" }} onClick={handleOnEditClick}>
        Edit
      </button>
      <img
        src={movieDetails.poster_url}
        width="200px"
        height="250px"
        style={{ marginTop: "20px" }}
      ></img>
      <p
        style={{
          fontSize: "24px",
          fontFamily: "cursive",
          marginBottom: "0",
          fontWeight: "bold",
        }}
      >
        {movieDetails.name}
      </p>
      <p
        style={{
          fontSize: "14px",
          width: "80%",
          marginBottom: "0",
          fontWeight: "normal",
        }}
      >
        Year of release: {movieDetails.year_of_release}
      </p>
      <p
        style={{
          fontSize: "14px",
          width: "80%",
          marginBottom: "0",
          fontWeight: "lighter",
        }}
      >
        {movieDetails.plot}
      </p>
      <p
        style={{
          fontSize: "14px",
          width: "80%",
          marginBottom: "0",
          fontWeight: "normal",
        }}
      >
        Producer Name: {producerDetails.name}
      </p>
      <p
        style={{
          fontSize: "14px",
          width: "80%",
          marginBottom: "0",
          fontWeight: "lighter",
        }}
      >
        Producer Description: {producerDetails.bio}
      </p>
      <p
        style={{
          fontSize: "14px",
          width: "80%",
          marginBottom: "0",
          fontWeight: "lighter",
        }}
      >
        Producer Gender: {producerDetails.gender}
      </p>
      {actorsDetails.map((each) => (
        <div
          key={each.id}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p
            style={{
              fontSize: "14px",
              width: "80%",
              marginBottom: "0",
              fontWeight: "normal",
            }}
          >
            Actor Name: {each.name}
          </p>
          <p
            style={{
              fontSize: "14px",
              width: "80%",
              marginBottom: "0",
              fontWeight: "lighter",
            }}
          >
            Actor Description: {each.bio}
          </p>
          <p
            style={{
              fontSize: "14px",
              width: "80%",
              marginBottom: "0",
              fontWeight: "lighter",
            }}
          >
            Actor Gender: {each.gender}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Details;
