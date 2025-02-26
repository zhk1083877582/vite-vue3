import dt from "@/config/dt";
import { ElMessageBox, ElMessage, ElCheckbox } from "element-plus";
const Message = {
    success: (msg) => {
        return ElMessage({
            type: "success",
            message: msg,
        });
    },
    error: (msg) => {
        return ElMessage({
            type: "error",
            message: msg,
        });
    },
    warning: (msg) => {
        return ElMessage({
            type: "warning",
            message: msg,
        });
    },
    info: (msg) => {
        return ElMessage({
            type: "info",
            message: msg,
        });
    },
    loading: (msg) => {
        return ElMessage({
            type: "info",
            message: msg,
            icon: "Loading",
        });
    },
};
const messageBox = (opt) => {
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
    Message,
    messageBox,
    Modal,
};
// export default {
//     init,
// };
