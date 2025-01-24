import "@lr17/lr/src/web";
import server from "./dt";
import Config from "./base/Config";
import DtAuth from "./DtAuth.js";
import DtDelegate from "./DtDelegate.js";
import Fly from "flyio/dist/npm/fly";
import dt from "@lr17/lr";

server.handle.setupFly(Fly);
// server
//     .setAuth(new DtAuth())
//     .setConfig(new Config(true))
//     .setDelegate(new DtDelegate());
server
    .setAuth(new DtAuth())
    .setConfig(new Config(true))
    .setDelegate(new DtDelegate());

dt.server = server;

export default server;
