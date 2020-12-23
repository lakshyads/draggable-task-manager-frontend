import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:3002/taskmanager/api/v1';

const handleError = (error) => {
  alert(
    `Action failed! ${error.response.data.message}. Check console logs for details.`
  );
  console.log({ success: false, error: error });
  return { success: false, error: error };
};
const handleData = (data) => ({ success: true, data: data });

/**
 * Use to fetch
 * @param {*} url
 */
export const get = async (url) => {
  try {
    const data = await axios.get(url);
    return handleData(data.data);
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Use to post
 * @param {*} url
 * @param {*} payload
 */
export const post = async (url, payload) => {
  try {
    const data = await axios.post(url, payload);
    return handleData(data);
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Use to update
 * @param {*} url
 * @param {*} payload
 */
export const update = async (url, payload) => {
  try {
    const data = await axios.patch(url, payload);
    return handleData(data);
  } catch (error) {
    return handleError(error);
  }
};

/**
 * Use to delete
 * @param {*} url
 * @param {*} payload
 */
export const remove = async (url, payload) => {
  try {
    const data = await axios.delete(url, { data: payload });
    return handleData(data);
  } catch (error) {
    return handleError(error);
  }
};
