import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5002" });

// Hinzufügen des JWT-Tokens als Authorization-Header
// API.interceptors.request.use((config) => {
//     config.headers.Authorization = `Bearer asdf`; //can be empty for now because backend sets id if no id is given => easier for development
//   return config;
// });

export const getSurvey = (surveyID) => API.get(`/survey/find/${surveyID}`);
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
export const getOwnSurveys = (token) => API.get(`/survey/own`, {
                                                      headers: {
                                                        Authorization: `Bearer ${token}`,
                                                      },
                                                    });
export const voteAll = (token, data) => API.post(`/survey/vote/all`, data, {
                                                      headers: {
                                                        Authorization: `Bearer ${token}`,
                                                      },
                                                    });