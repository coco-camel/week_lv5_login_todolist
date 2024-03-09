import axios from "axios";

const userAxios = axios.create({
    baseURL: process.env.REACT_APP_SERVER_URL,
});
export default userAxios;
