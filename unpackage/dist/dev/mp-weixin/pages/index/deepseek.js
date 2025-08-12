"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  __name: "deepseek",
  setup(__props) {
    const input = common_vendor.ref("");
    const messages = common_vendor.ref("");
    async function sendMessage() {
      const postData = {
        messages: [
          { role: "system", content: "你是AI助手" },
          { role: "user", content: input.value }
        ]
      };
      common_vendor.index.request({
        url: "http://127.0.0.1:3006/deepseek/chat",
        method: "POST",
        // header: { 'Content-Type': 'application/json' }, // 注意是 header
        data: postData,
        // 注意是 data
        success(res) {
          common_vendor.index.__f__("log", "at pages/index/deepseek.vue:38", res.data);
          messages.value = res.data;
          input.value = "";
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/deepseek.vue:55", err);
        }
      });
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_assets._imports_0$7,
        b: input.value,
        c: common_vendor.o(($event) => input.value = $event.detail.value),
        d: common_vendor.o(sendMessage),
        e: messages.value
      }, messages.value ? {
        f: common_vendor.f(messages.value, (msg, idx, i0) => {
          return {
            a: common_vendor.t(msg),
            b: idx
          };
        })
      } : {}, {
        g: common_vendor.gei(_ctx, "")
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d19e8104"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/deepseek.js.map
