"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_userStore = require("../../../store/userStore.js");
const store_knowledge = require("../../../store/knowledge.js");
if (!Math) {
  NavBar();
}
const NavBar = () => "../../../component/navBar2.js";
const _sfc_main = {
  __name: "addKnowledge",
  setup(__props) {
    const isEditmode = common_vendor.ref(false);
    const userStore = store_userStore.userUserStore();
    const userinfo = userStore.userInfo;
    const knowledgeStore = store_knowledge.useknowledgeStore();
    const form = common_vendor.ref({
      title: "",
      content: "",
      expert_id: userinfo.expert_id,
      type: "",
      created_at: ""
    });
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:39", options.mode);
      if (options.mode == "edit") {
        isEditmode.value = true;
        form.value = knowledgeStore.editData[0];
        common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:43", form.value);
      }
    });
    const addKnowledge = () => {
      form.value.created_at = common_vendor.dayjs().format("YYYY-MM-DD HH:mm:ss");
      common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:49", "提交内容", form.value);
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/addKonwledge`,
        method: "POST",
        data: form.value,
        success(res) {
          if (res.data.status == 0) {
            common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:56", res.data);
            common_vendor.index.showToast({
              title: "发布成功",
              duration: 2e3
            });
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 2e3);
          }
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:68", err);
        }
      });
    };
    const updateKnowledge = () => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/updateKonwledge`,
        method: "POST",
        data: form.value,
        success(res) {
          common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:79", res.data);
          if (res.data.status == 0) {
            common_vendor.index.showToast({
              title: "修改成功",
              duration: 2e3
            });
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 2e3);
          }
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:92", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true
        }),
        b: form.value.title,
        c: common_vendor.o(($event) => form.value.title = $event.detail.value),
        d: form.value.content,
        e: common_vendor.o(($event) => form.value.content = $event.detail.value),
        f: form.value.type,
        g: common_vendor.o(($event) => form.value.type = $event.detail.value),
        h: common_vendor.t(isEditmode.value ? "更新" : "发布"),
        i: common_vendor.o(($event) => isEditmode.value ? updateKnowledge() : addKnowledge())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1a6b73ac"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/expert/addKnowledge.js.map
