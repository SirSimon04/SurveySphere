import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5002" });

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