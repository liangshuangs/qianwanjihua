
/*
 * @Anthor: liangshuang15
 * @Description:
 * @Date: 2022-07-27 18:08:28
 * @LastEditTime: 2022-09-07 17:31:00
 * @FilePath: /qianwanjihua/src/component/home/multirising.js
 */
import { Button, Table, Modal, Form, Input, message, InputNumber, DatePicker, Row, Col, Select } from 'antd';
import React, { useState } from 'react';
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api';
import 'moment/locale/zh-cn';
import AddOption from '../common/addOptions';
import EchartModal  from '../echartModal';

const Multirising = (props) => {
    const [form] = Form.useForm();
    const [data, setData] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [echartData, setEchartData] = useState({});
    const[loading, setloading] = useState(false);
    const [record, setRecord] = useState({});
    const columns = [
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
            title: '开始日期',
            dataIndex: 'startDate',
            key: 'startDate'
        },
        {
            title: '结束日期',
            dataIndex: 'endDate',
            key: 'endDate'
        },
        {
            title: '持续天数',
            dataIndex: 'lastDays',
            key: 'lastDays'
        },
        {
            title: '上涨次数',
            dataIndex: 'bigRisingCount',
            key: 'bigRisingCount',
        },
        {
            title: '第一天价格',
            dataIndex: 'firstDayPrice',
            key: 'firstDayPrice',
        },
        {
            title: '启动价',
            dataIndex: 'startPrice',
            key: 'startPrice',
        },
        {
            title: '结束价',
            dataIndex: 'endPrice',
            key: 'endPrice',
        },
        {
            title: '操作',
            dataIndex: 'opration',
            key: 'opration',
            render: (_, record) => {
                return (
                    <AddOption record={record} type="multirising"/>
                )
            }
        }
    ];
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
    const onFinish = (values) => {
        const params = {
            url: api.multirising,
            params: {
                ...values
            }
        }
        setloading(true);
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
    const closeEchartModal = () => {
        setIsModalVisible(false);
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
                    <Col span={6}>
                        <Form.Item
                            label="开始天数"
                            name="startDay"
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="结束天数"
                            name="endDay"
                        >
                            <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="上涨前天数"
                            name="preDays"
                        >
                           <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="忽略近期已看天数"
                            name="ignoreViewDays"
                        >
                            <InputNumber style={{ width: 100, textAlign: 'center' }} placeholder="忽略近期已看天数" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={24}>
                    <Col span={8}>
                        <Form.Item
                            label="从低位涨幅"
                        >
                            <Input.Group compact>
                                <Form.Item name="minRisingRateFormLowest">
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
                                <Form.Item name="maxRisingRateFormLowest">
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
                    <Col span={6}>
                        <Form.Item
                            label="最大涨幅"
                            name="maxRisingRate"
                        >
                           <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={6}>
                        <Form.Item
                            label="最小涨幅"
                            name="minRisingRate"
                        >
                           <InputNumber />
                        </Form.Item>
                    </Col>
                    <Col span={4}>
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
                        onDoubleClick: event => {handleClickRow(record)}, // 点击行
                    };
                  }}
                scroll={{
                    y:480,
                }}
            />
            <EchartModal closeEchartModal={closeEchartModal} record={record} echartData={echartData} rowData={data} visible={isModalVisible}>
                <AddOption record={record} type="multirising"/>
            </EchartModal>    
        </div>
    )
};
export default Multirising;