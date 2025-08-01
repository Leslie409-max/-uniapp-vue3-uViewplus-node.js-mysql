"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  (_easycom_u_search2 + _easycom_up_icon2)();
}
const _easycom_u_search = () => "../../node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_search + _easycom_up_icon)();
}
const _sfc_main = {
  __name: "post",
  setup(__props) {
    const state = common_vendor.ref();
    const navBarHeight = common_vendor.ref();
    const setNavSize = () => {
      const res = common_vendor.index.getSystemInfoSync();
      common_vendor.index.__f__("log", "at pages/post/post.vue:61", res);
      state.value = res.statusBarHeight;
      const res2 = common_vendor.index.getMenuButtonBoundingClientRect();
      common_vendor.index.__f__("log", "at pages/post/post.vue:66", res2);
      navBarHeight.value = res2.height + (res2.top - res.statusBarHeight) * 2;
      common_vendor.index.__f__("log", "at pages/post/post.vue:70", navBarHeight.value, "nav");
    };
    common_vendor.onBeforeMount(() => {
      setNavSize();
    });
    const topostDeatil = () => {
      common_vendor.index.navigateTo({
        url: "/pages/post/postDetail"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: state.value + "px",
        b: common_vendor.p({
          placeholder: "日照香炉生紫烟",
          margin: "0 20rpx"
        }),
        c: navBarHeight.value + "px",
        d: common_assets._imports_0$1,
        e: common_vendor.p({
          name: "arrow-right",
          color: "#333",
          size: "20"
        }),
        f: common_vendor.o(topostDeatil)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0832fc77"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/post/post.js.map
