import axios from 'axios';

const instance = axios.create({
    baseURL:'http://localhost:3000'
});

export default instance;

//https://jammer-server.herokuapp.com

//http://localhost:3000