/*
 * @Anthor: liangshuang15
 * @Description: 
 * @Date: 2022-07-27 16:38:32
 * @LastEditTime: 2022-08-26 13:32:09
 * @FilePath: /qianwanjihua/src/component/home/DaDieHuiSheng.js
 */
import { Button, Table, Modal, Form, Input, message, InputNumber, DatePicker, Row, Col, Select } from 'antd';
import React, { useState } from 'react';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import Echart from './echart';
import AddOption from '../common/addOptions';
const { RangePicker } = DatePicker;
const { Option } = Select;

const DaDieHuiSheng = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [echartData, setEchartData] = useState({});
    const [loading, setloading] = useState(false);
    const [record, setRecord] = useState({});
    const columns = [
        {
            title: '日期',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: '代码',
            dataIndex: 'code',
            key: 'code'
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '当天收盘价',
            dataIndex: 'closingPrice',
            key: 'closingPrice'
        },
        {
            title: '当天涨幅',
            dataIndex: 'risingRate',
            key: 'risingRate'
        },
        {
            title: '收复天数',
            dataIndex: 'recoverDays',
            key: 'recoverDays'
        },
        {
            title: '距上次记录天数',
            dataIndex: 'lastRecoverDays',
            key: 'lastRecoverDays',
        },
        {
            title: '涨幅',
            dataIndex: 'recentRisingRate',
            key: 'recentRisingRate',
        },
        {
            title: '收复日期',
            dataIndex: 'recoverDate',
            key: 'recoverDate',
        },
        {
            title: '收复前22天',
            dataIndex: 'beforeRecoverDay22',
            key: 'beforeRecoverDay22',
        },
        {
            title: '操作',
            dataIndex: 'opration',
            key: 'opration',
            render: (_, record) => {
                return (
                    <AddOption record={record} type="recover" />
                )
            }
        }
    ]
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
                setIsModalVisible(true);

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
            console.log(index)
            if (item.code === currentRecordCode) {
                nextIndex = index + 1;
            }
        });
        console.log(nextIndex, data.length)
        if (nextIndex >= data.length) {
            message.error('最后一个啦');
            return;
        }
        let nextRecord = data[nextIndex];
        handleClickRow(nextRecord);
    }
    const onFinish = (values) => {
        const params = {
            url: api.dadiehuisheng,
            params: {
                ...values,
                startTime: values.date && values.date[0].format('yyyy-MM-DD'),
                endTime: values.date && values.date[1].format('yyyy-MM-DD')
            }
        }
        setloading(true)
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                const data = res.data.data;
                setData(data);
                setloading(false);
            } else {
                setloading(false);
                message.error(res.data.msg || '失败');
            }
        });
    }
    return (
        <div>
            <Form
                name="advanced_search"
                form={form}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="日期"
                            name="date"
                        >
                            <RangePicker locale={locale} />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="忽略近期已看天数"
                            name="ignoreViewDays"
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="上涨前跌幅"
                            name="fallRate"
                        >
                            <Input />
                            {/* <Select
                                placeholder="选择上涨前跌幅"
                                allowClear
                            >
                                <Option value="-15">-15</Option>
                                <Option value="-30">-30</Option>
                            </Select> */}
                        </Form.Item>
                    </Col>

                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="从低位涨幅"
                        >
                            <Input.Group compact>
                                <Form.Item name="minRisingRate">
                                    <InputNumber style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
                                </Form.Item>
                                <Input
                                    className="site-input-split"
                                    style={{
                                        width: 30,
                                        borderLeft: 0,
                                        borderRight: 0,
                                        pointerEvents: 'none',
                                    }}
                                    placeholder="~"
                                    disabled
                                />
                                <Form.Item name="maxRisingRate">
                                    <InputNumber
                                        className="site-input-right"
                                        style={{
                                            width: 100,
                                            textAlign: 'center',
                                        }}
                                        placeholder="Maximum"
                                    />
                                </Form.Item>

                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item
                            label="收复天数"
                        >
                            <Input.Group compact>
                                <Form.Item name="minRecoverDays">
                                    <InputNumber style={{ width: 100, textAlign: 'center' }} placeholder="Minimum" />
                                </Form.Item>

                                <Input
                                    className="site-input-split"
                                    style={{
                                        width: 30,
                                        borderLeft: 0,
                                        borderRight: 0,
                                        pointerEvents: 'none',
                                    }}
                                    placeholder="~"
                                    disabled
                                />
                                <Form.Item name="maxRecoverDays">
                                    <InputNumber
                                        className="site-input-right"
                                        style={{
                                            width: 100,
                                            textAlign: 'center',
                                        }}
                                        placeholder="Maximum"
                                    />
                                </Form.Item>
                            </Input.Group>
                        </Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
            <Table
                columns={columns}
                dataSource={data}
                loading={loading}
                onRow={record => {
                    return {
                        onDoubleClick: event => { handleClickRow(record) }, // 点击行
                    };
                }}
                scroll={{
                    y: 480,
                }}
            />
            <Modal
                title={record.name}
                visible={isModalVisible}
                onOk={() => setIsModalVisible(false)}
                onCancel={() => setIsModalVisible(false)}
                footer={null}
                maskClosable={false}
                width="80%"
            >
                <div className='echart'>
                    <div onClick={handleLeft}><LeftOutlined style={{ fontSize: '24px' }}/></div>
                    <div className='echart-container'>
                        <Echart echartData={echartData} rowData={data} currentRecord={record} />
                    </div>
                    <div onClick={handleRight}><RightOutlined style={{ fontSize: '24px' }}/></div>
                </div> 
            </Modal>
        </div>
    )
}
export default DaDieHuiSheng;