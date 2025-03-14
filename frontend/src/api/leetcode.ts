
import axios from "axios"

export const fetchLeetcodeContests = async () => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_API}/leetCodeRoute`);
        // console.log(response.data.leetcodeContests.data.topTwoContests)
        return response.data.leetcodeContests.data.topTwoContests;
    }catch(error) {
        console.log("This is the error you got", error);
        return []
    }
}