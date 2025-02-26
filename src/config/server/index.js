import "@lr17/lr/src/web";
import Server from "./base/Server.js";
import Config from "./base/Config";
import DtDelegate from "./DtDelegate.js";
import Fly from "flyio/dist/npm/fly";
import dt from "@lr17/lr";
import DtAuth from "./DtAuth.js";
import DtHandle from "./DtHandle.js";
import DtApi from "./DtApi.js"
let server = new Server(DtApi, DtHandle, DtAuth);
server.handle.setupFly(Fly);

server
  .setAuth(new DtAuth())
  .setConfig(new Config(true))
  .setDelegate(new DtDelegate(true));

dt.server = server;

export default server;
