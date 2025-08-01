"use strict";
const common_vendor = require("../common/vendor.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  _easycom_up_icon2();
}
const _easycom_up_icon = () => "../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  _easycom_up_icon();
}
const _sfc_main = {
  __name: "title",
  props: {
    title: {
      type: String,
      default: "标题"
    }
  },
  emits: ["more"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(__props.title),
        b: common_vendor.o(($event) => emit("more")),
        c: common_vendor.p({
          name: "arrow-right",
          color: "#333",
          size: "20"
        }),
        d: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-00a4c61d"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/component/title.js.map
