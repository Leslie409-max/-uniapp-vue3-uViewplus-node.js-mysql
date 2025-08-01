"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_userStore = require("../../../store/userStore.js");
const utils_time = require("../../../utils/time.js");
if (!Array) {
  const _easycom_up_tabs2 = common_vendor.resolveComponent("up-tabs");
  _easycom_up_tabs2();
}
const _easycom_up_tabs = () => "../../../node-modules/uview-plus/components/u-tabs/u-tabs.js";
if (!Math) {
  (NavBar + _easycom_up_tabs + EmtpyState)();
}
const NavBar = () => "../../../component/navBar2.js";
const EmtpyState = () => "../../../component/emtpyState2.js";
const _sfc_main = {
  __name: "expertKnowlege",
  setup(__props) {
    const userStore = store_userStore.userUserStore();
    const userinfo = userStore.userInfo;
    common_vendor.index.__f__("log", "at pages/mine/expert/expertKnowlege.vue:79", userinfo.expert_id);
    const list = common_vendor.ref([
      { name: "全部" },
      { name: "小知识" },
      { name: "长文章" }
    ]);
    const current = common_vendor.ref();
    const click = (item, index) => {
      common_vendor.index.__f__("log", "at pages/mine/expert/expertKnowlege.vue:88", item, index);
      current.value = index;
    };
    const option = common_vendor.ref();
    common_vendor.onLoad((options) => {
      option.value = options.expert_id;
      common_vendor.index.__f__("log", "at pages/mine/expert/expertKnowlege.vue:95", "options.expert_id", option.value);
      getKnowledge(option.value);
    });
    common_vendor.reactive({
      getLastTimeStr(time, friendly) {
        return utils_time.getLastTimeStr(time, friendly);
      }
    });
    const knowledge = common_vendor.ref([]);
    const small = common_vendor.ref([]);
    const long = common_vendor.ref([]);
    const getKnowledge = (id) => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/getKnowledge/${id}`,
        success(res) {
          var _a;
          common_vendor.index.__f__("log", "at pages/mine/expert/expertKnowlege.vue:113", res.data);
          knowledge.value = (_a = res.data) == null ? void 0 : _a.data;
          small.value = knowledge.value.filter((item) => item.type === "小知识");
          long.value = knowledge.value.filter((item) => item.type === "长文章");
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/mine/expert/expertKnowlege.vue:119", err);
        }
      });
    };
    common_vendor.onMounted(() => {
      current.value = 0;
      if (option.value == void 0) {
        if (userinfo.expert_id) {
          getKnowledge(userinfo.expert_id);
        }
      }
    });
    const toKnowledge = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/index/expertList/knowledgeDetail?know_id=${id}`
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.p({
          showBack: true,
          addKnowledge: true,
          title: "知识列表"
        }),
        b: common_vendor.o(click),
        c: common_vendor.p({
          list: list.value,
          lineWidth: "80",
          itemStyle: "padding-left: 15px; padding-right: 15px; width:80px; height: 34px; padding-bottom:10px;",
          activeStyle: {
            color: "#303133",
            fontWeight: "bold",
            transform: "scale(1.05)"
          }
        }),
        d: current.value == 0
      }, current.value == 0 ? {
        e: common_vendor.f(knowledge.value, (item, k0, i0) => {
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
        f: common_vendor.t(_ctx.title),
        g: common_vendor.p({
          show: knowledge.value.length <= 4,
          title: "没有更多内容啦"
        })
      } : {}, {
        h: current.value == 1
      }, current.value == 1 ? {
        i: common_vendor.f(small.value, (item, k0, i0) => {
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
        j: common_vendor.t(_ctx.title),
        k: common_vendor.p({
          show: knowledge.value.length <= 4,
          title: "没有更多内容啦"
        })
      } : {}, {
        l: current.value == 2
      }, current.value == 2 ? {
        m: common_vendor.f(long.value, (item, k0, i0) => {
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
        n: common_vendor.t(_ctx.title),
        o: common_vendor.p({
          show: knowledge.value.length <= 4,
          title: "没有更多内容啦"
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-859aa917"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/expert/expertKnowlege.js.map
