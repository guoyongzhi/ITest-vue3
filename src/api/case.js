import request from '@/utils/request'

export function caseAll() {
  return request({
    url: '/auto-test/case/all',
    method: 'get'
  })
}

export function caseList(query) {
  return request({
    url: '/auto-test/case',
    method: 'get',
    params: { ...query }
  })
}

export function createcase(data) {
  return request({
    url: '/auto-test/case',
    method: 'post',
    data
  })
}

export function updatecase(data) {
  return request({
    url: '/auto-test/case',
    method: 'put',
    data
  })
}

export function deletecase(data) {
  return request({
    url: '/auto-test/case',
    method: 'delete',
    params: { ...data }
  })
}

export function icaseAll() {
  return request({
    url: '/auto-test/iCase/all',
    method: 'get'
  })
}

export function icaseList(data) {
  return request({
    url: '/auto-test/iCase',
    method: 'get',
    params: { ...data }
  })
}

export function createicase(data) {
  return request({
    url: '/auto-test/iCase',
    method: 'post',
    data
  })
}

export function updateicase(data) {
  return request({
    url: '/auto-test/iCase',
    method: 'put',
    data
  })
}

export function deleteicase(data) {
  return request({
    url: '/auto-test/iCase',
    method: 'delete',
    params: { ...data }
  })
}

export function GetKeyword() {
  return request({
    url: '/auto-test/GetKeyword',
    method: 'get'
  })
}

export function uploadExcel(data) {
  return request({
    url: '/auto-test/case/import',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}

export function importInterfacs(data) {
  return request({
    url: '/auto-test/interfaces/import',
    method: 'post',
    headers: {
      'Content-Type': 'multipart/form-data'
    },
    data
  })
}
