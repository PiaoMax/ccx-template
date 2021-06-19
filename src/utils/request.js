import axios from 'axios'
import config from '@/config'
import _ from 'lodash'
import models from '@/models'
import { message } from 'antd';
import { history } from '@cyber-ccx/lib';


const request = (options = {}) => {
  options.headers = {
    'os':'',
    'version': '20210423'
  }

  if(models.user.auth?.token){
    options.headers.authorization = models.user.auth.token;
  }
  
  console.log(options);

  return axios(options)
    .then(checkStatus)
    .then(parseJSON)
    .then(business)
    .then(res => {
      console.log(`
              url:${options.url},
              res:${JSON.stringify(res)}
          `)
      return res;
    })
    .then(checkDataSta).catch(data => {
      console.error(data);
      return { sta: 300, msg: '网络异常' };
    })
}

function parseJSON(response) {
  return response.data;
}


function checkStatus(response) {

  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

function business(response) {
  if (response.head && response.head.code === 0) {
    throw response.head.msg;
  } else {
    return response;
  }
}

function checkDataSta(res) {
  res.success = res.code === 0;
  if (!res.success) {
    if(res.code === 10004||res.code === 10005){
      history.replace('/login');
    }else{
      message.error(data.message);
    }
  }
  return res;
}

const post = (url, data = {}) => {
  let h = config.API_HOST;

  return request({
    method: 'POST',
    url: h + url,
    headers,
    credentials: "include",
    timeout: 20 * 1000,
    data
  })
}

const get = (url, data) => {
  let h = config.API_HOST;
  if(data){
    url += '?' + serialization(data);
  }
  return request({
    method: 'GET',
    url: h + url,
    headers: { 'authorization': base.user.token },
    timeout: 20 * 1000,
    credentials: "include"
  })
}

const serialization = (form,isRemove = true) => {
	let res = [];
	_.forIn(form,(v,k)=>{
    if(isRemove){
      if(v){
        res.push(`${k}=${v}`);
      }
    }else{
      res.push(`${k}=${v === undefined|| v === null?'':v}`);
    }
	});
	return res.join('&');
}

export default request;
export { post, get };
