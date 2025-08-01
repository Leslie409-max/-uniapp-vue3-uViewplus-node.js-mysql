"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "up-copy",
  props: {
    content: {
      type: String,
      default: ""
    },
    alertStyle: {
      type: String,
      default: "toast"
    },
    notice: {
      type: String,
      default: "复制成功"
    }
  },
  emits: ["success"],
  methods: {
    handleClick() {
      let content = this.content;
      if (!content) {
        common_vendor.index.showToast({
          title: "暂无",
          icon: "none",
          duration: 2e3
        });
        return false;
      }
      content = typeof content === "string" ? content : content.toString();
      let that = this;
      common_vendor.index.setClipboardData({
        data: content,
        success: function() {
          if (that.alertStyle == "modal") {
            common_vendor.index.showModal({
              title: "提示",
              content: that.notice
            });
          } else {
            common_vendor.index.showToast({
              title: that.notice,
              icon: "none"
            });
          }
          that.$emit("success");
        },
        fail: function() {
          common_vendor.index.showToast({
            title: "复制失败",
            icon: "none",
            duration: 3e3
          });
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o((...args) => $options.handleClick && $options.handleClick(...args)),
    b: common_vendor.gei(_ctx, "")
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/node-modules/uview-plus/components/u-copy/u-copy.js.map
