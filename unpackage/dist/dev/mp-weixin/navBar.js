"use strict";
const common_vendor = require("./common/vendor.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  _easycom_up_icon2();
}
const _easycom_up_icon = () => "./node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_up_icon();
}
const _sfc_main = {
  __name: "navBar",
  props: {
    showBack: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const state = common_vendor.ref();
    const navBarHeight = common_vendor.ref();
    const setNavSize = () => {
      const res = common_vendor.index.getSystemInfoSync();
      state.value = res.statusBarHeight;
      const res2 = common_vendor.index.getMenuButtonBoundingClientRect();
      navBarHeight.value = res2.height + (res2.top - res.statusBarHeight) * 2;
    };
    common_vendor.onBeforeMount(() => {
      setNavSize();
    });
    function goBack() {
      common_vendor.index.navigateBack();
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: state.value + "px",
        b: props.showBack
      }, props.showBack ? {
        c: common_vendor.p({
          name: "arrow-left",
          color: "#333",
          size: "20"
        }),
        d: common_vendor.o(goBack)
      } : {}, {
        e: props.name
      }, props.name ? {} : {}, {
        f: navBarHeight.value + "px"
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79ac8b49"]]);
exports.MiniProgramPage = MiniProgramPage;
//# sourceMappingURL=../.sourcemap/mp-weixin/navBar.js.map
