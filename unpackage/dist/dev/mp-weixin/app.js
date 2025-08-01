"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/login/login.js";
  "./pages/index/index.js";
  "./pages/post/post.js";
  "./pages/message/message.js";
  "./pages/mine/mine.js";
  "./pages/index/banner/Variety.js";
  "./pages/index/banner/diseases.js";
  "./pages/index/banner/VarietyDetail.js";
  "./component/navBar.js";
  "./pages/post/postDetail.js";
  "./pages/index/expertList/expertDetail.js";
  "./pages/index/expertList/addQuestion.js";
  "./pages/index/expertList/knowledgeDetail.js";
  "./pages/login/reg.js";
  "./pages/mine/expert/expertContain.js";
  "./pages/mine/expert/expertGetQuestion.js";
  "./pages/mine/expert/expertKnowlege.js";
  "./pages/mine/expert/addKnowledge.js";
  "./pages/mine/userinfo.js";
  "./pages/index/deepseek.js";
  "./component/emtpyState.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:4", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:7", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:10", "App Hide");
  }
};
function createApp() {
  const app = common_vendor.createSSRApp(_sfc_main);
  app.use(common_vendor.uviewPlus);
  const pinia = common_vendor.createPinia();
  pinia.use(common_vendor.index_default);
  app.use(pinia);
  app.config.globalProperties.day = common_vendor.dayjs;
  return {
    app
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
