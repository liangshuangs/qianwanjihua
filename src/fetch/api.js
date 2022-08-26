/*
 * @Anthor: liangshuang15
 * @Description:
 * @Date: 2022-06-10 19:21:33
 * @LastEditTime: 2022-07-29 19:29:26
 * @FilePath: /qianwanjihua/src/fetch/api.js
 */
export const api = {
    login: '/stock/api/user/login', // 登录
    touzijihua: '/stock/api/plan/list', // 获取投资计划
    transactionplan: '/stock/api/transactionplan/list', // 获取交易计划
    addTransctionPlan: '/stock/api/transactionplan/save', // 新增修改交易计划
    delePlan: '/stock/api/plan/delete', // 删除投资计划
    savePlan: '/stock/api/plan/save', // 新增投资计划
    startPlan: '/stock/api/plan/start', // 启动投资计划
    startTransactionplan: '/stock/api/transactionplan/start', // 启动交易计划
    delTransactionplan: '/stock/api/transactionplan/delete', // 删除交易计划
    getHoldGuPiao: '/stock/api/userhold/list', // 获取持股数据
    getklinepattern: '/stock/api/getklinepattern', // 获取股票
    searchList: '/stock/api/favorite/searchList', //  查询股票
    getKline: '/stock/api/kline', // 获取K线图
    addZixuan: '/stock/api/favorite/save', // 添加自选股票
    getZixuan: '/stock/api/favorite/list', // 获取自选股列表
    startJiaoyi: '/stock/api/transaction/dotransaction', // 启动交易
    endPlan: '/stock/api/plan/end', // 结束投资计划
    dadiehuisheng: '/stock/api/rising/recover', // 大跌回升
    atferbigrising: '/stock/api/rising/atferbigrising', // 大阳不跌
    multirising: '/stock/api/rising/multirising', // 连续上涨
    getZiXuanTab: '/stock/api/favorite/gettags', // 获取自选标签
    deleteZiXuan: '/stock/api/favorite/delete', // 删除自修按
    viewignore: '/stock/api/viewignore/save', // 添加忽略
    ignoreList: '/stock/api/viewignore/list', // 忽略列表
    delIgnore: '/stock/api/viewignore/delete', // 删除忽略股票

}