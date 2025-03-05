import server from '@/config/server/index.js'
import { userStore } from '@/store/user'

let api = {
  roles: () => {
    return server.api().get('/sa-admin/api/v1/bs/noToken/roleListByPhone').auth(false).config(false)
  },
  code: () => {
    return server.api().get('/sa-admin/api/v1/bs/noToken/sendMessage').auth(false).config(false)
  },
  login: () => {
    return server.api().post('/sa-admin/api/v1/bs/login').auth(false).config(true)
  }
}
function login(info) {
  server.auth.setInfo({
    authorization: `123123`,
    refreshToken: '123123',
    userId: 'userId'
  })
  userStore().login({ username: info.username })
  return Promise.resolve(true)

  // return api
  //   .login()
  //   .fetch(info)
  //   .then((res) => {
  //     server.auth.setInfo({
  //       authorization: `${res.token_type} ${res.access_token}`,
  //       refreshToken: res.refresh_token,
  //       userId: res.userId
  //     })
  //     return userStore().update('login')
  //   })
}

function roles(phone, type) {
  return api.roles().fetch({ phone, type })
}

function code(phone) {
  return api.code().fetch({ phone })
}

export default {
  roles,
  login,
  code
}
