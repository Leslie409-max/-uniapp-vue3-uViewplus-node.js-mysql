"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Math) {
  (NavBar + Title)();
}
const NavBar = () => "../../component/navBar2.js";
const Title = () => "../../component/title.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const toVariety = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/banner/Variety"
      });
    };
    const toexpertDetail = (item) => {
      common_vendor.index.navigateTo({
        url: `/pages/index/expertList/expertDetail?id=${item.id}`
      });
    };
    const todeepseek = () => {
      common_vendor.index.navigateTo({
        url: "/pages/index/deepseek"
      });
    };
    const expertlist = common_vendor.ref();
    const getExpertTest = () => {
      common_vendor.index.request({
        url: "http://127.0.0.1:3006/expert/getExpert",
        success(res) {
          common_vendor.index.__f__("log", "at pages/index/index.vue:95", res);
          expertlist.value = res.data.data;
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/index.vue:99", err);
        }
      });
    };
    const longitude = common_vendor.ref();
    const latitude = common_vendor.ref();
    const markers = common_vendor.ref([
      {
        id: 1,
        // 标记点id
        latitude,
        // 纬度
        longitude,
        // 经度
        title: "我的位置",
        // 标记点标题
        iconPath: "../../static/位置.png",
        // 标记点图标
        width: 30,
        // 图标宽度
        height: 30,
        // 图标高度
        callout: {
          // 气泡
          content: "我的位置",
          // 气泡内容
          color: "#000000",
          // 文字颜色
          fontSize: 14,
          // 文字大小
          borderRadius: 8,
          // 气泡圆角
          bgColor: "#ffffff",
          // 气泡背景色
          padding: 10,
          // 气泡内边距
          display: "ALWAYS"
          // 气泡显示方式
        }
      }
    ]);
    const getLocation = () => {
      common_vendor.index.getLocation({
        type: "wgs84",
        success: function(res) {
          common_vendor.index.__f__("log", "at pages/index/index.vue:130", "当前位置的经度：" + res.longitude);
          common_vendor.index.__f__("log", "at pages/index/index.vue:131", "当前位置的纬度：" + res.latitude);
          longitude.value = res.longitude;
          latitude.value = res.latitude;
        },
        fail: function(err) {
          common_vendor.index.__f__("log", "at pages/index/index.vue:136", err);
        }
      });
    };
    common_vendor.onMounted(() => {
      getLocation();
      getExpertTest();
    });
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0$1,
        b: common_vendor.o(todeepseek),
        c: common_assets._imports_1,
        d: common_vendor.o(toVariety),
        e: common_assets._imports_2,
        f: common_assets._imports_3,
        g: common_assets._imports_1,
        h: latitude.value,
        i: longitude.value,
        j: markers.value,
        k: common_vendor.o(_ctx.goToMore),
        l: common_vendor.p({
          title: "询问专家"
        }),
        m: common_vendor.f(expertlist.value, (item, k0, i0) => {
          return {
            a: item.avatar,
            b: common_vendor.t(item.expertName),
            c: common_vendor.t(item.major),
            d: common_vendor.t(item.degree),
            e: common_vendor.t(item.speciality),
            f: common_vendor.o(($event) => toexpertDetail(item))
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
