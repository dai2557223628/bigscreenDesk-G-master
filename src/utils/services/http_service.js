import axios from 'axios'
import Vue from "vue"
import { MessageBox, Loading } from 'element-ui'
import Tips from "@/utils/utils/Tips";
import store from "@/store/index"
import tokenService from "./token_service"
import qs from 'qs'
import NProgress from 'nprogress' // progress bar


NProgress.configure({ showSpinner: false }) // NProgress Configuration

let _loading = undefined;

let _tokenConfirm = undefined;

const _requestOptions = {
    baseURL: process.env.VUE_APP_BASE_URL, // api的base_url
    timeout: 60000, // 请求超时时间
    headers: {
        // 'Content-Type': 'application/json;charset=UTF-8',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    },
    responseType: 'json',
    xsrfHeaderName: 'token',
}

const requestOptions = Object.assign({}, _requestOptions);

let httpInstance = axios.create(requestOptions);

// 添加请求拦截器
httpInstance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    let _token = tokenService.getToken();
    if (_token) {
        let sidStr = 'sid=' + _token
        // config.headers['authorization'] = `Bearer ${_token}`;
        if (config.data) {
            config.data = config.data + '&' + sidStr
        } else {
            config.data = sidStr
        }
    }

    //TODO：多语言请求在这里处理
    if (config.type && config.type == 'file') {
        config.headers['Content-Type'] = 'multipart/form-data'
    }

    if (typeof config.type !== 'undefined' && config.type == 'download') {
        config.headers['responseType'] = 'blob'
    }
    // 网络加载
    if (config.loading) {
        _loading = Loading.service({
            lock: true,
            text: 'Loading',
            spinner: 'el-icon-loading',
            background: 'rgba(0, 0, 0, 0.7)'
        });
    }
    return config;

}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
httpInstance.interceptors.response.use(function (response) {
    // 网络加载结束
    Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        if (response.config.loading) {
            _loading && _loading.close && _loading.close()
        }
    });

    if (response.status == 200) {
        let _data = response.data;
        if (_data && _data.error_code != undefined) {
            let errorCode = _data.error_code
            if (errorCode == "403") {
                //todo:判断token过期的情况，调用 store.dispatch('logout')
                if (typeof _tokenConfirm === 'undefined' && store.state.login) {
                    _tokenConfirm = MessageBox.confirm(_data.msg, "", {
                        confirmButtonText: "确定",
                        showCancelButton: false,
                        closeOnClickModal: false,
                        showClose: false,
                        type: "warning"
                    }).then(() => {
                        _tokenConfirm = undefined
                    }).catch(() => {
                        _tokenConfirm = undefined
                    })
                }
                store.dispatch("logout");
                return Promise.reject(response)
            }

            if (typeof response.config.handleError != 'undefined') {
                return response
            }

            // 返回为正确结果的code
            if (errorCode != '0') {
                Tips.notify({
                    type: "error",
                    title: '错误',
                    message: _data.error_message,
                    customClass: "zv-net-error-notify",
                });
                return Promise.reject(_data);
            } else {
                return _data
            }
        }
    }

    return response;

}, function (error) {
    // 网络加载结束
    Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
        _loading && _loading.close && _loading.close()
    });

    // 对响应错误做点什么
    let errorStr = error.message
    if (errorStr.indexOf('timeout of') > -1) {
        errorStr = "网络超时，请稍后再试"
    }
    Tips.notify({
        type: "error",
        title: '错误',
        message: errorStr,
        customClass: "zv-net-error-notify",
    });

    return Promise.reject(error);
});

export default {
    request(url, payload, config) {
        let _config = Object.assign({ url: url }, { data: payload }, config)
        return httpInstance.request(_config);
    },
    get(url, payload = {}, config = {}) {

        let _config = Object.assign({}, {
            params: payload,
            paramsSerializer: params => {
                return qs.stringify(params, { indices: false })
            }
        }, config);
        return httpInstance.get(url, _config);
    },

    post(url, payload = {}, config = {}) {
        let _config = Object.assign({}, config)
        return httpInstance.post(url, qs.stringify(payload), _config)
    },

    put(url, payload = {}, config = {}) {
        let _config = Object.assign({}, config);
        return httpInstance.put(url, payload, _config);
    },

    delete(url, payload = {}, config = {}) {

        let _config = Object.assign({}, {
            params: payload,
            paramsSerializer: params => {
                return qs.stringify(params, { indices: false })
            }
        },
            config);
        return httpInstance.delete(url, _config)
    },

    upload(url, payload = {}, config = {}) {
        let _config = Object.assign({ type: "file" }, config)

        return httpInstance.post(url, payload, _config);
    },
    download(url, payload = {}, config = {}) {
        let _config = Object.assign({
            type: 'download',
            responseType: "blob" // 必须在此处定义responseType ，否则axios无法识别下发给浏览器
        }, config);

        // _config = Object.assign({}, {
        //     params: payload,
        //     paramsSerializer: params => {
        //         return qs.stringify(params, { indices: false })
        //     }
        // }, _config);

        return httpInstance.post(url, qs.stringify(payload), _config).then((res) => {
            if (res.data && res.data.code) {
                Tips.notify({
                    type: "error",
                    title: "请求下载失败",
                    message: res.data.msg
                });
            } else {
                let a = document.createElement("a");
                let blob = new Blob([res.data], { type: config.mimeType || '' });
                a.href = URL.createObjectURL(blob);
                a.download = config.fileName || new Date().getTime();
                a.click();
            }
        });
    }
}
