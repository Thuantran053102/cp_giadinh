import axios from "axios";
const apiKey = 'yhTMTlGGQyPKhlr8IHKMHc4mB7qo3R5t';

export const POST_FORM_DATA = (Url, Token, Data, handleData) => {
    console.log('đã vào',Data)
    axios.post(Url, Data,{        
        headers: { 
            'Content-Type': 'multipart/form-data', 
            "Access-Control-Allow-Origin": "*", 
            "Accept": "application/json",
            'Authorization': `Bearer ${Token}`, 
        }
    }).then(res => {
        console.log('thành công')
        console.log('res.data',res.data)
        handleData(res.data)
    }).catch(function(error) 
    {
        console.log('thất bại')
        handleData({ Status: error.response.status });
    });
}



export const POST_DATA_TOKEN = (Url, Data, handleData) => {
    axios.post(Url, Data,
    {
        headers: { 
            'Content-Type': 'multipart/form-data', 
            "Access-Control-Allow-Origin": "*", 
            "Accept": "application/json",
        },
      auth: 
      {
        username: "SQL01UAT",
        password: "btR/RLAB95C2XR9pxSYnaQ=="
      }
    }).then(res => {
        handleData(res.data);
    }).catch(function(error) 
      {
        handleData({ Status: error.response.status });
      });
}
