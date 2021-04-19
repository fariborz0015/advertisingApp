import axios from 'axios';


 
let api_token=window.localStorage.getItem("api_token");

const instance = axios.create({

     
    timeout: 20000,
    headers:{
        Authorization:`Bearer ${api_token}` ,
        Accept: 'application/json',
        "Content-type":"multipart/form-data"
    }

});

 

export {instance as UploadApi ,api_token };