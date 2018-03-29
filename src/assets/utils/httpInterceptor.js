import axios from 'axios';
import CookieUtil from './cookie';
//结合axios设置http拦截器
/**
 * 满足要求
 * 1、对于数据请求添加token的header
 * 2、设置请求地址根路径
 * 3、对数据返回错误统一处理
 * 4、暴露请求前，请求后的钩子
 * 5、封装get,post数据请求方法
 */
//全局默认值
let serverHost = 'http://39.106.220.86:7001';
axios.defaults.baseURL = serverHost;
//拦截器
// 添加请求拦截器
axios.interceptors.request.use(
    function(config) {
    // 在发送请求之前做些什么
        console.log('发送请求前');
        return config;
    },
    function(error) {
    // 对请求错误做些什么
        return Promise.reject(error);
    }
);

//获取cookie中token
// let _token=CookieUtil.get('token');
// 添加响应拦截器
axios.interceptors.response.use(
    function(response) {
    // 对响应数据做点什么
        console.log('请求返回来了');
        return response;
    },
    function(error) {
    // 对响应错误做点什么
        return Promise.reject(error);
    }
);
let $http = {
    /**
   * get请求
   * @param {*} url  请求地址
   * @param {*} params  请求参数
   */
    get(url, params) {
        if (params && typeof params !== 'object') throw new Error('params is not a object,=>$http');
        return new Promise(function(resolve, reject) {
            // if(!_token)_token=CookieUtil.get('token');
            axios
                .request({
                    url: url,
                    method: 'get',
                    params: params
                    //  headers:{token:'SDTK_af15d8ab8e83822ea455a6ed011c961d_0ufaW',
                    //         appkey:'SD_YzlhYzlkNjJjNTcwNGEzMzk2Y2RmOWJlZmE2Mjc5NGEzT1_Zxw4k'
                    //     }
                })
                .then(function(res) {
                    if (typeof res.data.code == 'undefined') throw new Error('the format of http response data is error');
                    let data = res.data;
                    if (data.code === 0) resolve(data.result);
                    else reject({code: data.code, result: data.result});
                })
                .catch(error => {
                    throw new Error(error);
                });
        });
    },
    /**
   * post提交
   * @param {*} url  请求地址
   * @param {*} params  post数据
   * @param {*} opt
   * opt:{
   *  onUploadProgress:数据下载进度事件
   *  onDownloadProgress:数据上传进度事件
   *  reloadToken:是否需要重新获取token,用于登录与登出
   * }
   */
    post(url, params, opt = {}) {
        if (params && typeof params !== 'object') throw new Error('params is not a object,=>$http');
        return new Promise(function(resolve, reject) {
            // if (!_token) _token = CookieUtil.get('token');
            let postOpts = {};
            // if (typeof opt.onUploadProgress === 'function') postOpts.onUploadProgress = onUploadProgress;
            // if (typeof opt.onDownloadProgress === 'function') postOpts.onDownloadProgress = onDownloadProgress;
            axios
                .request(
                    Object.assign(
                        {
                            url: url,
                            method: 'post',
                            data: params
                            // headers:{token:_token,appkey:'SD_YzlhYzlkNjJjNTcwNGEzMzk2Y2RmOWJlZmE2Mjc5NGEzT1_Zxw4k'}
                        },
                        postOpts
                    )
                )
                .then(function(res) {
                    if (typeof res.data.code == 'undefined') throw new Error('the format of http response data is error');
                    let data = res.data;
                    if (data.code === 0) {
                        // if (opt.reloadToken) _token = false;
                        resolve(data.result);
                    } else reject({code: data.code, result: data.result});
                })
                .catch(error => {
                    console.log('捕捉到错误');
                    throw new Error(error);
                });
        });
    },
    baseURL: axios.defaults.baseURL
};

export default $http;
