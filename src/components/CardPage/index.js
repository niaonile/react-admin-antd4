import React from 'react';
import cs from 'classnames';
import { Card } from 'antd';

import styles from './index.less';

function CardPage(props) {
    const { headStyle, bodyStyle, footer, children } = props;

    const [ actions, setActions ] = React.useState();

    React.useEffect(() => {
        if (footer) {
            setActions([footer]);
        } else {
            setActions();
        }
    }, [footer]);

    const getProps = () => {
        let myProps = {...props};
        let arr = ['footer', 'children'];
        arr.map(item => {
            delete myProps[item];
        });
        return myProps;
    };
    return (
        <Card
            bordered={false}
            {...getProps()}
            actions={actions}
            headStyle={{
                flex: '0 0 56px',
                zIndex: 1,
                ...headStyle
            }}
            bodyStyle={{
                height: 'calc(100% - 56px)',
                overflow: 'auto',
                marginBottom: footer ? 57 : 0,
                ...bodyStyle
            }}
            className={cs(
                styles.normal
            )}
        >
            {children}
        </Card>
    );
}

export default CardPage;