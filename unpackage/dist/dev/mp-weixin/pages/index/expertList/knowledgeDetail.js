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
      common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:105", option);
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
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:116", res.data);
          knowledgeDetail.value = (_a = res.data) == null ? void 0 : _a.data;
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:120", err);
        }
      });
    };
    const knowComment = common_vendor.ref();
    const getknowComment = (id) => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/getKnowComment/${id}`,
        success(res) {
          var _a;
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:130", res.data);
          knowComment.value = (_a = res.data) == null ? void 0 : _a.data;
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:134", err);
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
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:153", res.data);
          getknowComment(form.value.k_id);
          form.value.content = " ";
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:158", err);
        }
      });
    };
    const delContainShow = common_vendor.ref(false);
    const delKnowledge = (id) => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/delKnowledge/${id}`,
        method: "DELETE",
        success(res) {
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:169", res.data);
          common_vendor.index.showToast({
            title: "删除成功"
          });
          delContainShow.value = false;
          common_vendor.index.navigateTo({
            url: "/pages/mine/expert/expertKnowlege"
          });
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/knowledgeDetail.vue:179", err);
        }
      });
    };
    const toupdate = () => {
      knowledge.setEdit(knowledgeDetail.value);
      common_vendor.index.navigateTo({
        url: `/pages/mine/expert/addKnowledge?mode=edit`
      });
    };
    const toexpertDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/index/expertList/expertDetail?id=${id}`
      });
    };
    common_vendor.computed(() => {
      return knowledgeDetail.value && knowledgeDetail.value[0] && knowledgeDetail.value[0].picture ? knowledgeDetail.value[0].picture.split(",").filter(Boolean) : [];
    });
    return (_ctx, _cache) => {
      var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
      return common_vendor.e({
        a: common_vendor.p({
          showBack: true
        }),
        b: knowledgeDetail.value[0].avatar,
        c: common_vendor.o(($event) => toexpertDetail(knowledgeDetail.value[0].expert_id)),
        d: common_vendor.t(knowledgeDetail.value[0].expertName),
        e: common_vendor.t(common_vendor.unref(utils_time.getLastTimeStr)(knowledgeDetail.value[0].created_at, true)),
        f: knowledgeDetail.value[0].type === "长文章"
      }, knowledgeDetail.value[0].type === "长文章" ? {
        g: common_vendor.t(knowledgeDetail.value[0].type)
      } : {}, {
        h: knowledgeDetail.value[0].type === "小知识"
      }, knowledgeDetail.value[0].type === "小知识" ? {
        i: common_vendor.t(knowledgeDetail.value[0].type)
      } : {}, {
        j: common_vendor.t(knowledgeDetail.value[0].title),
        k: common_vendor.t(knowledgeDetail.value[0].content),
        l: knowledgeDetail.value[0].picture
      }, knowledgeDetail.value[0].picture ? {
        m: knowledgeDetail.value[0].picture
      } : {}, {
        n: ((_a = common_vendor.unref(userStore)) == null ? void 0 : _a.role) == 1 && ((_c = (_b = common_vendor.unref(userStore)) == null ? void 0 : _b.userInfo) == null ? void 0 : _c.expert_id) == ((_d = knowledgeDetail.value[0]) == null ? void 0 : _d.expert_id)
      }, ((_e = common_vendor.unref(userStore)) == null ? void 0 : _e.role) == 1 && ((_g = (_f = common_vendor.unref(userStore)) == null ? void 0 : _f.userInfo) == null ? void 0 : _g.expert_id) == ((_h = knowledgeDetail.value[0]) == null ? void 0 : _h.expert_id) ? {
        o: common_assets._imports_0$5,
        p: common_vendor.o(($event) => delContainShow.value = true),
        q: common_assets._imports_1$3,
        r: common_vendor.o(toupdate)
      } : {}, {
        s: common_vendor.f(knowComment.value, (item, k0, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.nickname),
            c: common_vendor.t(item.content),
            d: common_vendor.t(common_vendor.unref(utils_time.getLastTimeStr)(item.created_time, true))
          };
        }),
        t: common_vendor.t(_ctx.title),
        v: common_vendor.p({
          show: knowComment.value.length > 0 && knowComment.value.length <= 2,
          title: "没有更多评论啦"
        }),
        w: common_vendor.t(_ctx.title),
        x: common_vendor.p({
          show: knowComment.value.length <= 0,
          title: "暂无评论"
        }),
        y: ((_i = common_vendor.unref(userStore)) == null ? void 0 : _i.role) == 0
      }, ((_j = common_vendor.unref(userStore)) == null ? void 0 : _j.role) == 0 ? {
        z: knowComment.value[0].avatar,
        A: form.value.content,
        B: common_vendor.o(($event) => form.value.content = $event.detail.value),
        C: common_vendor.o(addComment)
      } : {}, {
        D: common_vendor.o(($event) => delKnowledge(knowledgeDetail.value[0].id)),
        E: common_vendor.o(($event) => delContainShow.value = _ctx.fasle),
        F: common_vendor.p({
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
