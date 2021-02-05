import React from "react";
import { Spin } from 'antd';
import { asynImport } from "@/utils";
import { UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

// 动态路由加载以及 redux 注册
function dynamicRouter(importComponent, storeArr, app) {
    return asynImport(() => <Spin tip="Loading..." style={{width: "100%"}} />, importComponent, storeArr, app);
}

// 路由配置
const getRouterData = function (app) {
    function dynamicRouterWraper(importComponent, storeArr) {
        return dynamicRouter(importComponent, storeArr, app);
    }
    return [
        {
            path: "/",
            exact: true,
            component: dynamicRouterWraper(() => import("../pages/tender/functionOne")),
        },
        {
            path: "/home",
            component: dynamicRouterWraper(() => import("../pages/layout"), ["global"]),
            routes: [
                {
                    path: "/home/index",
                    exact: true,
                    title: '招标管理',
                    icon: <UserOutlined />,
                    component: dynamicRouterWraper(() => import("../pages/home"), ["home"]),
                },
                {
                    path: '/home/company',
                    title: '投标管理',
                    icon: <VideoCameraOutlined />,
                    component: dynamicRouterWraper(() => import('../pages/company')),
                },
            ],
        },
        {
            path: '*',
            name: 'error',
            component: () => import('../pages/error'),
        },
    ];
};

export default getRouterData;