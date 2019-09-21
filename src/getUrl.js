import axios from "axios";

export const API_URL = "http://api.abcer.world/api/v1/";

export const getUrl = (url) => {
  return new Promise(
    (resolve, reject) => {
      axios
        .get(API_URL + 'publicurl/' + url)
        .then(res => {
          resolve(res.data);
        })
        .catch(err => {
          reject(err.response ? err.response.data : err);
        });
      });
};
