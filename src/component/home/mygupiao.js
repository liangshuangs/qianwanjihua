import React, { useState, useEffect } from 'react';
import { Table, Modal, Button, Form, Select, InputNumber, message, DatePicker } from 'antd';
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api';
import Jiaoyi from './jiaoyi.js';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment'
const { Option } = Select;
const MyGuPiao = (props) => {
    const [form] = Form.useForm();
    const columns = [
        {
            title: '序号',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: '股票',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '现价',
            dataIndex: 'closing_price',
            key: 'closing_price'
        },
        {
            title: '持股',
            dataIndex: 'hold_num',
            key: 'hold_num'
        },
        {
            title: '市值',
            dataIndex: 'cost_price',
            key: 'cost_price',
            width: 120
        },
        {
            title: '盈亏',
            dataIndex: 'income',
            key: 'income',
            width: 120,
        },
        {
            title: '盈亏比例',
            dataIndex: 'income_percent',
            key: 'income_percent',
            width: 120,
            render: (r_, record) => {
                if (record.income_percent) {
                    return `${record.income_percent}%`
                }
            }
        },
        {
            title: '5日价',
            dataIndex: 'day5',
            key: 'day5',
        },
        {
            title: '10日价',
            dataIndex: 'day10',
            key: 'day10',
        },
        {
            title: '20日价',
            dataIndex: 'day20',
            key: 'day20',
        },
        {
            title: '30日价',
            dataIndex: 'day30',
            key: 'day30',
        },
        {
            title: '5日价天数',
            dataIndex: 'day5_num',
            key: 'day5_num',
            onCell: ((record, rowIndex) => {
                if (+record.day5_num >= 0) {
                    return {
                        style: {
                            backgroundColor: 'red',
                          }
                    }
                };
                return {
                    style: {
                        backgroundColor: 'green'
                      }
                }  
            })
        },
        {
            title: '10日价天数',
            dataIndex: 'day10_num',
            key: 'day10_num',
            onCell: ((record, rowIndex) => {
                if (+record.day10_num >= 0) {
                    return {
                        style: {
                            backgroundColor: 'red',
                          }
                    }
                };
                return {
                    style: {
                        backgroundColor: 'green'
                      }
                }  
            })
        },
        {
            title: '20日价天数',
            dataIndex: 'day20_num',
            key: 'day20_num',
            onCell: ((record, rowIndex) => {
                if (+record.day10_num >= 0) {
                    return {
                        style: {
                            backgroundColor: 'red',
                          }
                    }
                };
                return {
                    style: {
                        backgroundColor: 'green'
                      }
                }  
            })
        },
    ]
    const [ tableData, setTableData ] = useState([]);
    const [ page, setPage ] = useState(1);
    const [ totalSize, setTotalSize ] = useState(1);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isShowJiaoyiModal, setisShowJiaoyiModal] = useState(false);
    const [planId, setplanId] = useState(null);
    const [jihuaData, setjihuaData] = useState([]);
    const [transactionplanTotal, settransactionplanTotal] = useState(0);
    const [transactionplanPage, settransactionplanPage] = useState(1);
    const [jiaoyiid, setjiaoyiid] = useState(null);
    useEffect(() => {
        getList();
    }, [])
    const getList = () => {
        const params = {
            url: api.getHoldGuPiao,
            params: {
                page: page || 1,
                pageSize: 20
            }
        };
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                const data = res.data.data;
                const list = data.list || [];
                setTableData(list);
                setTotalSize(data.totalSize);
            } else {
                message.error(res.data.msg || '获取接口失败');
            }
        })
    }
    const handleClickRow = (record) => {
        setisShowJiaoyiModal(true);
        setplanId(record.id);
        getjiaoyiList(record.id);
    }
    const onFinish = (values) => {
        values.transactionDate = values.transactionDate.format('yyyy-MM-DD');
        // values.id = jiaoyiid;
        values.transactionPlanId = jiaoyiid;
        const params = {
            url: api.startJiaoyi,
            params: values
        };
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                message.success('启动交易成功');
                setIsModalVisible(false)
            } else {
                message.error(res.data.msg || '获取接口失败');
            }
        })
    }
    // 获取交易计划数据
    const getjiaoyiList = (id) => {
        const params = {
            url: api.transactionplan,
            params: {
                page: transactionplanPage,
                pageSize: 20,
                planId: id || planId
            }   
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                const data = res.data.data;
                setjihuaData(data.list);
                settransactionplanTotal(data.totalSize);
            } else {
                message.error(res.data.msg || '获取接口失败');
            }
        })
    }
    const handleJiaoyihangePage = (page) => {
        settransactionplanPage(page);
        this.getjiaoyiList();
    }
    // 启动交易
    const handleStartJiaoyi = (id) => {
        setIsModalVisible(true);
        setjiaoyiid(id);
    }
    return (
        <div>
            <Table
                columns={columns}
                dataSource={tableData}
                scroll={{
                    y: 540,
                }}
                onRow={record => {
                    return {
                        onDoubleClick: event => {handleClickRow(record)}, // 点击行
                    };
                  }}
            />

                <Modal
                    title="交易计划"
                    visible={isShowJiaoyiModal}
                    onOk={() => setisShowJiaoyiModal(false)}
                    onCancel={() => setisShowJiaoyiModal(false)}
                    width="80%"
                >
                    <Jiaoyi
                        dataSource={jihuaData}
                        pageSize='20'
                        planId={planId}
                        transactionplanTotal={transactionplanTotal}
                        onChange={handleJiaoyihangePage}
                        getjiaoyiList={getjiaoyiList}
                        type="chigu"
                        start={handleStartJiaoyi}
                    />
                </Modal>

            <Modal
                    title="启动交易"
                    visible={isModalVisible}
                    onOk={() => setIsModalVisible(false)}
                    onCancel={() => setIsModalVisible(false)}
                    width="50%"
                >
                <Form
                        from={form}
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="交易类型"
                            name="transactionType"
                            rules={[{ required: true, message: '请输入交易类型!' }]}
                        >
                            <Select
                                    placeholder="选择投资类型"
                                    allowClear
                                    >
                                    <Option value="1">买入</Option>
                                    <Option value="2">卖出</Option>
                                </Select>
                        </Form.Item>

                        <Form.Item
                            label="交易时间"
                            name="transactionDate"
                            rules={[{ required: true, message: '请输入交易时间!' }]}
                        >
                        <DatePicker showTime={true} locale={locale}/>
                        </Form.Item>
                        <Form.Item
                            label="交易价格"
                            name="transactionPrice"
                            rules={[{ required: true, message: '请输入交易价格!' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item
                            label="交易数量"
                            name="transactionNum"
                            rules={[{ required: true, message: '请输入交易数量!' }]}
                        >
                            <InputNumber />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                            提交
                            </Button>
                        </Form.Item>
                    </Form>
                </Modal>
        </div>
    )
}
export default MyGuPiao;