import axios from "axios";
export default axios.create({
    baseURL: "salty-refuge.herokuapp.com/api",
    headers: {
        "Content-type": "application/json"
    }
});