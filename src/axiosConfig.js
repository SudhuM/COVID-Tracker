import axios from 'axios';

const axiosConfig = axios.create({
	baseURL : 'https://covid19.mathdro.id/api'
});

export default axiosConfig;
