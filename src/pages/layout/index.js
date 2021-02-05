import React from 'react';
import _ from 'lodash';
import cs from 'classnames';
import config from '@/config';
import { connect } from 'dva';
import styles from './index.less';
import routerRender from "@/router";
import MenuContent from './menuContent';
import TabsContent from './tabsContent';
import { Layout, Menu, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';

const { Header, Sider, Content } = Layout;

@connect((state) => {
	return { ...state.global };
})
class Layouts extends React.Component {
    state = {
        collapsed: false,
    };

    componentDidMount() {
        // console.log(this.props);
        this.handleRefreshWithPath();
    }

    handleRefreshWithPath = () => {
        const {routes, dispatch, menuKey, menuData, history: {location}} = this.props;
        if (location.pathname !== menuKey) {
            let panes = _.cloneDeep(routes.filter(pane => pane.path === location.pathname));
            // 删除tabs数据多余的字段
            let filed = ['exact', 'icon'];
            for (let i = 0; i < filed.length; i ++) {
                delete panes[0][filed[i]];
            }
            // 与redux的数据比对
            let newData = _.unionWith(menuData, panes, _.isEqual);
            dispatch({
                type: 'global/updateData',
                payload: {
                    menuKey: location.pathname,
                    menuData: newData
                }
            });
        }
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    };

    render() {
        const {routes} = this.props;

        return (
            <Layout className={styles.layout}>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
                    <div className={styles.logo} />
                    <MenuContent routes={routes}/>
                </Sider>
                <Layout className={styles.siteLayout}>
                    <Header className={styles.siteLayoutBackground} style={{ padding: 0 }}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: styles.trigger,
                            onClick: this.toggle,
                        })}
                    </Header>
                    <Content
                        className={cs(
                            styles.siteLayoutBackground,
                            config.isTabs ? styles.tabsContent : styles.normalContent
                        )}
                    >
                        {config.isTabs ? <TabsContent routes={routes}/> : routerRender(routes)}
                    </Content>
                </Layout>
            </Layout>
        )
    }
}

export default Layouts;