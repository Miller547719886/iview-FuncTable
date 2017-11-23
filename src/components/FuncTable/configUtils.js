import common from '@/utils/common'
import loginUtils from '@/utils/loginUtils'
/**
 * 组件配置保存到本地
 */
export default {
  /**
   * localstorage表格列配置数据结构
   * {
   *   table001: ['selection', 'name', 'type']
   * }
   */
  getColumnsKey (tableId) {
    let account = loginUtils.getUserInfo().account
    const config = common.getStorage(window.$CONST.CONFIG_COLUMNS_KEY)
    if (tableId) {
      return (config
        ? (config[account]
          ? config[account][tableId]
          : undefined)
        : undefined) // 获取对应id的配置
    } else {
      return void 0
    }
  },
  setColumnsKey (columnsConfigObj) {
    common.setStorage(window.$CONST.CONFIG_COLUMNS_KEY, columnsConfigObj)
    console.log(common.getStorage(window.$CONST.CONFIG_COLUMNS_KEY), 'saved config')
  },
  clearColumnsKey () {
    common.rmStorage(window.$CONST.CONFIG_COLUMNS_KEY)
  }
}
