import React, { useEffect, useState } from "react";
import api from "../../Api";
import { useNavigate } from "react-router-dom";
import Popup from "../Popup/Popup";

const Add = () => {
  const navigate = useNavigate();

  const [newDetails, setNewDetails] = useState({
    name: "",
    poster_url: "",
    year_of_release: "",
    plot: "",
  });

  const [newActorDetails, setNewActorDetails] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
  });

  const [newProducerDetails, setNewProducerDetails] = useState({
    name: "",
    gender: "",
    dob: "",
    bio: "",
  });

  const [producersList, setProducersList] = useState([]);
  const [actorsList, setActorsList] = useState([]);
  const [showAddActors, setShowAddActors] = useState(false);
  const [showAddProducer, setShowAddProducer] = useState(false);

  const [selectedActors, setSelectedActors] = useState([]);

  const genderList = ["Male", "Female", "Other"];

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

  const createActor = async (body) => {
    try {
      const res = await api.createActor(`/actors`, body);
      if (res.status === 201) {
        setShowAddActors(false);
      }
    } catch (error) {
      console.error("Error fetching Movies:", error);
    }
  };

  const createProducer = async (body) => {
    try {
      const res = await api.createProducer(`/producers`, body);
      if (res.status === 201) {
        setShowAddProducer(false);
      }
    } catch (error) {
      console.error("Error fetching Movies:", error);
    }
  };

  useEffect(() => {
    getAllProducersList();
    getAllActorsList();
  }, [showAddActors, showAddProducer]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleActorChange = (e) => {
    const { name, value } = e.target;
    setNewActorDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleProducerChange = (e) => {
    const { name, value } = e.target;
    setNewProducerDetails((prevDetails) => ({
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

  const handleOnAddActorClick = () => {
    createActor(newActorDetails);
  };

  const handleOnAddProducerClick = () => {
    createProducer(newProducerDetails);
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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "end",
          width: "80%",
          padding: "20px 0",
        }}
      >
        <button
          style={{ marginRight: "20px" }}
          onClick={() => {
            setShowAddActors(true);
          }}
        >
          Add Actor
        </button>
        <button
          onClick={() => {
            setShowAddProducer(true);
          }}
        >
          Add Producer
        </button>
      </div>
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
      {showAddActors && (
        <Popup setShow={setShowAddActors}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
              Actor Name
            </p>
            <input
              value={newActorDetails.name}
              name="name"
              onChange={handleActorChange}
              style={{ marginBottom: "10px", width: "300px" }}
            ></input>
            <select
              value={newActorDetails.gender}
              name="gender"
              onChange={handleActorChange}
              style={{
                marginBottom: "10px",
                width: "300px",
                marginTop: "20px",
              }}
            >
              <option value="">Select Gender</option>
              {genderList.map((each) => (
                <option value={each}>{each}</option>
              ))}
            </select>
            <p style={{ marginBottom: "2px", fontWeight: "bold" }}>Actor dob</p>
            <p
              style={{ marginBottom: "5px", fontWeight: "lighter" }}
            >{`(YYYY-MM-DD)`}</p>
            <input
              value={newActorDetails.dob}
              name="dob"
              onChange={handleActorChange}
              style={{ marginBottom: "10px", width: "300px" }}
            ></input>
            <p style={{ marginBottom: "2px", fontWeight: "bold" }}>Actor bio</p>
            <input
              value={newActorDetails.bio}
              name="bio"
              onChange={handleActorChange}
              style={{ marginBottom: "10px", width: "300px" }}
            ></input>
            <button onClick={handleOnAddActorClick}>Add Actor</button>
          </div>
        </Popup>
      )}
      {showAddProducer && (
        <Popup setShow={setShowAddProducer}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <p style={{ marginBottom: "5px", fontWeight: "bold" }}>
              Producer Name
            </p>
            <input
              value={newProducerDetails.name}
              name="name"
              onChange={handleProducerChange}
              style={{ marginBottom: "10px", width: "300px" }}
            ></input>
            <select
              value={newProducerDetails.gender}
              name="gender"
              onChange={handleProducerChange}
              style={{
                marginBottom: "10px",
                width: "300px",
                marginTop: "20px",
              }}
            >
              <option value="">Select Gender</option>
              {genderList.map((each) => (
                <option value={each}>{each}</option>
              ))}
            </select>
            <p style={{ marginBottom: "2px", fontWeight: "bold" }}>
              Producer dob
            </p>
            <p
              style={{ marginBottom: "5px", fontWeight: "lighter" }}
            >{`(YYYY-MM-DD)`}</p>
            <input
              value={newProducerDetails.dob}
              name="dob"
              onChange={handleProducerChange}
              style={{ marginBottom: "10px", width: "300px" }}
            ></input>
            <p style={{ marginBottom: "2px", fontWeight: "bold" }}>
              Producer bio
            </p>
            <input
              value={newProducerDetails.bio}
              name="bio"
              onChange={handleProducerChange}
              style={{ marginBottom: "10px", width: "300px" }}
            ></input>
            <button onClick={handleOnAddProducerClick}>Add Producer</button>
          </div>
        </Popup>
      )}
    </div>
  );
};

export default Add;
