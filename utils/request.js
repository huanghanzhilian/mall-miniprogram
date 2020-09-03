const API_BASE_URL = 'http://192.168.1.108:3000/web'; //正式环境

/**
 * 接口请求基类方法
 * @param method 请求方法 必填
 * @param url 请求路径 必填
 * @param data 请求参数
 * @param header 请求头 选填
 * @returns {Promise}
 */
export function request(method, url, data, header = { 'Content-Type': 'application/json' }, domain) {
  if (domain) {
    url = `${domain}${url}`
  } else {
    url = `${API_BASE_URL}${url}`;
  }
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method,
      data,
      header,
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          reject(res.errMsg)
        }
      },
      fail: (error) => {
        reject(error)
      }
    });
  });
}

export const get = (url, data, headers, domain) => request('GET', url, data, headers, domain);
export const post = (url, data, headers, domain) => request('POST', url, data, headers, domain);
export const put = (url, data, headers, domain) => request('PUT', url, data, headers, domain);
export const del = (url, data, headers, domain) => request('DELETE', url, data, headers, domain);
