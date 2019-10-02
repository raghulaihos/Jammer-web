import axios from 'axios';

const instance = axios.create({
    baseURL:'https://jammer-server.herokuapp.com'
});

export default instance;

//https://jammer-server.herokuapp.com

//http://localhost:3000