import request from '@/utils/request'

export function login(username, password) {
  return request({
    url: '/camera/web/login',
    method: 'post',
    params: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/camera/web/userInfo',
    method: 'get',
    params: { token }
  })
}

export function logout(token) {
  return request({
    url: '/camera/web/logout',
    method: 'get',
    params: { token }
  })
}
