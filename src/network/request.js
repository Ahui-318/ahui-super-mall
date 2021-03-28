import axios from "axios";
// import { reject, resolve } from "core-js/fn/promise";

export function request(config) {
  return new Promise((resolve, reject) => {
    // 创建axios实例
    const intance = axios.create({
      baseURL: "http://123.207.32.32:8000",
      timeout: 5000
    });
    intance(config)
      .then(res => {
        resolve(res);
      })
      .catch(err => {
        reject(err);
      });
  });
}

export function requestNew(config) {
  return new Promise((resolve, reject) => {
    const intancenew = axios.create({
      baseURL: "http://152.136.185.210:7878/api/m5"
      //...
    });
    intancenew(config)
      .then(result => {
        resolve(result);
      })
      .catch(err => {
        reject(err);
      });
  });
}
