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
    addKnowledge: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "庄河蓝莓技术平台服务"
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
    const toaddledge = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/expert/addKnowledge"
      });
    };
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
        e: props.addKnowledge
      }, props.addKnowledge ? {
        f: common_vendor.o(toaddledge)
      } : {}, {
        g: props.title
      }, props.title ? {
        h: common_vendor.t(__props.title)
      } : {}, {
        i: navBarHeight.value + "px"
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-79ac8b49"]]);
exports.MiniProgramPage = MiniProgramPage;
//# sourceMappingURL=../.sourcemap/mp-weixin/navBar.js.map
