import common from './common'
export default {
  checkIsLogin () {
    const USER = common.getStorage(window.$CONST.USER_KEY)
    return !(USER === null)
  },
  setUserInfo (user) {
    common.setStorage(window.$CONST.USER_KEY, user)
  },
  getUserInfo () {
    return common.getStorage(window.$CONST.USER_KEY)
  },
  logout () {
    common.rmStorage(window.$CONST.USER_KEY)
    common.rmStorage(window.$CONST.TOKEN_KEY)
    // configUtils.clearColumnsKey()
  },
  getToken () {
    return common.getStorage(window.$CONST.TOKEN_KEY)
  },
  setToken (token) {
    common.setStorage(window.$CONST.TOKEN_KEY, token)
  }
}
