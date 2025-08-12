"use strict";
const common_vendor = require("../../../common/vendor.js");
if (!Array) {
  const _easycom_up_upload2 = common_vendor.resolveComponent("up-upload");
  const _easycom_up_form_item2 = common_vendor.resolveComponent("up-form-item");
  const _easycom_up_input2 = common_vendor.resolveComponent("up-input");
  const _easycom_up_icon2 = common_vendor.resolveComponent("up-icon");
  const _easycom_up_action_sheet2 = common_vendor.resolveComponent("up-action-sheet");
  const _easycom_up_form2 = common_vendor.resolveComponent("up-form");
  (_easycom_up_upload2 + _easycom_up_form_item2 + _easycom_up_input2 + _easycom_up_icon2 + _easycom_up_action_sheet2 + _easycom_up_form2)();
}
const _easycom_up_upload = () => "../../../node-modules/uview-plus/components/u-upload/u-upload.js";
const _easycom_up_form_item = () => "../../../node-modules/uview-plus/components/u-form-item/u-form-item.js";
const _easycom_up_input = () => "../../../node-modules/uview-plus/components/u-input/u-input.js";
const _easycom_up_icon = () => "../../../node-modules/uview-plus/components/u-icon/u-icon.js";
const _easycom_up_action_sheet = () => "../../../node-modules/uview-plus/components/u-action-sheet/u-action-sheet.js";
const _easycom_up_form = () => "../../../node-modules/uview-plus/components/u-form/u-form.js";
if (!Math) {
  (_easycom_up_upload + _easycom_up_form_item + _easycom_up_input + _easycom_up_icon + _easycom_up_action_sheet + _easycom_up_form)();
}
const _sfc_main = {
  __name: "expertContain",
  setup(__props) {
    const expertForm = common_vendor.ref({
      avatar: "",
      expertName: "",
      sex: "",
      college: "",
      degree: "",
      major: "",
      speciality: "",
      phone: ""
    });
    const showSex = common_vendor.ref(false);
    const actions = common_vendor.ref(
      [
        { name: "男" },
        { name: "女" },
        { name: "保密" }
      ]
    );
    const fileList1 = common_vendor.ref([]);
    const deletePic = (event) => {
      fileList1.value.splice(event.index, 1);
    };
    const afterRead = async (event) => {
      let lists = [].concat(event.file);
      let fileListLen = fileList1.value.length;
      lists.map((item) => {
        fileList1.value.push({
          ...item,
          status: "uploading",
          message: "上传中"
        });
      });
      for (let i = 0; i < lists.length; i++) {
        try {
          const result = await uploadFilePromise(lists[i].url);
          let item = fileList1.value[fileListLen];
          fileList1.value.splice(fileListLen, 1, {
            ...item,
            status: "success",
            message: "",
            url: result
          });
          expertForm.value.avatar = result;
          fileListLen++;
        } catch (error) {
          fileList1.value.splice(fileListLen, 1);
          common_vendor.index.__f__("error", "at pages/mine/expert/expertContain.vue:198", "图片上传失败:", error);
        }
      }
    };
    const uploadFilePromise = (url) => {
      return new Promise((resolve, reject) => {
        common_vendor.index.__f__("log", "at pages/mine/expert/expertContain.vue:236", "使用本地文件URL:", url);
        resolve(url);
      });
    };
    const addExpert = () => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/expert/addExpert`,
        method: "POST",
        data: expertForm.value,
        success(res) {
          common_vendor.index.__f__("log", "at pages/mine/expert/expertContain.vue:247", res.data);
          common_vendor.index.showToast({
            title: "认证成功，正在跳转首页...",
            duration: 2e3
          });
          setTimeout(() => {
            common_vendor.index.switchTab({
              url: "/pages/index/index"
            });
          }, 1e3);
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/mine/expert/expertContain.vue:260", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(afterRead),
        b: common_vendor.o(deletePic),
        c: common_vendor.p({
          fileList: fileList1.value,
          name: "1",
          multiple: true,
          maxCount: 10,
          previewFullImage: true
        }),
        d: common_vendor.sr("item1", "4105f598-1,4105f598-0"),
        e: common_vendor.p({
          label: "头像:",
          prop: "avatar",
          borderBottom: true,
          ["label-width"]: "75"
        }),
        f: common_vendor.o(($event) => expertForm.value.expertName = $event),
        g: common_vendor.p({
          border: "none",
          placeholder: "请输入您的姓名",
          modelValue: expertForm.value.expertName
        }),
        h: common_vendor.sr("item1", "4105f598-3,4105f598-0"),
        i: common_vendor.p({
          label: "姓名:",
          prop: "expertName",
          borderBottom: true,
          ["label-width"]: "75"
        }),
        j: common_vendor.o(($event) => expertForm.value.sex = $event),
        k: common_vendor.p({
          border: "none",
          placeholder: "选择",
          modelValue: expertForm.value.sex
        }),
        l: common_vendor.o(($event) => showSex.value = true),
        m: common_vendor.p({
          name: "arrow-right"
        }),
        n: common_vendor.sr("item1", "4105f598-5,4105f598-0"),
        o: common_vendor.p({
          label: "性别:",
          prop: "sex",
          borderBottom: true,
          ["label-width"]: "75"
        }),
        p: common_vendor.o(($event) => showSex.value = false),
        q: common_vendor.o(_ctx.sexSelect),
        r: common_vendor.p({
          show: showSex.value,
          actions: actions.value,
          title: "请选择性别"
        }),
        s: common_vendor.o(($event) => expertForm.value.college = $event),
        t: common_vendor.p({
          border: "none",
          placeholder: "请输入您毕业的院校",
          modelValue: expertForm.value.college
        }),
        v: common_vendor.sr("item1", "4105f598-9,4105f598-0"),
        w: common_vendor.p({
          label: "毕业院校",
          prop: "college",
          borderBottom: true,
          ["label-width"]: "75"
        }),
        x: common_vendor.o(($event) => expertForm.value.degree = $event),
        y: common_vendor.p({
          border: "none",
          placeholder: "选择",
          modelValue: expertForm.value.degree
        }),
        z: common_vendor.sr("item1", "4105f598-11,4105f598-0"),
        A: common_vendor.p({
          label: "学历",
          prop: "degree",
          borderBottom: true,
          ["label-width"]: "75"
        }),
        B: common_vendor.o(($event) => expertForm.value.major = $event),
        C: common_vendor.p({
          border: "none",
          placeholder: "请输入您的专业",
          modelValue: expertForm.value.major
        }),
        D: common_vendor.sr("item1", "4105f598-13,4105f598-0"),
        E: common_vendor.p({
          label: "专业",
          prop: "major",
          borderBottom: true,
          ["label-width"]: "75"
        }),
        F: common_vendor.o(($event) => expertForm.value.speciality = $event),
        G: common_vendor.p({
          border: "none",
          placeholder: "请输入您的专长",
          modelValue: expertForm.value.speciality
        }),
        H: common_vendor.sr("item1", "4105f598-15,4105f598-0"),
        I: common_vendor.p({
          label: "专攻方向",
          prop: "speciality",
          borderBottom: true,
          ["label-width"]: "75"
        }),
        J: common_vendor.o(($event) => expertForm.value.phone = $event),
        K: common_vendor.p({
          border: "none",
          placeholder: "请输入您的手机号",
          modelValue: expertForm.value.phone
        }),
        L: common_vendor.sr("item1", "4105f598-17,4105f598-0"),
        M: common_vendor.p({
          label: "手机号",
          prop: "phone",
          borderBottom: true,
          ["label-width"]: "75"
        }),
        N: common_vendor.sr("form1", "4105f598-0"),
        O: common_vendor.p({
          labelPosition: "left",
          model: expertForm.value,
          rules: _ctx.rules,
          labelAlign: "left"
        }),
        P: common_vendor.o(addExpert),
        Q: common_vendor.gei(_ctx, "")
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/expert/expertContain.js.map
