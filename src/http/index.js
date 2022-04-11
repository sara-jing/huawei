import axios from 'axios';
import { URLPATH } from '../config/config';
import { Message } from 'element-ui';
import router from '../router';
const token = sessionStorage.getItem('token');
const instance = axios.create({
    baseURL: URLPATH,
    timeout: 3000
});
instance.interceptors.request.use(function(config) {
    config.headers.token = token;
    return config;
}, function(error) {
    return Promise.reject(error);
});
instance.interceptors.response.use(function(response) {
    return response.data;
},function(error) {
    let status = error.response.status;
    
    switch(status) {
        case 401:
            router.replace({name: 'login'});
            Message.warning('没有提供认证信息');
            break;
        case 403:
            Message.warning('请求的资源不允许访问');
            break;
        case 404:
            Message.warning('请求资源不存在');
            break;
        case 500:
            Message.warning('服务器错误');
            break;
        case 503:
            Message.warning('服务暂时不可用，服务器正好在更新代码重启');
            break;
        }
    return Promise.reject(error);
});
export default instance;