import React, { useEffect, useState } from "react";
import api from "../../Api";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const navigate = useNavigate();

  const [newDetails, setNewDetails] = useState({
    name: "",
    poster_url: "",
    year_of_release: "",
    plot: "",
  });

  const [producersList, setProducersList] = useState([]);
  const [actorsList, setActorsList] = useState([]);

  const [selectedActors, setSelectedActors] = useState([]);

  const getAllProducersList = async () => {
    try {
      const res = await api.getAllProducersList(`/producers`);
      setProducersList(await res.json());
    } catch (error) {
      console.error("Error fetching Movies:", error);
    }
  };

  const getAllActorsList = async () => {
    try {
      const res = await api.getAllActorsList(`/actors`);
      setActorsList(await res.json());
    } catch (error) {
      console.error("Error fetching Movies:", error);
    }
  };

  const createMovie = async (body) => {
    try {
      const res = await api.createMovie(`/movies`, body);
      if (res.status === 201) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching Movies:", error);
    }
  };

  useEffect(() => {
    getAllProducersList();
    getAllActorsList();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    const selectedProducerId = e.target.value;
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      producer_id: Number(selectedProducerId),
    }));
  };

  const handleMultiSelectChange = (e) => {
    const clickedValue = Number(e.target.value);
    const isAlreadySelected = selectedActors.includes(clickedValue);
    if (isAlreadySelected) {
      setSelectedActors((prevSelected) =>
        prevSelected.filter((val) => val !== clickedValue)
      );
    } else {
      setSelectedActors((prevSelected) => [...prevSelected, clickedValue]);
    }
  };

  useEffect(() => {
    if (selectedActors.length != 0) {
      setNewDetails((prevDetails) => ({
        ...prevDetails,
        actors: selectedActors,
      }));
    }
  }, [selectedActors]);

  const handleOnSaveClick = () => {
    createMovie(newDetails);
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
      <select
        value={newDetails.producer}
        name="producer_id"
        onChange={handleSelectChange}
        style={{ marginBottom: "10px", width: "300px", marginTop: "20px" }}
      >
        <option value="">Select Producer</option>
        {producersList.map((each) => (
          <option value={each.id}>{each.name}</option>
        ))}
      </select>
      <select
        value={selectedActors}
        name="actors"
        onChange={handleMultiSelectChange}
        multiple={true}
        style={{ marginBottom: "10px", width: "300px", marginTop: "20px" }}
      >
        {actorsList.map((each) => (
          <option key={each.id} value={each.id}>
            {each.name}
          </option>
        ))}
      </select>
      <button onClick={handleOnSaveClick}>Save</button>
    </div>
  );
};

export default Add;
