import axios from "axios";

// console.log('process.env.BACKEND_URL', process.env.BACKEND_URL)

export default axios.create({
  baseURL: `${process.env.BACKEND_URL}`,
  headers: {
    "Content-type": "application/json",
    'Access-Control-Allow-Origin' : '*'
  },
});
