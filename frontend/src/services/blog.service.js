// service that uses axios objects to send HTTP requests.

import http from "../http-common";

const getAll = () => {
        return http.get("/blogs");
    };
const get = id => {
        return http.get(`/blogs/${id}`);
    };
const create = data => {
        return http.post("/blogs", data);
    };
const uploadFiles = data => {
        return http.post("/upload", data)
}
const update = (_id, data) => {
        return http.put(`/blogs/${_id}`, data);
    };
const remove = _id => {
        return http.delete(`blogs/${_id}`);
    }
const removeAll = () => {
        return http.delete(`/blogs`);
    }
const findByTitle = title => {
        return http.get(`blogs?title=${title}`);
    };
export default {
    getAll,
    get,
    create,
    uploadFiles,
    update,
    remove,
    removeAll,
    findByTitle
};