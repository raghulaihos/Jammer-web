import axios from 'axios';

const instance = axios.create({
    baseURL:'https://jammer-server.herokuapp.com'
});

export default instance;