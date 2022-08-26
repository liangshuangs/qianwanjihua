/*
 * @Anthor: liangshuang15
 * @Description: 
 * @Date: 2022-08-26 13:53:09
 * @LastEditTime: 2022-08-26 14:29:46
 * @FilePath: /qianwanjihua/src/component/echartModal/index.js
 */
import { Modal, message } from 'antd';
import React, { useState, useEffect } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api';
import Echart from '../home/echart';

const EchartModal = (props) => {
    const [record, setRecord] = useState(props.record);
    const [visible, setVisible] = useState(props.visible);
    const [data, setData] = useState(props.rowData);
    const [echartData, setEchartData] = useState(props.echartData);
    useEffect(() => {
        setRecord(props.record);
        setVisible(props.visible);
        setData(props.rowData);
        setEchartData(props.echartData);
    }, [props.visible, props.record, props.rowData, props.echartData]);

    const handleClickRow = (record) => {
        const params = {
            url: api.getKline,
            params: {
                code: record.code
            }
        };
        setRecord(record);
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                const data = res.data.data;
                setEchartData(data);
                setVisible(true);

            } else {
                message.error(res.data.msg || '失败');
            }
        });
    }
    const handleLeft = () => {
        const currentRecordCode = record.code;
        let preIndex = 0;
        data.map((item, index) => {
            if (item.code === currentRecordCode) {
                preIndex = index - 1;
            }
        });
        if (preIndex < 0) {
            message.error('已经是第一个啦');
            return;
        };
        let nextRecord = data[preIndex];
        handleClickRow(nextRecord);
    }
    const handleRight = () => {
        const currentRecordCode = record.code;
        let nextIndex = 0;
        data.map((item, index) => {
            if (item.code === currentRecordCode) {
                nextIndex = index + 1;
            }
        });
        if (nextIndex >= data.length) {
            message.error('最后一个啦');
            return;
        }
        let nextRecord = data[nextIndex];
        handleClickRow(nextRecord);
    }
    return(
        <Modal
                title={record.name}
                visible={visible}
                onOk={() => setVisible(false)}
                onCancel={() => setVisible(false)}
                footer={null}
                maskClosable={false}
                width="80%"
            >
                <div className='echart'>
                    <div onClick={handleLeft}><LeftOutlined style={{ fontSize: '24px' }}/></div>
                    <div className='echart-container'>
                        <Echart echartData={echartData} />
                    </div>
                    <div onClick={handleRight}><RightOutlined style={{ fontSize: '24px' }}/></div>
                </div> 
            </Modal>
    );
}
export default EchartModal;