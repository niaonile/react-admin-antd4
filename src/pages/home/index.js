import React from 'react';
import { connect } from 'dva';
import styles from './index.less';
import CreateForm from './createForm';
import EditableTable from './editableTable';
import DemoTwo from '../company/demo2';
import GlobalModal from '@/components/ViewModal';
import { Form, Row, Col, Input, Button } from 'antd';

function Home(props) {
	const {data, dispatch} = props;
	const [form] = Form.useForm();
	const [visible, setVisible] = React.useState(false);
	const [showModal, setShowModal] = React.useState(false);

	const onFinish = (values) => {
		console.log('onFinish form: ', values);
	};

	const onCreate = (values) => {
		console.log('onCreate form: ', values);
		let newData = {
			key: new Date().getTime(),
			name: values.name,
			num: 1,
			address: values.users.reduce((res, item) => {
				if(res) res = res + ',';
				return res + item.first;
			}, '')
		};
		setVisible(false);
		dispatch({
			type: 'home/updateData',
			payload: {data: data.concat(newData)}
		})
	};

	return (
		<div>
			<Form
				form={form}
				name="advanced_search"
				className={styles.myForm}
				onFinish={onFinish}
			>
				<Row>
					<Col span={20}>
						<Row gutter={24}>
							<Col span={8}>
								<Form.Item
									name={`name`}
									label={`招标名称`}
								>
									<Input placeholder="请输入" />
								</Form.Item>
							</Col>	
						</Row>
					</Col>
					<Col
						span={4}
						style={{
							textAlign: 'right',
						}}
					>
						<Button type="primary" htmlType="submit">
							查询
						</Button>
						<Button
							style={{
								marginLeft: 8,
							}}
							onClick={() => {
								form.resetFields();
							}}
						>
							重置
						</Button>
					</Col>
				</Row>
    		</Form>
			<div className={styles.buttonBox}>
				<Button type="primary" onClick={() => {
					setVisible(true);
				}}>
					新增
				</Button>
				<Button type="danger" onClick={() => {
					setShowModal(true);
				}}>
					测试弹窗
				</Button>
			</div>
			<EditableTable />
			<CreateForm 
				visible={visible}
				onCreate={onCreate}
				onCancel={() => {
				  	setVisible(false);
				}}
			/>
			<GlobalModal
				fixed="right"
				showModal={showModal}
				onClose={() => {
					setShowModal(false);
				}}
			>
				<DemoTwo text="Modal-home内容" />
			</GlobalModal>
		</div>
	);
}

export default connect((state) => {
	return { ...state.home };
})(Home);
