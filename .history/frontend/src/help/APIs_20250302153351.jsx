/** @format */

import axios from 'axios';
// import config from '../config.json';
import sampleData from './data.json';

// const BACKEND_PORT = config.BACKEND_PORT;
axios.defaults.withCredentials = true;

export const getWholeGraph = (dir) => {
  // try {
  // const response = await axios.get(`http://localhost:${BACKEND_PORT}/${dir}`);

  const data = JSON.parse(sampleData);

  return data;
  // } catch (error) {
  //   console.error('Error fetching and parsing data:', error);
  //   throw error;
  // }
};

export const testToken = async () => {
  // try {
  //   const response = await axios
  //     .get(`http://localhost:${BACKEND_PORT}/force_graph/whole_graph/`)
  //     .then((response) => {
  //       console.log(response);
  //       // add header to axios
  //       axios.post(
  //         `http://localhost:${BACKEND_PORT}/force_graph/whole_graph/`,
  //         null,
  //         {
  //           headers: {
  //             Authorization: response.data,
  //           },
  //         },
  //       );
  //       return response.data;
  //     });
  //   console.log('response', response);
  //   return response;
  // } catch (error) {
  //   console.error('Error fetching and parsing data:', error);
  //   throw error;
  // }
};

export const getAllLabels = async () => {
  // try {
  //   const response = await axios
  //     .get(`http://localhost:${BACKEND_PORT}/graph/color`)
  //     .then((response) => {
  //       return JSON.parse(response.data);
  //     });
  //   const labels = response.Labels.map((label) => label.name);
  //   return labels;
  // } catch (error) {
  //   console.error('Error fetching labels:', error);
  //   throw error;
  // }
};

export const getAllRelations = async () => {
  // try {
  //   const response = await axios
  //     .get(`http://localhost:${BACKEND_PORT}/graph/color`)
  //     .then((response) => {
  //       return JSON.parse(response.data);
  //     });
  //   const links = response.Links.map((links) => links.name);
  //   console.log('links', links);
  //   return links;
  // } catch (error) {
  //   console.error('Error fetching labels:', error);
  //   throw error;
  // }
};

export const login = async (scheme, url, userName, password) => {
  // const URL = `${scheme}://${url}`;
  // try {
  //   const response = await axios
  //     .post(`http://localhost:${BACKEND_PORT}/graph/login`, {
  //       URI: URL,
  //       USER: userName,
  //       PASSWORD: password,
  //     })
  //     .then((response) => {
  //       return response.data;
  //     });
  //   return response;
  // } catch (error) {
  //   console.error('Error logging in:', error);
  //   throw error;
  // }
};

export const GetALlNodesViaOneLabel = async (label) => {
  // try {
  //   const response = await axios
  //     .post(`http://localhost:${BACKEND_PORT}/graph/dashboard`, {
  //       label,
  //     })
  //     .then((response) => {
  //       return JSON.parse(response.data);
  //     });
  //   return response;
  // } catch (error) {
  //   console.error('Error fetching label:', error);
  //   throw error;
  // }
};

export const GetOneRelation = async (relation) => {
  // try {
  //   const response = await axios
  //     .post(`http://localhost:${BACKEND_PORT}/graph/dashboard`, {
  //       relationship_type: relation,
  //     })
  //     .then((response) => {
  //       return JSON.parse(response.data);
  //     });
  //   return response;
  // } catch (error) {
  //   console.error('Error fetching label:', error);
  //   throw error;
  // }
};

export const DrawingQuery = async (requestData) => {
  // try {
  //   const response = await axios
  //     .post(`http://localhost:${BACKEND_PORT}/graph/query`, requestData, {
  //       headers: {
  //         'drawing-record': true
  //       }
  //     })
  //     .then((response) => {
  //       return JSON.parse(response.data);
  //     });
  //   return response;
  // } catch (error) {
  //   console.error('Error fetching label:', error);
  //   throw error;
  // }
};

export const fetchQueryHistory = async () => {
  // try {
  //   const response = await axios
  //     .get(`http://localhost:${BACKEND_PORT}/graph/history`)
  //     .then((response) => {
  //       return response.data;
  //     });
  //   return response;
  // } catch (error) {
  //   console.error('Error fetching label:', error);
  //   throw error;
  // }
};
