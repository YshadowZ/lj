/**
 * Created by zhaoyan on 17/1/18.
 */
import api from '../utils/api';

// const GET = /^get.*$/i;
const POST = /^post.*$/i;
const PUT = /^put.*$/i;
const DELETE = /^delete.*$/i;
const QUERY = /^\?.*$/i;

function ajaxType(apiName) {
  let type = 'GET';
  if (POST.test(apiName)) {
    type = 'POST';
  } else if (PUT.test(apiName)) {
    type = 'PUT';
  } else if (DELETE.test(apiName)) {
    type = 'delete';
  }
  return type;
}

export default (apiName, data, id) => { // id: 如有query, 请在末尾拼接, 如"xxx?type=111"
  if (!apiName) {
    console.error('Ajax参数有误。');
    return false;
  }
  if (typeof data === 'string') {
    id = data;
    data = undefined;
  }
  const type = ajaxType(apiName);
  let domain = 'http://10.8.8.8:4096';
  let path = '/api/course';
  let url = '';
  // 个别接口Domain特殊处理
  switch (apiName) {
    case 'getVideoList':
      domain = 'http://10.8.4.4:3001';
      path = '';
      break;
    case 'postSignVideo':
      path = '/api/config';
      break;
    default:
  }
  url = `${domain}${path}${api[apiName]}`;
  if (id) {
    if (!QUERY.test(id)) {  // 只有query时不加斜杠
      url += '/';
    }
    url += `${id}`;
  }
  return $.ajax({
    type,
    url,
    contentType: 'application/json;charset=utf-8',
    data: type === 'GET' ? data : JSON.stringify(data)
  });
};
