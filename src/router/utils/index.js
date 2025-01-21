import routerJson from "../routerJson";
const vues = import.meta.glob("/src/views/content/**/index.vue");
// 获取路由列表
export async function getRouterList() {
    try {
        const res = await routerJson.routerList();
        if (res.code === 200) {
            return res.data.child || [];
        }
        return [];
    } catch (error) {
        console.error("获取路由列表失败:", error);
        return [];
    }
}

// 初始化动态路由
export async function initDynamicRoutes(router) {
    try {
        const routerList = await getRouterList();
        const routes = flattenRoutes(routerList);
        // 找到主路由
        const mainRoute = router.options.routes.find(
            (route) => route.name === "main"
        );
        if (mainRoute) {
            // 转换为vue路由格式
            routes.map((key) => {
                let path = key.path;
                let vuePath = `/src/views/content${path}/index.vue`;
                if (vues[vuePath]) {
                    mainRoute.children.push({
                        path: path,
                        name: path,
                        meta: {
                            KeepAlive: key.KeepAlive || false,
                            path,
                            name: path,
                            title: key.title,
                            code: key.cOpCde,
                            cOpRoot: key.cOpRoot,
                        },
                        component: vues[vuePath],
                    });
                } else {
                    // console.error(`Component not found for path: ${vuePath}`);
                }
            });

            // 重新添加路由
            router.addRoute(mainRoute);
        }

        return routes;
    } catch (error) {
        console.error("初始化动态路由失败:", error);
        return [];
    }
}

// 扁平化路由数据
export function flattenRoutes(routes) {
    const result = [];

    /**
     * @param {Array} items - 当前遍历的路由项
     * @param {Array} parentNames - 父级的 cOpCnm 数组
     */
    function traverse(items, parentNames = []) {
        items.forEach((item) => {
            // 复制父级名称数组
            const currentNames = [...parentNames];
            // 排除第一级的 cOpCnm
            if (item.child.length > 0) {
                currentNames.push(item.cOpCnm);
            }

            if (item.cOpAct && (!item.child || item.child.length === 0)) {
                result.push({
                    path: extractPath(item.cOpAct),
                    name: extractPath(item.cOpAct),
                    title: item.cOpCnm,
                    cOpCde: item.cOpCde,
                    component: item.cOpAct,
                    cOpRoot: currentNames.join("/"), // 拼接后的 cOpRoot
                });
            }

            if (item.child && item.child.length > 0) {
                traverse(item.child, currentNames);
            }
        });
    }

    traverse(routes);
    return result;
}

// 提取路径
export function extractPath(path) {
    return path.replace(/^(\/)?index\//, "/");
}

// 获取第一个可用路由
export async function getFirstAvailableRoute(router) {
    const mainRoute = router.options.routes.find(
        (route) => route.name === "main"
    );
    if (mainRoute && mainRoute.children && mainRoute.children.length > 0) {
        return mainRoute.children[0];
    }
    return null;
}
