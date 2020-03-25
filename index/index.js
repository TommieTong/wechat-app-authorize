const app = getApp()

Page({
  data: {
    isEmpower: false, // 是否全部授权完成
    empowerPop: 0, // 0: 不弹出; 1: 用户信息; 2: 手机号
  },

  onTap: function () {
    const empowerRes = this.thisCheckEmpower();
    if (empowerRes) {
      return
    }

  },

  /**
   * 检查授权及获取授权
   * @returns {Number} 1 - 用户信息授权; 2 - 手机号授权; 0 - 全部授权完成
   */
  thisCheckEmpower: function () {
    const startEmpower = app.checkEmpower();
    
    this.setData({ empowerPop: startEmpower });
    return startEmpower;
  },

  /**
   * 子组件empower的事件
   * @param {Number} res - 子组件返回值, -1: 关闭授权弹窗 ; 0: 全部授权完成
   */
  empowerChange: function (res) {
    // 全部授权完成 
    if (~res.detail) {
      console.log('全部授权完成: ');
      console.log('userInfo: ', app.globalData.userInfo);
      console.log('userMobile(假数据): ', app.globalData.userMobile);
      this.setData({ isEmpower: true });
      // to do sth...
    }
    // 此处统一作为0处理，来关闭弹窗
    this.setData({ empowerPop: 0 });
  },

  onLoad: function () {
    console.log('代码片段是一种迷你、可分享的小程序或小游戏项目，可用于分享小程序和小游戏的开发经验、展示组件和 API 的使用、复现开发问题和 Bug 等。可点击以下链接查看代码片段的详细文档：');
    console.log('https://mp.weixin.qq.com/debug/wxadoc/dev/devtools/devtools.html');
  },
})
