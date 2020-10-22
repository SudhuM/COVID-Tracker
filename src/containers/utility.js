import axios from '../axiosConfig';

const fetchAllData = async (url) => {
	const response = await axios.get(url);
	return response.data;
};

export default fetchAllData;
