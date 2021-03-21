import axios from 'axios';

export function request(config) {
  return new Promise((resolve, reject) => {
    // 创建axios实例
    const intance = axios.create({
      baseURL: "http://123.207.32.32:8000",
      timeout: 5000,
    });
    intance(config)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
}
