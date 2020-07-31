//引入axios
import axios from 'axios';

//配置公共的url
// axios.defaults.baseURL = 'http://tt.linweiqin.com/api/tt/';
axios.defaults.baseURL = process.env.VUE_APP_URL; //从.env.development 文件中读取

//配置请求的拦截器
axios.interceptors.request.use(function(config){
    return config;
}, function(err){return Promise.reject(err)});

//配置响应的拦截器
axios.interceptors.response.use(function(response){
    return response.data; //只需要返回data
}, function(err){ return Promise.reject(err)});


//导出自定义的axios
export default axios