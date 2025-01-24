import Auth from '../base/Auth.js'

class DtAuth extends Auth {
  constructor(delegate) {
    super('dt_auth', delegate)
  }

  header(path, need) {
    return this.need(path, need) ? this.info || {} : {}
  }

  need(path, need) {
    return path.indexOf('/noToken/') < 0 && need
  }

  needReAuth(code) {
    return [401, 40007, 40008, 40009, 50401, 50404, 50406, 50407, 50408, 50409].indexOf(Number(code)) >= 0
  }
}

export default DtAuth
