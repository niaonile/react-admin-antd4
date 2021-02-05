import React from 'react';
import { Row, Col, Button } from 'antd';
import DemoOne from './demo1';
import styles from './index.less';
import GlobalModal from '@/components/ViewModal';

function Company() {
	const [showModal, setShowModal] = React.useState(false);

	React.useEffect(() => {
        console.log('first');
    }, []);

	const onClick = () => {
		setShowModal(true);
	};

	return (
		<Row>
			<Col span={24}>
				<Button onClick={onClick}>测试GLOBALMODAL-0</Button>
			</Col>
			<GlobalModal
				fixed="right"
				showModal={showModal}
				onClose={() => {
					setShowModal(false);
				}}
			>
				<DemoOne text="Modal-0内容" />
			</GlobalModal>
		</Row>
	);
}

export default Company;
