import axios from "axios";

const baseURL = process.env.REACT_APP_ENV === 'production' ? 'https://survey-sphere-server.onrender.com' : "http://localhost:5002";

const API = axios.create({ baseURL: baseURL });

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
export const createSurvey = (token, data) => API.post(`/survey`, data, {
                                                      headers: {
                                                        Authorization: `Bearer ${token}`,
                                                      },
                                                    });                            