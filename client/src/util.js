import axios from 'axios';

const getter = (url) => axios.get(url).then((res) => res.data);

export default getter;
