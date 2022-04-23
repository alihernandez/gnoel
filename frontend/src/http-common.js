import axios from "axios";
export default axios.create({
    // baseURL: "https://salty-refuge-49052.herokuapp.com/api",
    baseURL: "http://localhost:8080/api",
    headers: {
        "Content-type": "application/json"
    }
});