import React from 'react';
import { Route, Switch } from 'dva/router';

// 路由渲染函数
export default function routerRender(routes, history) {
    return (
        <Switch>
            {routes.map((item) => {
                const { component: Component, routes, path } = item;
                return !routes ? (
                    <Route {...item} key={path} />
                ) : (
                    <Route path={path} key={path} render={() => <Component routes={routes} history={history} />}></Route>
                );
            })}
        </Switch>
    );
}