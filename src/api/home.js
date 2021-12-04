import request from '@/utils/request'

export function statisticsSum() {
  return request({
    url: '/auto-test/home/statistics',
    method: 'get'
  })
}
