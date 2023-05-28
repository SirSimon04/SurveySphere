import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5002" });

// Hinzufügen des JWT-Tokens als Authorization-Header
API.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6IjEyM0AxMjMuZGUiLCJpZCI6IjY0NmYzYWIyMzFjMTg5YzRhMDEzNDYxNSIsImlhdCI6MTY4NTA5Mzk4NCwiZXhwIjoxNjg3Njg1OTg0fQ.Oy3EoaFtq8T74iiGWhv5eeRdW8BiShVq01OlCpRSlTs`;
  return config;
});

export const getSurvey = (surveyID) => API.get(`/survey/${surveyID}`);
// export const signIn = (formData) => API.post("/user/signin", formData);
// export const signUp = (formData) => API.post("/user/signup", formData);
