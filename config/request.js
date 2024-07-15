// common/http.js

// 封装请求方法
export const request = (options) => {
  // 这里做一些全局请求前的处理

  // 返回请求的 Promise 对象
  return new Promise((resolve, reject) => {
    uni.request({
      ...options,
      success(res) {
        // 在响应拦截器中处理返回数据为 null 的情况
        if (res.data === null) {
          res.data = ''; // 将返回的 null 转换为 ""
        }
        resolve(res);
      },
      fail(err) {
        reject(err);
      }
    });
  });
};
