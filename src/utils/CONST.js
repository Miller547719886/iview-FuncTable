import lodash from 'lodash'
import common from './common'
import dom from './dom'

export default () => {
  window.Null = '__NULL__'
  window._ = lodash
  window.$CONST = {
    USER_KEY: 'USER_KEY',
    TOKEN_KEY: 'X-Auth-Token',
    CONFIG_COLUMNS_KEY: 'CONFIG_COLUMNS_KEY'
  }
  window.common = common
  window.dom = dom
}
