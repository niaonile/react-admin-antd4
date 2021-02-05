import React from 'react';
import cs from 'classnames';
import { connect } from 'dva';
import styles from './index.less';
import { Menu, Tabs, Spin, Empty, Dropdown } from 'antd';

function TabsContent(props) {
	const {menuData, menuKey, dispatch} = props;
    const [refresh, setRefresh] = React.useState(false);
    const [activeKey, setActiveKey] = React.useState(menuKey);
    
    React.useEffect(() => {
        setActiveKey(menuKey);
    }, [menuKey]);

    React.useEffect(() => {
        if (refresh) {
            setTimeout(() => {
                setRefresh(false);
            }, 2000);
        }
    }, [refresh]);

	const onEdit = (targetKey, action) => {
        if(action === 'remove') remove(targetKey);
    };

    // 关闭某一标签
    const remove = targetKey => {
        let lastIndex, key = activeKey;
        menuData.forEach((pane, i) => {
            if (pane.path === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = menuData.filter(pane => pane.path !== targetKey);
        if (panes.length && key === targetKey) {
            if (lastIndex >= 0) {
                key = panes[lastIndex].path;
            } else {
                key = panes[0].path;
            }
        }
        setActiveKey(key);
        dispatch({
            type: 'global/updateData',
            payload: {
                menuKey: key,
                menuData: panes
            }
        });
    };

    // 标签切换
    const onChange = (key) => {
        // console.log(props);
        setActiveKey(key);
        dispatch({
            type: 'global/updateData',
            payload: {menuKey: key}
        });
    };

    // 关闭其它标签
    const closeOtherTab = () => {
        const panes = menuData.filter(pane => pane.path === activeKey);
        let newData = _.unionWith(menuData[0], panes, _.isEqual);
        // console.log(panes, newData, menuData[0]);
        dispatch({
            type: 'global/updateData',
            payload: {
                menuKey: panes[0].path,
                menuData: newData
            }
        });
    };

    // 关闭所有标签
    const closeAllTab = () => {
        dispatch({
            type: 'global/updateData',
            payload: {
                menuKey: menuData[0].path,
                menuData: [menuData[0]]
            }
        });
    };
    
    // 刷新当前标签
    const refreshTab = () => {
        setRefresh(true);
    };
    
    const operations = (
        <Dropdown.Button 
            trigger={['click']}
            overlay={
                <Menu>
                    <Menu.Item 
                        disabled={activeKey === menuData[0].path} 
                        onClick={() => {
                            remove(activeKey);
                        }}
                    >关闭当前选项卡</Menu.Item>
                    <Menu.Item
                        onClick={closeOtherTab}
                    >关闭其它选项卡</Menu.Item>
                    <Menu.Item
                        onClick={closeAllTab}
                    >关闭所有选项卡</Menu.Item>
                    <Menu.Item
                        onClick={refreshTab}
                    >刷新当前选项卡</Menu.Item>
                </Menu>
            }
        >
            操作
        </Dropdown.Button>
    );

    const renderPage = (component) => {
        const Component = component;
        if (refresh) {
            return <Spin tip="刷新页面中..." style={{width: "100%", marginTop: '20vh'}} />;
        }
        if (!component) {
            return <Empty description={'页面开发中...'} imageStyle={{marginTop: '20vh'}}/>;
        }
        return <Component />;
    };

	return (
		<Tabs 
            hideAdd
            type="editable-card"
            onEdit={onEdit}
            activeKey={activeKey}
            onChange={onChange} 
            className={styles.tabsBox}
            tabBarExtraContent={operations}
            tabBarStyle={{
                background: '#f0f0f0'
            }}
        >
            {menuData.map((item) => {
                const { component, closable, title, path } = item;
                let c = path.replace(/\//g, "-");
                return (
                    <Tabs.TabPane className={cs(`tabs${c}`)} tab={title} key={path} closable={closable} style={{padding: '0 16px'}}>
                        {renderPage(component)}
                    </Tabs.TabPane>
                )
            })}
        </Tabs>
	);
}

export default connect((state) => {
	return { ...state.global };
})(TabsContent);
