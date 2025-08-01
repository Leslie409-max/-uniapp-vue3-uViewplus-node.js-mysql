"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _component_View = common_vendor.resolveComponent("View");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  (_component_View + _easycom_up_input2 + _easycom_up_form_item2 + _easycom_up_form2)();
}
const _easycom_up_input = () => "../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_form_item = () => "../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_form = () => "../../node-modules/uview-plus/components/u-form/u-form.js";
if (!Math) {
  (NavBar + _easycom_up_input + _easycom_up_form_item + _easycom_up_form)();
}
const NavBar = () => "../../component/navBar2.js";
const _sfc_main = {
  __name: "reg",
  setup(__props) {
    const form = common_vendor.ref({
      username: "",
      password: "",
      role: ""
    });
    const rules = {
      "username": {
        type: "string",
        required: true,
        message: "请填写用户名",
        trigger: ["blur", "change"]
      },
      "password": {
        type: "string",
        required: true,
        message: "请填写密码",
        trigger: ["blur", "change"]
      },
      "role": {
        type: "number",
        required: true,
        message: "请确认身份",
        trigger: ["blur", "change"]
      }
    };
    const selectRole = (val) => {
      form.value.role = val;
    };
    const reg = () => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/api/reg`,
        method: "POST",
        data: form.value,
        success(res) {
          common_vendor.index.__f__("log", "at pages/login/reg.vue:105", res.data);
          common_vendor.index.showToast({
            title: "注册成功",
            duration: 2e3
          });
          setTimeout(() => {
            common_vendor.index.navigateTo({
              url: "/pages/login/login"
            });
          }, 1e3);
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/login/reg.vue:117", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true
        }),
        b: common_assets._imports_0$6,
        c: common_vendor.o(($event) => selectRole(0)),
        d: form.value.role === 0 ? 1 : "",
        e: common_assets._imports_1$4,
        f: common_vendor.o(($event) => selectRole(1)),
        g: form.value.role === 1 ? 1 : "",
        h: common_vendor.o(($event) => form.value.username = $event),
        i: common_vendor.p({
          border: "none",
          placeholder: "请输入用户名",
          modelValue: form.value.username
        }),
        j: common_vendor.sr("item1", "561d431d-3,561d431d-2"),
        k: common_vendor.p({
          label: "用户名:",
          prop: "username",
          borderBottom: true,
          ["label-width"]: "75"
        }),
        l: common_vendor.o(($event) => form.value.password = $event),
        m: common_vendor.p({
          border: "none",
          placeholder: "请输入密码",
          modelValue: form.value.password
        }),
        n: common_vendor.sr("item1", "561d431d-5,561d431d-2"),
        o: common_vendor.p({
          label: "密码:",
          prop: "password",
          borderBottom: true,
          ["label-width"]: "75"
        }),
        p: common_vendor.sr("form1", "561d431d-2"),
        q: common_vendor.p({
          labelPosition: "left",
          model: form.value,
          rules
        }),
        r: common_vendor.o(reg)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-561d431d"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/login/reg.js.map
