"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_userStore = require("../../../store/userStore.js");
const _sfc_main = {
  __name: "expertGetQuestion",
  setup(__props) {
    const formatDate = (dateString) => {
      return common_vendor.dayjs(dateString).format("YYYY-MM-DD");
    };
    const option = common_vendor.ref();
    common_vendor.onLoad((options) => {
      option.value = options.expert_id;
      common_vendor.index.__f__("log", "at pages/mine/expert/expertGetQuestion.vue:47", "options.expert_id", options.expert_id);
      getQuestion(options.expert_id);
    });
    const userStore = store_userStore.userUserStore();
    const userinfo = userStore.userInfo;
    common_vendor.index.__f__("log", "at pages/mine/expert/expertGetQuestion.vue:53", userinfo.expert_id);
    const questionList = common_vendor.ref();
    const getQuestion = (id) => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/question/getQuestion/${id}`,
        success(res) {
          var _a;
          common_vendor.index.__f__("log", "at pages/mine/expert/expertGetQuestion.vue:61", res.data);
          questionList.value = (_a = res.data) == null ? void 0 : _a.data;
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/mine/expert/expertGetQuestion.vue:65", err);
        }
      });
    };
    common_vendor.onMounted(() => {
      if (option.value == void 0) {
        if (userinfo.expert_id) {
          getQuestion(userinfo.expert_id);
        }
      }
    });
    const answer = common_vendor.ref("");
    const addAnswer = (id) => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/question/addAnswer`,
        method: "POST",
        data: {
          answer: answer.value,
          id
        },
        success(res) {
          common_vendor.index.__f__("log", "at pages/mine/expert/expertGetQuestion.vue:88", res.data);
          common_vendor.index.showToast({
            title: "回答成功",
            duration: 2e3
          });
          getQuestion(userinfo.expert_id);
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/mine/expert/expertGetQuestion.vue:97", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.f(questionList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.content),
            b: item.answer
          }, item.answer ? {
            c: common_vendor.t(item.answer)
          } : {}, {
            d: item.answer === null
          }, item.answer === null ? {} : {}, {
            e: common_vendor.o(($event) => addAnswer(item.id)),
            f: common_vendor.t(formatDate(item.created_at)),
            g: common_vendor.t(item.nickname),
            h: item.avatar
          });
        }),
        b: answer.value,
        c: common_vendor.o(($event) => answer.value = $event.detail.value),
        d: common_vendor.o((...args) => _ctx.topostDeatil && _ctx.topostDeatil(...args)),
        e: common_vendor.gei(_ctx, "")
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a3edc11a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/expert/expertGetQuestion.js.map
