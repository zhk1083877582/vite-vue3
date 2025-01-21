import "./elementUI.js";
import info from "./dt-info.vue";
import infoItem from "./dt-info-item.vue";
import infoEdit from "./edit/dt-info-edit.vue";
import infoEditGroup from "./edit/dt-info-edit-group.vue";
import infoEditText from "./edit/dt-info-edit-text.vue";
import infoEditTreeSelect from "./edit/dt-info-edit-tree-select.vue";
import infoEditDate from "./edit/dt-info-edit-date.vue";
import infoEditButton from "./edit/dt-info-edit-button.vue";

function init(app) {
    // dtUi.init(app);
    app.component("dt-info-edit", infoEdit);
    app.component("dt-info-edit-tree-select", infoEditTreeSelect);
    app.component("dt-info-edit-date", infoEditDate);
    app.component("dt-info-edit-text", infoEditText);
    app.component("dt-info-edit-button", infoEditButton);
    app.component("dt-info-edit-group", infoEditGroup);
    app.component("dt-info", info);
    app.component("dt-info-item", infoItem);
}

function validInfo(info, opts) {
    let newInfo = {};
    opts.forEach((opt) => {
        if (opt.data?.to) {
            let from = opt.data?.from && opt.data.from(info);
            if (from) {
                Object.assign(newInfo, opt.data.to(from));
            }
        } else if (opt.key && info[opt.key]) {
            newInfo[opt.key] = info[opt.key];
        }
    });
    for (var key in info) {
        delete info[key];
    }
    return Object.assign(info, newInfo);
}

export default {
    init,
    validInfo,
};
