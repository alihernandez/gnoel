import axios from "axios";
export default axios.create({
    baseURL: "https://salty-refuge-49052.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});