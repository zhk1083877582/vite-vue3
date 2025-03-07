import info from "./info";
import modal from "./modal";
import table from "./table";
import preview from "./preview";
import sortHeader from './sortHeader'
import orgModal from './orgModal'
import contentWarp from './contentWarp'

function init(app) {
  preview.init(app);
  info.init(app);
  modal.init(app);
  table.init(app);
  sortHeader.init(app)
  orgModal.init(app)
  contentWarp.init(app)
}

export default {
  init,
};
