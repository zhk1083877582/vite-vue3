import components from "@/components";
import sizeDiect from "./sizeDiect.js";
import Vue3DraggableResizable from "vue3-draggable-resizable";
import "vue3-draggable-resizable/dist/Vue3DraggableResizable.css";

function init(app) {
    components.init(app);
    sizeDiect.init(app);
    app.use(Vue3DraggableResizable);
    app.directive("code", {
        mounted(el, binding) {
            // if (!userStore().canShowButton(binding.value)) {
            //   el.style.display = 'none' // ～～～ 这里只是隐藏，应该要移除
            // }
        },
    });
}

export default {
    init,
};
