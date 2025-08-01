"use strict";
const common_vendor = require("../common/vendor.js");
const useknowledgeStore = common_vendor.defineStore("knowledgeStore", () => {
  const editData = common_vendor.ref({});
  const setEdit = (newEdit) => {
    editData.value = newEdit;
  };
  const removeEdit = () => {
    editData.value = " ";
  };
  return {
    editData,
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
exports.useknowledgeStore = useknowledgeStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/store/knowledge.js.map
