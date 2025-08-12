"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_userStore = require("../../store/userStore.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  _easycom_up_icon2();
}
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (NavBar + _easycom_up_icon)();
}
const NavBar = () => "../../component/navBar2.js";
const _sfc_main = {
  __name: "mine",
  setup(__props) {
    const userStore = store_userStore.userUserStore();
    const userinfo = userStore.userInfo || {};
    common_vendor.index.getStorageSync("role");
    const tologin = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/login/login"
      });
    };
    const toUserinfo = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/userinfo"
      });
    };
    const toContain = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/expert/expertContain"
      });
    };
    const toQuestion = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/expert/expertGetQuestion"
      });
    };
    const toKnowledge = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/expert/expertKnowlege"
      });
    };
    const removeToken = userStore.removeToken();
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return common_vendor.e({
        a: common_vendor.unref(userStore).token
      }, common_vendor.unref(userStore).token ? common_vendor.e({
        b: common_vendor.unref(userinfo).avatar,
        c: common_vendor.unref(userinfo).nickname
      }, common_vendor.unref(userinfo).nickname ? {
        d: common_vendor.t(common_vendor.unref(userinfo).nickname)
      } : {
        e: common_vendor.t(common_vendor.unref(userinfo).username)
      }) : {}, {
        f: !common_vendor.unref(userStore).token
      }, !common_vendor.unref(userStore).token ? {
        g: common_assets._imports_0$2,
        h: common_vendor.o(tologin)
      } : {}, {
        i: common_vendor.o(toUserinfo),
        j: common_vendor.p({
          name: "arrow-right"
        }),
        k: ((_a = common_vendor.unref(userStore)) == null ? void 0 : _a.role) == 1
      }, ((_b = common_vendor.unref(userStore)) == null ? void 0 : _b.role) == 1 ? {
        l: common_assets._imports_1$1,
        m: common_vendor.o(toContain),
        n: common_assets._imports_2$1,
        o: common_vendor.o(toQuestion),
        p: common_assets._imports_3,
        q: common_vendor.o(toKnowledge)
      } : {}, {
        r: ((_c = common_vendor.unref(userStore)) == null ? void 0 : _c.role) == 0
      }, ((_d = common_vendor.unref(userStore)) == null ? void 0 : _d.role) == 0 ? {
        s: common_assets._imports_4,
        t: common_vendor.o((...args) => _ctx.tomypost && _ctx.tomypost(...args)),
        v: common_assets._imports_5,
        w: common_vendor.o((...args) => _ctx.tomyQuestion && _ctx.tomyQuestion(...args)),
        x: common_assets._imports_3,
        y: common_vendor.o(toKnowledge)
      } : {}, {
        z: common_vendor.o((...args) => common_vendor.unref(removeToken) && common_vendor.unref(removeToken)(...args))
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-7c2ebfa5"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/mine.js.map
