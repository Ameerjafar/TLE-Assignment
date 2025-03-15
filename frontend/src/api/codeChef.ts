import axios from "axios";

export const fetchCodeChefContests = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/codeChefRoute`);
        console.log(response.data);
        return { 
            pastContests: response.data.pastContests, 
            futureContests: response.data.futureContests 
        };
    } catch (error) {
        console.log(error);
        return { pastContests: [], futureContests: [] };
    }
};
