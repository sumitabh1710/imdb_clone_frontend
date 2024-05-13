const BASE_URL = "http://127.0.0.1:8000";

const headers = {
  "Content-Type": "application/json",
};

const api = {
  getAllMovieList: async (url) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        headers,
      });
      const data = response;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getMovieById: async (url) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        headers,
      });
      const data = response;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getActorById: async (url) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        headers,
      });
      const data = response;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getAllActorsList: async (url) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        headers,
      });
      const data = response;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getProducerById: async (url) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        headers,
      });
      const data = response;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  getAllProducersList: async (url) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        headers,
      });
      const data = response;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  updateMovie: async (url, body) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      });
      const data = response;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  createMovie: async (url, body) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const data = response;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  createActor: async (url, body) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const data = response;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },

  createProducer: async (url, body) => {
    try {
      const response = await fetch(`${BASE_URL}${url}`, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      const data = response;
      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  },
};

export default api;
