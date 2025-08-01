"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_up_empty2 = common_vendor.resolveComponent("up-empty");
  _easycom_up_empty2();
}
const _easycom_up_empty = () => "../../node-modules/uview-plus/components/u-empty/u-empty.js";
if (!Math) {
  (NavBar + _easycom_up_empty)();
}
const NavBar = () => "../../component/navBar2.js";
const _sfc_main = {
  __name: "postDetail",
  setup(__props) {
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true
        }),
        b: common_vendor.p({
          mode: "list"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bb442c7b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/post/postDetail.js.map
