App({
  globalData: {
    userInfo: null,
    userMobile: null
  },
  /**
   * 注：
   * appGetUserInfo、appGetUserMobile、updataUserInfo、checkEmpower 这几个函数放到app.js内，方便不同页面调用
   */

  // 获取userInfo授权
  appGetUserInfo: function (cb) {
    const { updataUserInfo } = this;
    wx.getUserInfo({
      withCredentials: false,
      success: function (userInfoRes) {
        if (userInfoRes.errMsg === 'getUserInfo:ok') {
          updataUserInfo(userInfoRes.userInfo);
          cb && cb(userInfoRes.userInfo);
        }
      },
      fail: function (err) {
        showInfoModal({ content: '授权失败，请重新点击授权！' });
      }
    });
  },

  // 获取用户手机号授权
  appGetUserMobile: function (cb) {
    // 此处会报错，因为小程序没有认证
    // 手机号需要放到后台去解密，这里写个假数据
    this.globalData.userMobile = '10010';
    cb && cb();
  },


  // 将获得的userInfo同步到app.js及服务器
  updataUserInfo: function (res) {
    // 同步到app.js
    this.globalData.userInfo = res;
    // 同步到服务器
    // ...
  },

  /**
   * 检查授权
   * @returns {Number} 1 - 用户信息授权; 2 - 手机号授权; 0 - 全部授权完成
   */
  checkEmpower: function () {
    if (!this.globalData.userInfo) {
      return 1;
    } else if (!this.globalData.userMobile) {
      return 2;
    } else if (this.globalData.userInfo && this.globalData.userMobile) {
      return 0;
    } else {
      return -1;
    }
  },

  onLaunch: function () {

  }
})
