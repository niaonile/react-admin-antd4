import React from 'react';
import { connect } from 'dva';
import { Table, Form, Input, InputNumber, Select, Space, Popconfirm, Typography } from 'antd';

const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
	  	console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
	},
	getCheckboxProps: (record) => ({
		name: record.name,
	}),
};

const EditableTable = (props) => {
    const [form] = Form.useForm();
	const [data, setData] = React.useState(props.data);
	const [disabled, setDisabled] = React.useState(false);
	const [editingKey, setEditingKey] = React.useState('');

	React.useEffect(() => {
		setData(props.data);
	}, [props.data]);

    const isEditing = (record) => record.key === editingKey;

	const columns = [
		{
			title: '招标名称',
			dataIndex: 'name',
			editable: true,
			render: (text) => <a>{text}</a>
		},
		{
			title: '招标数量',
			dataIndex: 'num',
			editable: true,
		},
		{
			title: '投标公司',
			dataIndex: 'address',
			editable: true,
		},
		{
			title: '设置',
			dataIndex: 'lucky',
			editable: true,
			render: (text) => <span>{text && text.join(',')}</span>
		},
		{
			title: '操作',
			dataIndex: 'operation',
			render: (_, record) => {
				const editable = isEditing(record);
				return editable ? (
					<span>
						<a
							onClick={() => save(record.key)}
							style={{
								marginRight: 8,
							}}
						>
							保存
						</a>
						<Popconfirm title="确认取消?" onConfirm={cancel}>
							<a>取消</a>
						</Popconfirm>
					</span>
				) : (
					<Space size="middle">
						<Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
							编辑
						</Typography.Link>
						<Typography.Link onClick={() => goToDraw('/tenderFunctionOne')}>
							随机抽取
						</Typography.Link>
					</Space>
				);
			},
		},
	];

	const mergedColumns = columns.map((col) => {
		if (!col.editable) {
		  	return col;
		}
	
		return {
			...col,
			onCell: (record) => ({
				record,
				inputType: col.dataIndex === 'num' ? 'number' : 'text',
				dataIndex: col.dataIndex,
				title: col.title,
				editing: isEditing(record),
			}),
		};
	});

	const EditableCell = ({
		editing,
		dataIndex,
		title,
		inputType,
		record,
		children,
		...restProps
	}) => {
		let inputNode = inputType === 'number' ? <InputNumber min={1} onChange={(value) => {
			save(record.key, false);
			console.log(`InputNumber `, value, record, data);
		}}/> : <Input />;

		if(dataIndex === 'lucky') {
			let s = record['address'].split(',');
			inputNode = <Select mode="multiple" showArrow allowClear onChange={(value) => {
				if(value) {
					console.log(`selected `, value);
					setDisabled(value.length >= record.num);
				}
			}}>
				{s.map((item) => {
					return <Select.Option disabled={disabled} key={item}>{item}</Select.Option>
				})}
			</Select>
		}

		return (
			<td {...restProps}>
				{editing ? (
					<Form.Item
						name={dataIndex}
						style={{
							margin: 0,
						}}
						rules={[
							{
								required: true,
								message: `Please Input ${title}!`,
							},
						]}
					>
						{inputNode}
					</Form.Item>
				) : (
					children
				)}
			</td>
		);
    };
    
    const goToDraw = (url) => {
		let origin = window.location.origin;
		window.open(origin + url, '_blank');
	};

	const save = async (key, isClear = true) => {
		try {
			const row = await form.validateFields();
			const newData = [...data];
			const index = newData.findIndex((item) => key === item.key);
		
			if (index > -1) {
				const item = newData[index];
				newData.splice(index, 1, { ...item, ...row });
				setData(newData);
				if(isClear) setEditingKey('');
			} else {
				newData.push(row);
				setData(newData);
				if(isClear) setEditingKey('');
			}
		} catch (errInfo) {
		  	console.log('Validate Failed:', errInfo);
		}
	};

	const edit = (record) => {
		form.setFieldsValue({
			name: '',
			num: '',
			address: '',
			...record,
		});
		setEditingKey(record.key);
	};

	const cancel = () => {
		setEditingKey('');
	};

    return (
        <Form form={form} component={false}>
            <Table
                bordered
                components={{
                    body: {
                        cell: EditableCell,
                    },
                }}
                rowSelection={{
                    type: 'radio',
                    ...rowSelection,
                }}
                columns={mergedColumns}
                dataSource={data}
            />
        </Form>
    )
};

export default connect((state) => {
	return { ...state.home };
})(EditableTable);