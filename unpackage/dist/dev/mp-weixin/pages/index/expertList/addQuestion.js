"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_userStore = require("../../../store/userStore.js");
if (!Array) {
  const _easycom_up_upload2 = common_vendor.resolveComponent("up-upload");
  _easycom_up_upload2();
}
const _easycom_up_upload = () => "../../../node-modules/uview-plus/components/u-upload/u-upload.js";
if (!Math) {
  (NavBar + _easycom_up_upload)();
}
const NavBar = () => "../../../component/navBar2.js";
const _sfc_main = {
  __name: "addQuestion",
  setup(__props) {
    const userStore = store_userStore.userUserStore();
    const userinfo = userStore.userInfo;
    common_vendor.onLoad((option) => {
      common_vendor.index.__f__("log", "at pages/index/expertList/addQuestion.vue:35", "传过来的专家id", option.expert_id);
      form.value.expert_id = Number(option.expert_id);
      common_vendor.index.__f__("log", "at pages/index/expertList/addQuestion.vue:37", "expert_id", form.value.expert_id);
    });
    const form = common_vendor.ref({
      content: "",
      expert_id: "",
      picture: "",
      // 添加图片字段
      asker_id: userinfo.id
    });
    const fileList = common_vendor.ref([]);
    const deletePic = (event) => {
      fileList.value.splice(event.index, 1);
      updatePictureField();
    };
    const afterRead = async (event) => {
      let lists = [].concat(event.file);
      let fileListLen = fileList.value.length;
      lists.map((item) => {
        fileList.value.push({
          ...item,
          status: "uploading",
          message: "上传中"
        });
      });
      for (let i = 0; i < lists.length; i++) {
        try {
          const result = await uploadFilePromise(lists[i].url);
          let item = fileList.value[fileListLen];
          fileList.value.splice(fileListLen, 1, {
            ...item,
            status: "success",
            message: "",
            url: result
          });
          fileListLen++;
        } catch (error) {
          fileList.value.splice(fileListLen, 1);
          common_vendor.index.__f__("error", "at pages/index/expertList/addQuestion.vue:83", "图片上传失败:", error);
        }
      }
      updatePictureField();
    };
    const updatePictureField = () => {
      const pictureUrls = fileList.value.filter((item) => item.status === "success").map((item) => item.url);
      form.value.picture = pictureUrls.join(",");
    };
    const uploadFilePromise = (url) => {
      return new Promise((resolve, reject) => {
        common_vendor.index.__f__("log", "at pages/index/expertList/addQuestion.vue:132", "使用本地文件URL:", url);
        resolve(url);
      });
    };
    const addQuestion = () => {
      updatePictureField();
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/question/addQuestion`,
        method: "POST",
        data: form.value,
        success(res) {
          common_vendor.index.__f__("log", "at pages/index/expertList/addQuestion.vue:146", res.data);
          common_vendor.index.showToast({
            title: "提问成功",
            duration: 2e3
          });
          setTimeout(() => {
            common_vendor.index.navigateBack();
          }, 2e3);
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/index/expertList/addQuestion.vue:157", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true
        }),
        b: form.value.content,
        c: common_vendor.o(($event) => form.value.content = $event.detail.value),
        d: common_vendor.o(afterRead),
        e: common_vendor.o(deletePic),
        f: common_vendor.p({
          fileList: fileList.value,
          name: "question",
          multiple: true,
          maxCount: 3,
          previewFullImage: true
        }),
        g: common_vendor.o(addQuestion)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-33fb3a62"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/index/expertList/addQuestion.js.map
