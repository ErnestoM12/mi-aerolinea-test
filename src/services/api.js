import axios from 'axios';


export default axios.create({
    baseURL: `https://mi-aerolinea.herokuapp.com/api/`
});