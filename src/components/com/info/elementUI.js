import dt from "@/config/dt";
import { ElMessageBox, ElMessage } from "element-plus";
const Message = {
    success: (msg) => {
        return ElMessage({
            type: "success",
            message: msg,
        });
    },
    // error: dt.ui.Message.error,
    // warning: dt.ui.Message.warning,
    // info: dt.ui.Message.info,
    // loading: dt.ui.Message.loading,
    // close: dt.ui.Message.close,
};
const messageBox = (opt) => {
    console.log("🚀 ~ messageBox ~ opt:", opt);
    return ElMessageBox({
        title: opt.title,
        message: opt.message,
        showCancelButton: opt.showCancelButton || true,
        confirmButtonText: opt.confirmButtonText || "确定",
        cancelButtonText: opt.cancelButtonText || "取消",
        type: opt.type || "",
    });
};
const Modal = {};
dt.ui = {
    ElMessage,
    messageBox,
    Modal,
};
// export default {
//     init,
// };
