import axios from 'axios';




const instance = axios.create({

    baseURL:'http://laravelapi.dct-roosh-hirkan.ir/api',
    timeout: 5000,

});



export default instance;