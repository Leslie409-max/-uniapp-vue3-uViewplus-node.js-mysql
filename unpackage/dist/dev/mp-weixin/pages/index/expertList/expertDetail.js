"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const utils_time = require("../../../utils/time.js");
if (!Array) {
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_copy2 = common_vendor.resolveComponent("up-copy");
  const _easycom_up_popup2 = common_vendor.resolveComponent("up-popup");
  (_easycom_up_icon2 + _easycom_up_copy2 + _easycom_up_popup2)();
}
const _easycom_up_icon = () => "../../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_copy = () => "../../../node-modules/uview-plus/components/u-copy/u-copy.js";
const _easycom_up_popup = () => "../../../node-modules/uview-plus/components/u-popup/u-popup.js";
if (!Math) {
  (NavBar + Title + _easycom_up_icon + _easycom_up_copy + _easycom_up_popup)();
}
const NavBar = () => "../../../component/navBar2.js";
const Title = () => "../../../component/title.js";
const _sfc_main = {
  __name: "expertDetail",
  setup(__props) {
    common_vendor.reactive({
      getLastTimeStr(time, friendly) {
        return utils_time.getLastTimeStr(time, friendly);
      }
    });
    const expertId = common_vendor.ref(null);
    common_vendor.onLoad((option) => {
      common_vendor.index.__f__("log", "at pages/index/expertList/expertDetail.vue:103", option);
      if (option.id) {
        expertId.value = option.id;
        getExpertTest(option.id);
        getQuestion(option.id);
        getKnowledge(option.id);
      }
    });
    common_vendor.onShow(() => {
      if (expertId.value) {
        getExpertTest(expertId.value);
        getQuestion(expertId.value);
      }
    });
    const expertDetail = common_vendor.ref(null);
    const getExpertTest = (id) => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/expert/getExpertDetail/${id}`,
        success(res) {
          common_vendor.index.__f__("log", "at pages/index/expertList/expertDetail.vue:127", res.data);
          expertDetail.value = res.data.data;
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/expertDetail.vue:131", err);
        }
      });
    };
    const knowledge = common_vendor.ref();
    const getKnowledge = (id) => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/getKnowledge/${id}`,
        success(res) {
          var _a;
          common_vendor.index.__f__("log", "at pages/index/expertList/expertDetail.vue:141", res.data);
          knowledge.value = (_a = res.data) == null ? void 0 : _a.data;
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/expertDetail.vue:145", err);
        }
      });
    };
    const questionList = common_vendor.ref();
    const getQuestion = (id) => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/question/getQuestion/${id}`,
        success(res) {
          var _a;
          common_vendor.index.__f__("log", "at pages/index/expertList/expertDetail.vue:155", res.data);
          questionList.value = (_a = res.data) == null ? void 0 : _a.data;
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/expertDetail.vue:159", err);
        }
      });
    };
    const showPhone = common_vendor.ref(false);
    const addQuestion = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/index/expertList/addQuestion?expert_id=${id}`
      });
    };
    const toKnowledge = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/index/expertList/knowledgeDetail?know_id=${id}`
      });
    };
    const toknowledgelist = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/mine/expert/expertKnowlege?expert_id=${id}`
      });
    };
    const toquestion = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/mine/expert/expertGetQuestion?expert_id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true
        }),
        b: common_vendor.f(expertDetail.value, (item, k0, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.expertName),
            c: common_vendor.t(item.major),
            d: common_vendor.t(item.degree),
            e: common_vendor.t(item.speciality)
          };
        }),
        c: common_vendor.o(($event) => toknowledgelist(expertDetail.value[0].id)),
        d: common_vendor.p({
          title: "知识发布"
        }),
        e: common_vendor.f(knowledge.value.slice(0, 2), (item, k0, i0) => {
          return common_vendor.e({
            a: item.type === "长文章"
          }, item.type === "长文章" ? {
            b: common_vendor.t(item.type)
          } : {}, {
            c: item.type === "小知识"
          }, item.type === "小知识" ? {
            d: common_vendor.t(item.type)
          } : {}, {
            e: common_vendor.t(item.title),
            f: common_vendor.t(item.content),
            g: common_vendor.o(($event) => toKnowledge(item.id))
          });
        }),
        f: common_vendor.o(($event) => toquestion(expertDetail.value[0].id)),
        g: common_vendor.p({
          title: "所获提问"
        }),
        h: common_vendor.f(questionList.value, (item, k0, i0) => {
          return common_vendor.e({
            a: common_vendor.t(item.content),
            b: item.answer
          }, item.answer ? {
            c: common_vendor.t(item.answer)
          } : {}, {
            d: item.answer === null
          }, item.answer === null ? {
            e: "32d40b30-3-" + i0,
            f: common_vendor.p({
              name: "info-circle"
            })
          } : {}, {
            g: common_vendor.t(common_vendor.unref(utils_time.getLastTimeStr)(item.created_at, true))
          });
        }),
        i: common_vendor.o((...args) => _ctx.topostDeatil && _ctx.topostDeatil(...args)),
        j: common_assets._imports_0$4,
        k: common_vendor.o(($event) => showPhone.value = true),
        l: common_assets._imports_1$2,
        m: common_vendor.o(($event) => addQuestion(expertDetail.value[0].id)),
        n: common_vendor.t(expertDetail.value[0].phone),
        o: common_vendor.p({
          content: "{{expertDetail[0].phone}}"
        }),
        p: common_vendor.o(($event) => showPhone.value = _ctx.fasle),
        q: common_vendor.p({
          name: "close-circle"
        }),
        r: common_vendor.p({
          show: showPhone.value
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-32d40b30"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/expertList/expertDetail.js.map
