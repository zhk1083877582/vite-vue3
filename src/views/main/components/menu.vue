<!-- 顶部路由 -->
<template>
    <div class="menu">
        <!-- 一级菜单 -->
        <Menu mode="horizontal" theme="light" :active-name="activeName">
            <MenuItem
                v-for="menu in menuList"
                :key="menu.cOpCde"
                :name="menu.cOpCde"
                @mouseenter.native="handleMouseEnter(menu)"
                @mouseleave.native="handleMouseLeave"
            >
                <Icon :type="menu.cOpImg" v-if="!menu.cOpImg?.includes('fa')" />
                <i :class="menu.cOpImg" v-else></i>
                {{ menu.cOpCnm }}
            </MenuItem>
        </Menu>

        <!-- 二级和三级菜单下拉框 -->
        <transition name="slide-fade">
            <div
                v-show="showSubMenu && currentSubMenus.length"
                class="sub-menu-wrapper"
                @mouseenter="handleSubMenuEnter"
                @mouseleave="handleSubMenuLeave"
            >
                <div class="sub-menu">
                    <div
                        class="sub-menu-group"
                        v-for="subMenu in currentSubMenus"
                        :key="subMenu.cOpCde"
                    >
                        <div class="group-title">
                            <Icon
                                :type="subMenu.cOpImg"
                                v-if="!subMenu.cOpImg?.includes('fa')"
                            />
                            <i :class="subMenu.cOpImg" v-else></i>
                            {{ subMenu.cOpCnm }}
                        </div>
                        <div class="group-items">
                            <div
                                v-for="item in subMenu.child"
                                :key="item.cOpCde"
                                class="menu-item"
                                :class="{
                                    active: activeSubItem === item.cOpCde,
                                }"
                                @click="handleItemClick(item)"
                            >
                                <Icon
                                    :type="item.cOpImg"
                                    v-if="!item.cOpImg?.includes('fa')"
                                />
                                <i :class="item.cOpImg" v-else></i>
                                {{ item.cOpCnm }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import { useRouter } from "vue-router";
import routerJson from "@/router/routerJson";
const router = useRouter();
const activeName = ref("");
const activeSubItem = ref("");
const showSubMenu = ref(false);
let hoverTimer = null;
const menuList = ref([]);

watch(
    () => router.currentRoute.value,
    (route) => {
        activeSubItem.value = route.meta.code;
    },
    { immediate: true }
);
// 获取菜单数据
onMounted(() => {
    routerJson.routerList().then((res) => {
        if (res.code === 200) {
            // return res.data.child || [];
            menuList.value = res.data.child || [];
        }
    });
});

// 当前显示的子菜单
const currentSubMenus = ref([]);

// 处理鼠标进入一级菜单
const handleMouseEnter = (menu) => {
    if (hoverTimer) clearTimeout(hoverTimer);
    activeName.value = menu.cOpCde;
    currentSubMenus.value = menu?.child || [];
    showSubMenu.value = true;
};

// 处理鼠标离开一级菜单
const handleMouseLeave = () => {
    hoverTimer = setTimeout(() => {
        showSubMenu.value = false;
        activeName.value = "";
    }, 200);
};

// 处理鼠标进入子菜单
const handleSubMenuEnter = () => {
    if (hoverTimer) clearTimeout(hoverTimer);
    showSubMenu.value = true;
};

// 处理鼠标离开子菜单
const handleSubMenuLeave = () => {
    showSubMenu.value = false;
    activeName.value = "";
};

// 处理菜单项点击
const handleItemClick = (item) => {
    if (item.cOpAct) {
        activeSubItem.value = item.cOpCde;
        // 处理路径，移除 index/ 前缀
        const path = item.cOpAct.replace(/^(\/)?index\//, "/");
        router.push(path);
        showSubMenu.value = false;
    }
};
</script>

<style lang="scss" scoped>
.menu {
    background: #fff;
    position: relative;

    .ivu-menu-horizontal {
        height: 50px;
        line-height: 50px;
    }
}

// 下拉框包装器
.sub-menu-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 51px;
    background: #f8f8f9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    z-index: 1000;
}

// 子菜单内容区
.sub-menu {
    max-height: 500px;
    overflow-y: auto;
    padding: 16px 24px;
    display: flex;
    flex-wrap: wrap;
    gap: 32px;

    // 自定义滚动条样式
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-thumb {
        background: #ccc;
        border-radius: 3px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
    }

    .sub-menu-group {
        min-width: 200px;
        margin-bottom: 16px;
        ma .group-title {
            font-size: 16px;
            font-weight: 500;
            color: #17233d;
            margin-bottom: 12px;
            display: flex;
            align-items: center;
            gap: 8px;

            i {
                font-size: 16px;
            }
        }

        .group-items {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .menu-item {
                padding: 8px 16px;
                cursor: pointer;
                border-radius: 4px;
                display: flex;
                align-items: center;
                gap: 8px;
                color: #515a6e;
                transition: all 0.3s;

                i {
                    font-size: 14px;
                }

                &:hover {
                    background: #e8eaec;
                    color: #2d8cf0;
                }

                &.active {
                    background: #2d8cf0;
                    color: #fff;
                }
            }
        }
    }
}

:deep(.ivu-menu-light.ivu-menu-horizontal .ivu-menu-item) {
    border: 0;
}
:deep(.ivu-menu-light:after) {
    width: 0;
}
// 过渡动画
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateY(-10px);
    opacity: 0;
}
</style>
