"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const store_userStore = require("../../store/userStore.js");
if (!Array) {
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  (_easycom_up_input2 + _easycom_up_form_item2 + _easycom_up_form2)();
}
const _easycom_up_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_form_item = () => "../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_form = () => "../../node-modules/uview-plus/components/u-form/u-form.js";
if (!Math) {
  (NavBar + _easycom_up_input + _easycom_up_form_item + _easycom_up_form)();
}
const NavBar = () => "../../component/navBar2.js";
const _sfc_main = {
  __name: "login",
  setup(__props) {
    const userStore = store_userStore.userUserStore();
    const rules = {
      "username": {
        type: "string",
        required: true,
        message: "请填写用户名",
        trigger: ["blur", "change"]
      },
      "password": {
        type: "password",
        required: true,
        message: "请填写4位验证码",
        trigger: ["blur", "change"]
      }
    };
    const form = common_vendor.ref({
      username: "",
      password: "",
      role: ""
    });
    const login = () => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/api/login`,
        method: "POST",
        data: form.value,
        success(res) {
          var _a, _b, _c;
          common_vendor.index.__f__("log", "at pages/login/login.vue:87", res.data);
          if (res.data.status == 0) {
            userStore.setUserInfo((_a = res.data) == null ? void 0 : _a.userinfo);
            userStore.setToken((_b = res.data) == null ? void 0 : _b.token);
            userStore.setRole((_c = res.data) == null ? void 0 : _c.role);
            common_vendor.index.showToast({
              title: "登录成功",
              duration: 2e3
            });
            setTimeout(() => {
              common_vendor.index.switchTab({
                url: "/pages/index/index"
              });
            }, 1e3);
          }
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/login/login.vue:104", err);
        }
      });
    };
    const toreg = (id) => {
      common_vendor.index.navigateTo({
        url: "/pages/login/reg"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true
        }),
        b: common_assets._imports_0,
        c: common_vendor.o(($event) => form.value.username = $event),
        d: common_vendor.p({
          border: "none",
          placeholder: "请输入用户名",
          modelValue: form.value.username
        }),
        e: common_vendor.sr("item1", "e4e4508d-2,e4e4508d-1"),
        f: common_vendor.p({
          label: "用户名:",
          prop: "username",
          borderBottom: true,
          ["label-width"]: "75"
        }),
        g: common_vendor.o(($event) => form.value.password = $event),
        h: common_vendor.p({
          border: "none",
          placeholder: "请输入密码",
          modelValue: form.value.password
        }),
        i: common_vendor.sr("item1", "e4e4508d-4,e4e4508d-1"),
        j: common_vendor.p({
          label: "密码:",
          prop: "password",
          borderBottom: true,
          ["label-width"]: "75"
        }),
        k: common_vendor.sr("form1", "e4e4508d-1"),
        l: common_vendor.p({
          labelPosition: "left",
          model: form.value,
          rules,
          labelAlign: "left"
        }),
        m: common_vendor.o(login),
        n: common_vendor.o(toreg)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-e4e4508d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/login.js.map
