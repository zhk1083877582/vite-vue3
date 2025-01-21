import "@lr17/lr/src/web";
import "./env";
import components from "@/components";
// import "./server";
import dt from "@lr17/lr";
// import ui from "./ui";
import tool from "./server/tool.js";
import "./server/version";

dt.tool = tool;

function init(app) {
    components.init(app);
}

export default {
    init,
};
