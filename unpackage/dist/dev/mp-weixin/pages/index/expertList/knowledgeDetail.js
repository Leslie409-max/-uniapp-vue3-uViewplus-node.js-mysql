"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const store_userStore = require("../../../store/userStore.js");
const store_knowledge = require("../../../store/knowledge.js");
const utils_time = require("../../../utils/time.js");
if (!Array) {
  const _easycom_up_modal2 = common_vendor.resolveComponent("up-modal");
  _easycom_up_modal2();
}
const _easycom_up_modal = () => "../../../node-modules/uview-plus/components/u-modal/u-modal.js";
if (!Math) {
  (NavBar + EmtpyState + _easycom_up_modal)();
}
const NavBar = () => "../../../component/navBar2.js";
const EmtpyState = () => "../../../component/emtpyState2.js";
const _sfc_main = {
  __name: "knowledgeDetail",
  setup(__props) {
    const userStore = store_userStore.userUserStore();
    const knowledge = store_knowledge.useknowledgeStore();
    common_vendor.reactive({
      getLastTimeStr(time, friendly) {
        return utils_time.getLastTimeStr(time, friendly);
      }
    });
    common_vendor.onLoad((option) => {
      common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:101", option);
      form.value.k_id = option.know_id;
      getKnowledgeDetail(option.know_id);
      getknowComment(option.know_id);
    });
    const knowledgeDetail = common_vendor.ref();
    const getKnowledgeDetail = (id) => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/getKnowledgeDetail/${id}`,
        success(res) {
          var _a;
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:112", res.data);
          knowledgeDetail.value = (_a = res.data) == null ? void 0 : _a.data;
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:116", err);
        }
      });
    };
    const knowComment = common_vendor.ref();
    const getknowComment = (id) => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/getKnowComment/${id}`,
        success(res) {
          var _a;
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:126", res.data);
          knowComment.value = (_a = res.data) == null ? void 0 : _a.data;
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:130", err);
        }
      });
    };
    const form = common_vendor.ref({
      content: " ",
      k_id: " ",
      user_id: 1,
      created_time: ""
    });
    const addComment = () => {
      form.value.created_time = common_vendor.dayjs().format("YYYY-MM-DD HH:mm:ss");
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/addKnowComment`,
        method: "POST",
        data: form.value,
        success(res) {
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:149", res.data);
          getknowComment(form.value.k_id);
          form.value.content = " ";
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:154", err);
        }
      });
    };
    const delContainShow = common_vendor.ref(false);
    const delKnowledge = (id) => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/delKnowledge/${id}`,
        method: "DELETE",
        success(res) {
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:165", res.data);
          common_vendor.index.showToast({
            title: "删除成功"
          });
          delContainShow.value = false;
          common_vendor.index.navigateTo({
            url: "/pages/mine/expert/expertKnowlege"
          });
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:175", err);
        }
      });
    };
    const toupdate = () => {
      knowledge.setEdit(knowledgeDetail.value);
      common_vendor.index.navigateTo({
        url: `/pages/mine/expert/addKnowledge?mode=edit`
      });
    };
    return (_ctx, _cache) => {
      var _a, _b, _c, _d;
      return common_vendor.e({
        a: common_vendor.p({
          showBack: true
        }),
        b: knowledgeDetail.value[0].avatar,
        c: common_vendor.t(knowledgeDetail.value[0].expertName),
        d: common_vendor.t(common_vendor.unref(utils_time.getLastTimeStr)(knowledgeDetail.value[0].created_at, true)),
        e: knowledgeDetail.value[0].type === "长文章"
      }, knowledgeDetail.value[0].type === "长文章" ? {
        f: common_vendor.t(knowledgeDetail.value[0].type)
      } : {}, {
        g: knowledgeDetail.value[0].type === "小知识"
      }, knowledgeDetail.value[0].type === "小知识" ? {
        h: common_vendor.t(knowledgeDetail.value[0].type)
      } : {}, {
        i: common_vendor.t(knowledgeDetail.value[0].title),
        j: common_vendor.t(knowledgeDetail.value[0].content),
        k: ((_a = common_vendor.unref(userStore)) == null ? void 0 : _a.role) == 1
      }, ((_b = common_vendor.unref(userStore)) == null ? void 0 : _b.role) == 1 ? {
        l: common_assets._imports_0$5,
        m: common_vendor.o(($event) => delContainShow.value = true),
        n: common_assets._imports_1$3,
        o: common_vendor.o(toupdate)
      } : {}, {
        p: common_vendor.f(knowComment.value, (item, k0, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.nickname),
            c: common_vendor.t(item.content),
            d: common_vendor.t(common_vendor.unref(utils_time.getLastTimeStr)(item.created_time, true))
          };
        }),
        q: common_vendor.t(_ctx.title),
        r: common_vendor.p({
          show: knowComment.value.length <= 2,
          title: "没有更多评论啦"
        }),
        s: common_vendor.t(_ctx.title),
        t: common_vendor.p({
          show: knowComment.value.length <= 0,
          title: "暂无评论"
        }),
        v: ((_c = common_vendor.unref(userStore)) == null ? void 0 : _c.role) == 0
      }, ((_d = common_vendor.unref(userStore)) == null ? void 0 : _d.role) == 0 ? {
        w: knowComment.value[0].avatar,
        x: form.value.content,
        y: common_vendor.o(($event) => form.value.content = $event.detail.value),
        z: common_vendor.o(addComment)
      } : {}, {
        A: common_vendor.o(($event) => delKnowledge(knowledgeDetail.value[0].id)),
        B: common_vendor.o(($event) => delContainShow.value = _ctx.fasle),
        C: common_vendor.p({
          show: delContainShow.value,
          title: "确认删除吗",
          content: "如果你删除了该文章，文章以下的所有评论也将被删除",
          showConfirmButton: "true",
          showCancelButton: "true"
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d05df888"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/expertList/knowledgeDetail.js.map
