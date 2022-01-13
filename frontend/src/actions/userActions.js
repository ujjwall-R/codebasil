import axios from "axios";

export const loginAction = async (email, password) => {
  try {
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };

    const { data } = await axios.post(
      "http://localhost:5000/users/login",
      { email, password },
      config
    );
    if (!data) {
      throw new Error("Error in Login");
      return;
    }
    return data;
  } catch (error) {
    return error;
  }
};

export const getUserData = async (token) => {
  try {
    console.log(token);
    const config = {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("hitting...");
    const { data } = await axios.get("http://localhost:5000/users/me", config);
    console.log("Hit");

    if (!data) {
      throw new Error("Error in Login");
      return;
    }
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
