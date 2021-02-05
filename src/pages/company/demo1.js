import React from 'react';
import { Empty, Button } from 'antd';
import styles from './index.less';
import CardPage from '@/components/CardPage';
import GlobalModal from '@/components/ViewModal';

function DemoOne(props) {
	const [showModal, setShowModal] = React.useState(false);

	React.useEffect(() => {
        
    }, []);

	const onClick = () => {
		setShowModal(true);
	};

	return (
		<div className={styles.box}>
			<CardPage
				title="测试标题"
				footer={
					<Button onClick={onClick} type="danger">底部GLOBALMODAL-1</Button>
				}
			>
				{props.text}
			</CardPage>
			<GlobalModal
				index={0}
				closeAll={true}
				showModal={showModal}
				// onClose={() => {
				// 	setShowModal(false);
				// }}
			>
				<div className={styles.box}>
					<Empty description={'Modal-1内容'} imageStyle={{marginTop: '20vh'}}/>
				</div>
			</GlobalModal>
		</div>
	);
}

export default DemoOne;
