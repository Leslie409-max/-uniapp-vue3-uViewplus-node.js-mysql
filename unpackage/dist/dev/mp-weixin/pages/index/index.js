"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_up_swiper2 = common_vendor.resolveComponent("up-swiper");
  _easycom_up_swiper2();
}
const _easycom_up_swiper = () => "../../node-modules/uview-plus/components/u-swiper/u-swiper.js";
if (!Math) {
  (NavBar + _easycom_up_swiper + Title)();
}
const NavBar = () => "../../component/navBar2.js";
const Title = () => "../../component/title.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const list1 = common_vendor.reactive([
      "/static/banner1 (1).jpg",
      "/static/banner1 (2).jpg",
      "/static/deepseek.jpg"
    ]);
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
          common_vendor.index.__f__("log", "at pages/index/index.vue:108", res);
          expertlist.value = res.data.data;
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/index.vue:112", err);
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
          common_vendor.index.__f__("log", "at pages/index/index.vue:143", "当前位置的经度：" + res.longitude);
          common_vendor.index.__f__("log", "at pages/index/index.vue:144", "当前位置的纬度：" + res.latitude);
          longitude.value = res.longitude;
          latitude.value = res.latitude;
        },
        fail: function(err) {
          common_vendor.index.__f__("log", "at pages/index/index.vue:149", err);
        }
      });
    };
    common_vendor.onMounted(() => {
      getLocation();
      getExpertTest();
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          name: true
        }),
        b: common_vendor.o(_ctx.change),
        c: common_vendor.p({
          list: list1,
          height: "200",
          radius: "15"
        }),
        d: common_assets._imports_0$1,
        e: common_vendor.o(toVariety),
        f: common_assets._imports_1,
        g: common_assets._imports_2,
        h: common_assets._imports_0$1,
        i: common_vendor.o(todeepseek),
        j: latitude.value,
        k: longitude.value,
        l: markers.value,
        m: common_vendor.o(_ctx.goToMore),
        n: common_vendor.p({
          title: "询问专家"
        }),
        o: common_vendor.f(expertlist.value, (item, k0, i0) => {
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
