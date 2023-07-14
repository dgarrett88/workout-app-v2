import config from "../config/config.json";
import axios from "axios";

// GET ALL EXERCISES
export async function allExercises() {
  try {
    return await axios.get(`${config.baseURL}`, {
      headers: config.headers,
    });
    
  } catch (err) {
    console.error(err);
  }
}

