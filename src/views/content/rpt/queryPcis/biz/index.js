import dt from '@dt/dt';
import server from '@dt/server/dt';
import { userStore } from '@/store/user'

const api = {
  functionMenuSave: server.api().post('/hft-portal/functionMenu/save'),
  functionMenuDelete:server.api().get('/hft-portal/functionMenu/delete'),
  functionMenuUpdate:server.api().post('/hft-portal/functionMenu/update')
}

function functionMenuSave(info) {
  let params = {
    ...info,
    userId: userStore().info.userId
  }
  return api.functionMenuSave.fetch(params)
}

function functionMenuDelete(info) {
  let params = {
    ...info,
    userId: userStore().info.userId
  }

  return api.functionMenuDelete.fetch(params)
}

function functionMenuUpdate(info) {
  let params = {
    ...info,
    userId: userStore().info.userId
  }

  return api.functionMenuUpdate.fetch(params)
}

export default {
  functionMenuSave,
  functionMenuDelete,
  functionMenuUpdate
}