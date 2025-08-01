"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_userStore = require("../../../store/userStore.js");
if (!Math) {
  NavBar();
}
const NavBar = () => "../../../component/navBar2.js";
const _sfc_main = {
  __name: "addQuestion",
  setup(__props) {
    const userStore = store_userStore.userUserStore();
    const userinfo = userStore.userInfo;
    common_vendor.onLoad((option) => {
      common_vendor.index.__f__("log", "at pages/index/expertList/addQuestion.vue:21", "传过来的专家id", option.expert_id);
      form.value.expert_id = Number(option.expert_id);
      common_vendor.index.__f__("log", "at pages/index/expertList/addQuestion.vue:23", "expert_id", form.value.expert_id);
    });
    const form = common_vendor.ref({
      content: "",
      expert_id: "",
      asker_id: userinfo.id
    });
    const addQuestion = () => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/question/addQuestion`,
        method: "POST",
        data: form.value,
        success(res) {
          common_vendor.index.__f__("log", "at pages/index/expertList/addQuestion.vue:38", res.data);
          common_vendor.index.showToast({
            title: "提问成功",
            duration: 2e3
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 2e3);
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/addQuestion.vue:49", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true
        }),
        b: form.value.content,
        c: common_vendor.o(($event) => form.value.content = $event.detail.value),
        d: common_vendor.o(addQuestion)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-33fb3a62"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/expertList/addQuestion.js.map
