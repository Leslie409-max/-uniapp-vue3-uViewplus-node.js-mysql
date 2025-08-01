"use strict";
const common_vendor = require("../../common/vendor.js");
const store_userStore = require("../../store/userStore.js");
if (!Array) {
  const _easycom_up_cell2 = common_vendor.resolveComponent("up-cell");
  const _easycom_up_cell_group2 = common_vendor.resolveComponent("up-cell-group");
  (_easycom_up_cell2 + _easycom_up_cell_group2)();
}
const _easycom_up_cell = () => "../../node-modules/uview-plus/components/u-cell/u-cell.js";
const _easycom_up_cell_group = () => "../../node-modules/uview-plus/components/u-cell-group/u-cell-group.js";
if (!Math) {
  (_easycom_up_cell + _easycom_up_cell_group)();
}
const _sfc_main = {
  __name: "userinfo",
  setup(__props) {
    const userStore = store_userStore.userUserStore();
    const userinfo = userStore.userInfo || {};
    return (_ctx, _cache) => {
      return {
        a: common_vendor.unref(userinfo).avatar,
        b: common_vendor.p({
          title: "头像",
          isLink: true,
          ["arrow-direction"]: "right"
        }),
        c: common_vendor.p({
          title: "用户名",
          isLink: true,
          ["arrow-direction"]: "right",
          value: common_vendor.unref(userinfo).username
        }),
        d: common_vendor.p({
          title: "昵称",
          isLink: true,
          ["arrow-direction"]: "right",
          value: common_vendor.unref(userinfo).nickname
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/mine/userinfo.js.map
