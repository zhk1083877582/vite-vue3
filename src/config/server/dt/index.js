import DtAuth from "./DtAuth.js";
import DtHandle from "./DtHandle.js";
import DtApi from "./DtApi.js";
import Server from "../base/Server.js";

let server = new Server(DtApi, DtHandle, DtAuth);

export default server;
