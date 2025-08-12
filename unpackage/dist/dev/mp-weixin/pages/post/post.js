"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_time = require("../../utils/time.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_up_tabs2 = common_vendor.resolveComponent("up-tabs");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  (_easycom_u_search2 + _easycom_up_tabs2 + _easycom_up_icon2)();
}
const _easycom_u_search = () => "../../node-modules/uview-plus/components/u-search/u-search.js";
const _easycom_up_tabs = () => "../../node-modules/uview-plus/components/u-tabs/u-tabs.js";
const _easycom_up_icon = () => "../../node-modules/uview-plus/components/u-icon/u-icon.js";
if (!Math) {
  (_easycom_u_search + _easycom_up_tabs + EmtpyState + _easycom_up_icon)();
}
const EmtpyState = () => "../../component/emtpyState2.js";
const _sfc_main = {
  __name: "post",
  setup(__props) {
    common_vendor.reactive({
      getLastTimeStr(time, friendly) {
        return utils_time.getLastTimeStr(time, friendly);
      }
    });
    const state = common_vendor.ref();
    const navBarHeight = common_vendor.ref();
    const setNavSize = () => {
      const res = common_vendor.index.getSystemInfoSync();
      common_vendor.index.__f__("log", "at pages/post/post.vue:191", res);
      state.value = res.statusBarHeight;
      const res2 = common_vendor.index.getMenuButtonBoundingClientRect();
      common_vendor.index.__f__("log", "at pages/post/post.vue:196", res2);
      navBarHeight.value = res2.height + (res2.top - res.statusBarHeight) * 2;
      common_vendor.index.__f__("log", "at pages/post/post.vue:200", navBarHeight.value, "nav");
    };
    common_vendor.onBeforeMount(() => {
      setNavSize();
    });
    const list = common_vendor.ref([
      { name: "推荐" },
      { name: "关注" },
      { name: "小知识" },
      { name: "长文章" },
      { name: "专家发布" },
      { name: "用户发布" }
    ]);
    const current = common_vendor.ref();
    const click = (item, index) => {
      common_vendor.index.__f__("log", "at pages/post/post.vue:216", item, index);
      current.value = index;
    };
    const knowledge = common_vendor.ref([]);
    const small = common_vendor.ref([]);
    const long = common_vendor.ref([]);
    const getKnowledge = () => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/getAllKnowledge`,
        success(res) {
          var _a;
          common_vendor.index.__f__("log", "at pages/post/post.vue:227", res.data);
          knowledge.value = (_a = res.data) == null ? void 0 : _a.data;
          small.value = knowledge.value.filter((item) => item.type === "小知识");
          long.value = knowledge.value.filter((item) => item.type === "长文章");
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/post/post.vue:233", err);
        }
      });
    };
    const userPost = common_vendor.ref();
    const getAllPost = () => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/post/getAllPost`,
        success(res) {
          var _a;
          common_vendor.index.__f__("log", "at pages/post/post.vue:243", res.data);
          userPost.value = (_a = res.data) == null ? void 0 : _a.data;
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/post/post.vue:247", err);
        }
      });
    };
    common_vendor.onMounted(() => {
      current.value = 0;
      getKnowledge();
      getAllPost();
    });
    const toknowledge = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/index/expertList/knowledgeDetail?know_id=${id}`
      });
    };
    const toaddpost = () => {
      common_vendor.index.navigateTo({
        url: "/pages/mine/expert/addKnowledge"
      });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: state.value + "px",
        b: common_vendor.p({
          placeholder: "搜索...",
          margin: "0 20rpx"
        }),
        c: navBarHeight.value + "px",
        d: common_vendor.o(click),
        e: common_vendor.p({
          list: list.value,
          lineWidth: "80",
          itemStyle: "padding-left: 15px; padding-right: 15px; width:80px; height: 34px; padding-bottom:10px;",
          activeStyle: {
            color: "#303133",
            fontWeight: "bold",
            transform: "scale(1.05)"
          }
        }),
        f: current.value == 0
      }, current.value == 0 ? {
        g: common_vendor.f(knowledge.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.avatar,
            b: common_vendor.t(item.expertName),
            c: common_vendor.t(common_vendor.unref(utils_time.getLastTimeStr)(item.created_at, true)),
            d: item.type === "长文章"
          }, item.type === "长文章" ? {
            e: common_vendor.t(item.type)
          } : {}, {
            f: item.type === "小知识"
          }, item.type === "小知识" ? {
            g: common_vendor.t(item.type)
          } : {}, {
            h: common_vendor.t(item.title),
            i: common_vendor.t(item.content),
            j: item.picture
          }, item.picture ? {
            k: item.picture
          } : {}, {
            l: common_vendor.o(($event) => toknowledge(item.id))
          });
        }),
        h: common_vendor.t(_ctx.title),
        i: common_vendor.p({
          show: knowledge.value.length <= 4,
          title: "没有更多内容啦"
        })
      } : {}, {
        j: current.value == 1
      }, current.value == 1 ? {} : {}, {
        k: current.value == 2
      }, current.value == 2 ? {
        l: common_vendor.f(small.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.avatar,
            b: common_vendor.t(item.expertName),
            c: common_vendor.t(common_vendor.unref(utils_time.getLastTimeStr)(item.created_at, true)),
            d: item.type === "长文章"
          }, item.type === "长文章" ? {
            e: common_vendor.t(item.type)
          } : {}, {
            f: item.type === "小知识"
          }, item.type === "小知识" ? {
            g: common_vendor.t(item.type)
          } : {}, {
            h: common_vendor.t(item.title),
            i: common_vendor.t(item.content),
            j: item.picture
          }, item.picture ? {
            k: item.picture
          } : {}, {
            l: common_vendor.o(($event) => _ctx.toKnowledge(item.id))
          });
        }),
        m: common_vendor.t(_ctx.title),
        n: common_vendor.p({
          show: small.value.length <= 4,
          title: "没有更多内容啦"
        })
      } : {}, {
        o: current.value == 3
      }, current.value == 3 ? {
        p: common_vendor.f(long.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.avatar,
            b: common_vendor.t(item.expertName),
            c: common_vendor.t(common_vendor.unref(utils_time.getLastTimeStr)(item.created_at, true)),
            d: item.type === "长文章"
          }, item.type === "长文章" ? {
            e: common_vendor.t(item.type)
          } : {}, {
            f: item.type === "小知识"
          }, item.type === "小知识" ? {
            g: common_vendor.t(item.type)
          } : {}, {
            h: common_vendor.t(item.title),
            i: common_vendor.t(item.content),
            j: item.picture
          }, item.picture ? {
            k: item.picture
          } : {}, {
            l: common_vendor.o(($event) => _ctx.toKnowledge(item.id))
          });
        }),
        q: common_vendor.t(_ctx.title),
        r: common_vendor.p({
          show: long.value.length <= 4,
          title: "没有更多内容啦"
        })
      } : {}, {
        s: current.value == 4
      }, current.value == 4 ? {
        t: common_vendor.f(knowledge.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.avatar,
            b: common_vendor.t(item.expertName),
            c: common_vendor.t(common_vendor.unref(utils_time.getLastTimeStr)(item.created_at, true)),
            d: item.type === "长文章"
          }, item.type === "长文章" ? {
            e: common_vendor.t(item.type)
          } : {}, {
            f: item.type === "小知识"
          }, item.type === "小知识" ? {
            g: common_vendor.t(item.type)
          } : {}, {
            h: common_vendor.t(item.title),
            i: common_vendor.t(item.content),
            j: item.picture
          }, item.picture ? {
            k: item.picture
          } : {}, {
            l: common_vendor.o(($event) => _ctx.toKnowledge(item.id))
          });
        }),
        v: common_vendor.t(_ctx.title),
        w: common_vendor.p({
          show: knowledge.value.length <= 4,
          title: "没有更多内容啦"
        })
      } : {}, {
        x: current.value == 5
      }, current.value == 5 ? {
        y: common_vendor.f(userPost.value, (item, k0, i0) => {
          return common_vendor.e({
            a: item.avatar,
            b: common_vendor.t(item.nickname || item.username),
            c: common_vendor.t(common_vendor.unref(utils_time.getLastTimeStr)(item.created_at, true)),
            d: item.type === "问题"
          }, item.type === "问题" ? {
            e: common_vendor.t(item.type)
          } : {}, {
            f: item.type === "小知识"
          }, item.type === "小知识" ? {
            g: common_vendor.t(item.type)
          } : {}, {
            h: common_vendor.t(item.title),
            i: common_vendor.t(item.content),
            j: item.picture
          }, item.picture ? {
            k: item.picture
          } : {}, {
            l: common_vendor.o(($event) => _ctx.toKnowledge(item.id))
          });
        }),
        z: common_vendor.t(_ctx.title),
        A: common_vendor.p({
          show: userPost.value.length <= 4,
          title: "没有更多内容啦"
        })
      } : {}, {
        B: common_vendor.p({
          name: "plus",
          color: "white",
          size: "25"
        }),
        C: common_vendor.o(toaddpost)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-0832fc77"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/post/post.js.map
