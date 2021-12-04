import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export function getInfo(UserID) {
  return request({
    url: '/auto-test/user',
    method: 'get',
    params: { name: 'admin' }
  })
}

export function updateInfo(data) {
  return request({
    url: '/user/info',
    method: 'put',
    data
  })
}

export function logout(data) {
  return request({
    url: '/auto-test/user/logout',
    method: 'post',
    data
  })
}

export function regist(data) {
  return request({
    url: '/user/register',
    method: 'post',
    data
  })
}

export function resetpassword(data) {
  return request({
    url: '/auto-test/reset',
    method: 'post',
    data
  })
}
