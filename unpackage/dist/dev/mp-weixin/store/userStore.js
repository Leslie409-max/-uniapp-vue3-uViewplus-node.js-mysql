"use strict";
const common_vendor = require("../common/vendor.js");
const userUserStore = common_vendor.defineStore("userStore", () => {
  const token = common_vendor.ref("");
  const role = common_vendor.ref("");
  const userInfo = common_vendor.ref({});
  const editData = common_vendor.ref({});
  const setUserInfo = (info) => {
    userInfo.value = info;
  };
  const setToken = (newToken) => {
    token.value = newToken;
  };
  const removeToken = () => {
    token.value = " ";
  };
  const setRole = (newRole) => {
    role.value = newRole;
  };
  const setEdit = (newEdit) => {
    editData.value = newEdit;
  };
  const removeEdit = () => {
    editData.value = " ";
  };
  return {
    token,
    role,
    userInfo,
    editData,
    setToken,
    removeToken,
    setRole,
    setUserInfo,
    setEdit,
    removeEdit
  };
}, {
  persist: {
    enabled: true,
    strategies: [
      {
        storage: {
          getItem: (key) => common_vendor.index.getStorageSync(key),
          setItem: (key, value) => common_vendor.index.setStorageSync(key, value)
        }
      }
    ]
  }
});
exports.userUserStore = userUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/userStore.js.map
