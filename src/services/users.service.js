import axios from "axios";

const base_URL = "https://jsonplaceholder.typicode.com/users";

async function getAllUsers() {
    try{
        const response = await axios.get(base_URL);
        return response.data;
    }catch(error) {
        return [];
    }
}

async function getParticularUser(findById) {
    try{
        const response = await axios.get(`${base_URL}/${findById}`);
        return response.data;
    }
    catch(error) {
        return [];
    }
}

export {getAllUsers,getParticularUser};