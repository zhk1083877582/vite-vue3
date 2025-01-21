import info from "./info";
import modal from "./modal";
import table from "./table";
// import preview from './preview'
// import sortHeader from './sortHeader'

function init(app) {
    // preview.init(app)
    info.init(app);
    modal.init(app);
    table.init(app);
    // sortHeader.init(app)
}

export default {
    init,
};
