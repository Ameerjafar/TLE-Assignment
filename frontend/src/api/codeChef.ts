import axios from "axios"

export const fetchCodeChefContests = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/codeChefRoute`);
        console.log(response.data);
        return response.data;
    }catch(error) {
        console.log(error);
        return [];
    }

}