import React from "react";
import { Router } from "dva/router";
import routerRender from "./router";
import getRouterData from "./router/router";
import styles from './App.less';

class App extends React.Component {
    render() {
        const { app, history } = this.props;
        let routes = getRouterData(app);
        return (
            <div className={styles.app}>
                <Router history={history}>{routerRender(routes, history)}</Router>
            </div>
        );
    }
}

// 返给 Dva 的页面函数
export function RouterConfig({ history, app }) {
    return <App history={history} app={app} />;
}
