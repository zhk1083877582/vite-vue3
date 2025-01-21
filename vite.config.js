import path from "path";
import { defineConfig } from "vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";

const pathSrc = path.resolve(__dirname, "src");
// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        AutoImport({
            // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
            imports: ["vue"],
            resolvers: [IconsResolver({})],
            vueTemplate: true, // 是否在 vue 模板中自动导入
            dts: path.resolve(pathSrc, "types", "auto-imports.d.ts"), // 指定自动导入函数TS类型声明文件路径
        }),
        Components({
            resolvers: [
                // 自动导入 Element Plus 组件
                ElementPlusResolver({ importStyle: "sass" }),
                // 自动注册图标组件
                IconsResolver({
                    enabledCollections: ["ep"], // element-plus图标库，其他图标库 https://icon-sets.iconify.design/
                }),
            ],
            dts: path.resolve(pathSrc, "types", "components.d.ts"), // 指定自动导入组件TS类型声明文件路径
        }),
        Icons({
            // 自动安装图标库
            autoInstall: true,
        }),
    ],
    resolve: {
        alias: {
            "@": pathSrc,
        },
    },
    css: {
        preprocessorOptions: {
            scss: {
                // 自动导入定制化样式文件进行样式覆盖
                additionalData: `@use "@/assets/css/element-variables.scss" as *;`,
            },
        },
    },
});
