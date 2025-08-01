"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "deepseek",
  setup(__props) {
    const input = common_vendor.ref("");
    const messages = common_vendor.ref([]);
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
          common_vendor.index.__f__("log", "at pages/index/deepseek.vue:32", res.data);
          messages.value = res.data;
          input.value = "";
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/deepseek.vue:49", err);
        }
      });
    }
    return (_ctx, _cache) => {
      return {
        a: input.value,
        b: common_vendor.o(($event) => input.value = $event.detail.value),
        c: common_vendor.o(sendMessage),
        d: common_vendor.f(messages.value, (msg, idx, i0) => {
          return {
            a: common_vendor.t(msg),
            b: idx
          };
        }),
        e: common_vendor.gei(_ctx, "")
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/deepseek.js.map
