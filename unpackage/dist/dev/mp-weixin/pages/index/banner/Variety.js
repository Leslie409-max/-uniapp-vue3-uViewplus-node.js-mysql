"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
if (!Math) {
  NavBar();
}
const NavBar = () => "../../../component/navBar2.js";
const _sfc_main = {
  __name: "Variety",
  setup(__props) {
    const getVariety = () => {
      common_vendor.index.request({
        url: "http://127.0.0.1:3005/cate/get_cate",
        // 示例接口地址
        method: "GET",
        header: {
          Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ind6eWxxeSIsInBhc3N3b3JkIjoiIiwibmlja25hbWUiOm51bGwsImVtYWlsIjpudWxsLCJ1c2VyX3BpYyI6IiIsImlkIjoxMSwiaWF0IjoxNzUyNjQ0MjM0LCJleHAiOjE3NTI2NjIyMzR9.ELsCtQFcGl8PICdrwkTD-1qGGl2g52_tgOJTwA9Y9z0"
        },
        success: function(res) {
          common_vendor.index.__f__("log", "at pages/index/banner/Variety.vue:40", res.data);
        }
      });
    };
    common_vendor.onMounted(() => {
      getVariety();
    });
    const toVarietyDeatil = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/VarietyDetail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true
        }),
        b: common_assets._imports_0$3,
        c: common_vendor.o(($event) => toVarietyDeatil()),
        d: common_assets._imports_0$3,
        e: common_assets._imports_0$3,
        f: common_assets._imports_0$3,
        g: common_assets._imports_0$3
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0e37ef51"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/banner/Variety.js.map
