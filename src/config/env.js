import dt from "@lr17/lr";
const env = {
    dev: {
        dtUrl: "http://172.16.1.150:7777",
        env: "dev",
    },
    test: {
        dtUrl: "https://icapitest.tospur.com",
        env: "test",
    },
    uat: {
        dtUrl: "https://icapiuat.tospurfang.com",
        env: "uat",
    },
    prod: {
        dtUrl: "https://hftgw.tospurfang.com",
        env: "prod",
    },
};

let config = {
    id: 36,
    name: "demo1",
    version: import.meta.env.VITE_BUILD_VERSION,
    buildTime: import.meta.env.VITE_BUILD_TIME,
    deviceType: 4,
    env: import.meta.env.VITE_ENV,
};

if (import.meta.env.DEV) {
    Object.assign(dt.env, config, env.prod);
} else {
    Object.assign(dt.env, config, env[import.meta.env.VITE_ENV]);
}
console.log("🚀 ~ dt:", dt);
