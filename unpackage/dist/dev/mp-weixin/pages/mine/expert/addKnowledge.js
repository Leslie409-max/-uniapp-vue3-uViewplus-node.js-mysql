"use strict";
const common_vendor = require("../../../common/vendor.js");
const store_userStore = require("../../../store/userStore.js");
const store_knowledge = require("../../../store/knowledge.js");
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
  __name: "addKnowledge",
  setup(__props) {
    const isEditmode = common_vendor.ref(false);
    const userStore = store_userStore.userUserStore();
    const userinfo = userStore.userInfo;
    const knowledgeStore = store_knowledge.useknowledgeStore();
    const form = common_vendor.ref({
      title: "",
      content: "",
      type: "",
      picture: "",
      // 添加图片字段
      created_at: ""
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
          common_vendor.index.__f__("error", "at pages/mine/expert/addKnowledge.vue:88", "图片上传失败:", error);
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
        common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:137", "使用本地文件URL:", url);
        resolve(url);
      });
    };
    common_vendor.onLoad((options) => {
      common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:143", options.mode);
      if (options.mode == "edit") {
        isEditmode.value = true;
        form.value = knowledgeStore.editData[0];
        common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:147", form.value);
        if (form.value.picture) {
          const pictureUrls = form.value.picture.split(",");
          fileList.value = pictureUrls.map((url) => ({
            url,
            status: "success",
            message: ""
          }));
        }
      }
    });
    const addPost = () => {
      if (userinfo.expert_id == null) {
        form.value.user_id = userinfo.id;
      }
      form.value.created_at = common_vendor.dayjs().format("YYYY-MM-DD HH:mm:ss");
      common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:166", "提交内容", form.value);
      common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:167", "开始发送请求...用户发帖");
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/post/addPost`,
        method: "POST",
        data: form.value,
        header: {
          "Content-Type": "application/json"
        },
        success(res) {
          common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:176", "请求成功，响应数据:", res);
          if (res.data.status == 0) {
            common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:178", "操作成功:", res.data);
            common_vendor.index.showToast({
              title: "用户发布贴子成功",
              duration: 2e3
            });
            setTimeout(() => {
              common_vendor.index.navigateBack();
              addPost();
            }, 2e3);
          } else {
            common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:189", "操作失败:", res.data);
            common_vendor.index.showToast({
              title: "发布失败",
              icon: "error",
              duration: 2e3
            });
          }
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:198", "请求失败:", err);
          common_vendor.index.showToast({
            title: "网络请求失败",
            icon: "error",
            duration: 2e3
          });
        }
      });
    };
    const addKnowledge = () => {
      if (userinfo.expert_id) {
        form.value.expert_id = userinfo.expert_id;
      }
      form.value.created_at = common_vendor.dayjs().format("YYYY-MM-DD HH:mm:ss");
      common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:213", "提交内容", form.value);
      common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:215", "开始发送请求...");
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/addKonwledge`,
        method: "POST",
        data: form.value,
        header: {
          "Content-Type": "application/json"
        },
        success(res) {
          common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:224", "请求成功，响应数据:", res);
          if (res.data.status == 0) {
            common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:226", "操作成功:", res.data);
            common_vendor.index.showToast({
              title: "发布成功",
              duration: 2e3
            });
            setTimeout(() => {
              common_vendor.index.navigateBack();
              addKnowledge();
            }, 2e3);
          } else {
            common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:237", "操作失败:", res.data);
            common_vendor.index.showToast({
              title: "发布失败",
              icon: "error",
              duration: 2e3
            });
          }
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:246", "请求失败:", err);
          common_vendor.index.showToast({
            title: "网络请求失败",
            icon: "error",
            duration: 2e3
          });
        }
      });
    };
    const open = () => {
      if (userinfo.expert_id) {
        addKnowledge();
      } else {
        addPost();
      }
    };
    const updateKnowledge = () => {
      common_vendor.index.request({
        url: `http://127.0.0.1:3006/know/updateKonwledge`,
        method: "POST",
        data: form.value,
        success(res) {
          common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:269", res.data);
          if (res.data.status == 0) {
            common_vendor.index.showToast({
              title: "修改成功",
              duration: 2e3
            });
            setTimeout(() => {
              common_vendor.index.navigateBack();
            }, 2e3);
          }
        },
        fail(err) {
          common_vendor.index.__f__("log", "at pages/mine/expert/addKnowledge.vue:282", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          showBack: true
        }),
        b: form.value.title,
        c: common_vendor.o(($event) => form.value.title = $event.detail.value),
        d: form.value.content,
        e: common_vendor.o(($event) => form.value.content = $event.detail.value),
        f: form.value.type,
        g: common_vendor.o(($event) => form.value.type = $event.detail.value),
        h: common_vendor.o(afterRead),
        i: common_vendor.o(deletePic),
        j: common_vendor.p({
          fileList: fileList.value,
          name: "knowledge",
          multiple: true,
          maxCount: 5,
          previewFullImage: true
        }),
        k: common_vendor.t(isEditmode.value ? "更新" : "发布"),
        l: common_vendor.o(($event) => isEditmode.value ? updateKnowledge() : open())
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1a6b73ac"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/mine/expert/addKnowledge.js.map
