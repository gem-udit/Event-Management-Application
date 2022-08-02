import axios from "axios";

const base_URL = "https://jsonplaceholder.typicode.com/users";

async function getEmployees() {
    try {
        const response = await axios.get(base_URL);
        return response.data;
    } catch (error) {
        return [];
    }
}

async function getEmployee(findById) {
    try {
        const response = await axios.get(`${base_URL}/${findById}`);
        return response.data;
    }
    catch (error) {
        return [];
    }
}

export { getEmployees, getEmployee };