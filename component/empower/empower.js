// component/empower/empower.js
const app = getApp();

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    empowerStatus: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    confirm: function (ev) {
      
      // 再次查询授权状态
      const requeryEmpower = function () {
        const requeryRes = app.checkEmpower();

        if (requeryRes) {
          this.setData({
            empowerStatus: requeryRes
          });
        } else {
          this.triggerEvent('empowerevent', 0);
        }
      }.bind(this);

      // userInfo 或 userMobile 未授权情况处理
      if (this.data.empowerStatus === 1) {
        app.appGetUserInfo(res => {
          requeryEmpower();
        });
      } else if (this.data.empowerStatus === 2) {
        app.appGetUserMobile(res => {
          requeryEmpower();
        });
      }

    },

    cancel: function () {
      this.triggerEvent('empowerevent', -1);
    }
  },

  /**
   * 组件生命周期
   */
  lifetimes: {
    attached: function () {
      wx.hideTabBar({ animation: true });
    },
    detached: function () {
      wx.showTabBar({ animation: true });
    }
  }
})

