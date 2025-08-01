"use strict";
const common_vendor = require("./common/vendor.js");
const _sfc_main = {
  __name: "emtpyState",
  props: {
    show: { type: Boolean, default: false },
    img: { type: String, default: "/static/空状态.png" },
    title: { type: String, default: "没有更多内容啦" }
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: __props.show
      }, __props.show ? {
        b: __props.img,
        c: common_vendor.t(__props.title)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ec72155d"]]);
exports.MiniProgramPage = MiniProgramPage;
//# sourceMappingURL=../.sourcemap/mp-weixin/emtpyState.js.map
