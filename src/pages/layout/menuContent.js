import React from 'react';
import { Menu } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';

function MenuContent(props) {
	const {routes, menuData, menuKey, dispatch} = props;

	const onClick = (menu) => {
        const { component, title, path } = menu.item.props.item;
        let newData = _.unionWith(menuData, [{title, path, component}], _.isEqual);
        dispatch({
            type: 'global/updateData',
            payload: {
                menuKey: menu.key,
                menuData: newData
            }
        });
        dispatch(routerRedux.push({
            pathname: path,
            query: {id: 1},
        }));
    };

	return (
		<Menu theme="dark" mode="inline" selectedKeys={[menuKey]}>
            {routes && routes.map((item) => {
                return (
                    <Menu.Item 
                        item={item}
                        key={item.path} 
                        icon={item.icon}
                        onClick={onClick}
                    >
                        {item.title}
                    </Menu.Item>
                )
            })}
        </Menu>
	);
}

export default connect((state) => {
	return { ...state.global };
})(MenuContent);
