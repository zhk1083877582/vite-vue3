// src/views/content/test/test3/config/flowData.js
export const initialNodes = [
    {
        id: "claim",
        type: "process",
        position: { x: 300, y: 50 },
        data: {
            label: "理赔",
            status: "active",
            description: "理赔流程启动",
            time: "2024-03-20 10:00:00",
        },
    },
    {
        id: "report",
        type: "process",
        position: { x: 100, y: 150 },
        data: {
            label: "报案",
            status: "completed",
            description: "客户报案信息",
            time: "2024-03-20 10:30:00",
        },
    },
    {
        id: "survey",
        type: "process",
        position: { x: 300, y: 150 },
        data: {
            label: "查勘定损方案",
            status: "pending",
            description: "现场查勘评估",
            time: "2024-03-20 11:00:00",
        },
    },
    // ... 添加其他节点
];

export const initialEdges = [
    {
        id: "e1-2",
        source: "claim",
        target: "report",
        type: "smoothstep",
        style: { stroke: "#1890ff" },
        markerEnd: {
            type: "arrow",
            width: 20,
            height: 20,
            color: "#13c2c2",
        },
    },
    {
        id: "e2-3",
        source: "report",
        target: "survey",
        type: "smoothstep",
        style: { stroke: "#1890ff" },
    },
    // ... 添加其他连线
];
