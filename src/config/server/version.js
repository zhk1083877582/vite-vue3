import dt from "@lr17/lr";
import Fly from "flyio/dist/npm/fly";

const fly = new Fly();

function check() {
    fly.get(`/buildTime.txt?t=${Date.now()}`).then((res) => {
        console.log("check", res.data, dt.env.buildTime);
        if (res.data != dt.env.buildTime) {
            setTimeout(() => {
                location.reload();
            }, 30000);
        }
    });
}

// setInterval(() => {
//     check();
// }, 60000);
