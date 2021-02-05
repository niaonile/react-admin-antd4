import React from 'react';
import styles from './index.less';
import { InputNumber, Space, Button, Modal, Typography } from 'antd';
import { RedoOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

let timer = null;
const allPerson = "张三, 李四, 陈五, 王六, 蔡七, 赖八";
const remainPerson = allPerson.toString().split(",");

function TenderFunctionOne() {
    const [status, setStatus] = React.useState(true);
    const [luckyData, setLuckyData] = React.useState([]);
    const [luckyDrawNum, setLuckyDrawNum] = React.useState(1);
    const [luckyDrawing, setLuckyDrawing] = React.useState('张三');

    const handleChange = (e) => {
        let value = e.target.value ? e.target.value : 1;
        console.log(value);
        setLuckyDrawNum(value);
    };
    
    const handleStart = () => {
        if(status) {
            setStatus(false);
        } else {
            setStatus(true);
            // 随机中奖人
            let randomPerson = getRandomArray(remainPerson, luckyDrawNum);
            // 剩余人数剔除已抽中名单

            // 中奖人员
            setLuckyData((data) => {
                let newData = data.concat(randomPerson);
                return newData;
            });
            // 清除定时函数
            clearInterval(timer);
        }
    };

    const handleReset = () => {
        Modal.confirm({
            title: '确认重置吗？',
            icon: <ExclamationCircleOutlined />,
            okText: '确定',
            cancelText: '取消',
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };

    const GetRandomNum = (Min, Max) => {
        var Range = Max - Min;
        var Rand = Math.random();
        return (Min + Math.round(Rand * Range));
    }

    const getRandomArray = (arr, count) => {
        var shuffled = arr.slice(0),
            i = arr.length,
            min = i - count,
            temp, index;
        while (i-- > min) {
            index = Math.floor((i + 1) * Math.random());
            temp = shuffled[index];
            shuffled[index] = shuffled[i];
            shuffled[i] = temp;
        }
        return shuffled.slice(min);
    }

    React.useEffect(() => {
        if(!status) { 
            // 计时器控制
            const interTime = 30;
            timer = setInterval(() => {
                let i = GetRandomNum(0, remainPerson.length);
                setLuckyDrawing(remainPerson[i]);
            }, interTime);
        }
        return () => clearInterval(timer);
    }, [status]);

	return (
		<div className={styles.container}>
			<div className={styles.top}>
                <Typography className={styles.title}>
                    <Typography.Title>汾河谷大数据服务器招标</Typography.Title>
                    <Typography.Paragraph>汾河谷大数据致力于数据服务……</Typography.Paragraph>
                </Typography>
                <div className={styles.mainBox}>
                    <div 
                        className={styles.list}
                        style={{
                            fontSize: '2.4rem'
                        }}
                    >
                        {status ? luckyData.map((item, i) => {
                            return <span key={i}>{item}</span>
                        }) : (
                            <span>{luckyDrawing}</span>
                        )}
                    </div>
                </div>
            </div>
            <div className={styles.bottom}>
                <Space align="baseline">
                    <InputNumber min={1} max={10} placeholder="请输入中标数" onChange={handleChange}/>
                    <Button type="primary" onClick={handleStart}>{status ? '开始' : '停止'}</Button>
                    <Button type="primary" onClick={handleReset} shape="circle" icon={<RedoOutlined />} />
                </Space>
            </div>
		</div>
	);
}

export default TenderFunctionOne;
