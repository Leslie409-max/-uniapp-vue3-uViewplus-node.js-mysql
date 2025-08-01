"use strict";
const common_vendor = require("../common/vendor.js");
common_vendor.dayjs.extend(common_vendor.relativeTime);
common_vendor.dayjs.locale("zh-cn");
function getLastTimeStr(time, friendly) {
  if (friendly) {
    return common_vendor.dayjs(time).fromNow().replace(" ", "");
  }
  return common_vendor.dayjs(new Date(time)).format("YYYY-MM-DD HH:mm");
}
exports.getLastTimeStr = getLastTimeStr;
//# sourceMappingURL=../../.sourcemap/mp-weixin/utils/time.js.map
