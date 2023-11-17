import axios from 'axios'

const API_URL = "http://localhost:8080";

export default {
    getAllUsers(){
        return axios.get(`${API_URL}/users`);
    },
    deleteUser(userId) {
        return axios.delete(`${API_URL}/users/${userId}`);
    },
    updateUser(userId, updatedUser) {
        return axios.put(`${API_URL}/users/${userId}`, updatedUser);
    },

    create(newUser) {
        return axios.post(`${API_URL}/users`, newUser);
    }
}


