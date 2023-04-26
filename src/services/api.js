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

// GET EXERCISE BY NAME
export async function getByName() {
  try {
    const response = await axios.get(`${config.baseURL}name/`, {
      headers: config.headers,
    });

  } catch (err) {
    console.error(err);
  }
}

// GET BY BODY PARTS
export async function getBodyPart() {
  try {
    const response = await axios.get(`${config.baseURL}bodyPart/`, {
      headers: config.headers,
    });

    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}

// GET BY TARGET MUSCLE
export async function getTargetMuscle() {
  try {
    const response = await axios.get(`${config.baseURL}target/`, {
      headers: config.headers,
    });

    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}

// GET BY EQUIPMENT
export async function getEquipment() {
  try {
    const response = await axios.get(`${config.baseURL}equipment/`, {
      headers: config.headers,
    });

    console.log(response.data);
  } catch (err) {
    console.error(err);
  }
}
