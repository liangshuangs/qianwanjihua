import React from 'react';
import { Table, Modal, Button, Popconfirm, Typography, message } from 'antd';
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api';
import AddJiaoyi from './addJiaoyi.js';
import Jiaoyi from './jiaoyi.js';
import AddPlan from './addPlan.js';
import './index.css';

class Jihua extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            pageSize: 20,
            total: 0,
            transactionplanTotal: 0,
            page: 1,
            transactionplanPage: 1,
            isModalVisible: false,
            isModalVisibleAdd: false, // 新增交易计划弹窗
            isModalVisibleAddPlan: false, // 新增交易计划太难吃
            jihuaData: [],
            planId: 0,
            currenPlan: {}, // 当前编辑的计划
            jihuacolumns: [
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
                    title: '买入价',
                    dataIndex: 'startPrice',
                    key: 'startPrice',
                },
                {
                    title: '止损价',
                    dataIndex: 'cleanUpPrice',
                    key: 'cleanUpPrice',
                },
                {
                    title: '现价',
                    dataIndex: 'currentPrice',
                    key: 'currentPrice',
                },
                {
                    title: '总投入',
                    dataIndex: 'totalInvestAmount',
                    key: 'totalInvestAmount',
                },
                {
                    title: '分批投入',
                    dataIndex: 'planBatchAmount',
                    key: 'planBatchAmount',
                },
                {
                    title: '活动投入',
                    dataIndex: 'planActiveAmount',
                    key: 'planActiveAmount',
                },
                {
                    title: '已分批投入',
                    dataIndex: 'usedBatchAmount',
                    key: 'usedBatchAmount',
                },
                {
                    title: '已活动投入',
                    dataIndex: 'usedActiveAmount',
                    key: 'usedActiveAmount',
                },
                {
                    title: '已总投入',
                    dataIndex: 'usedTotalAmount',
                    key: 'usedTotalAmount',
                },
                {
                    title: '状态',
                    dataIndex: 'status',
                    key: 'status',
                    render: (r_, record) => {
                        const s = +record.status;
                        if (s === 1) {
                            return '执行中';
                        } else if (s === 0) {
                            return '未开始'
                        } else if (s === 2) {
                            return '已经结束'
                        } else if (s === 3) {
                            return '已放弃'
                        }
                    }
                },
                {
                    title: '盈亏',
                    dataIndex: 'finallIncome',
                    key: 'finallIncome',
                },
                {
                    title: '操作',
                    dataIndex: 'opration',
                    key: 'opration',
                    render: (r_, record) => {
                        const s = +record.status;
                        if (window.location.hash === '#/jihuahistory') {
                            return ''
                        };
                        if (s === 1) {
                            // 开始状态
                            return (
                                <Popconfirm title="是否确认结束?" onConfirm={() => {this.handleEndPlan(record)}}>
                                        <a>结束</a>
                                </Popconfirm>
                                )
                        } else if (s === 0) {
                            // 未开始状态
                            return (
                                <span>
                                    <Typography.Link
                                        onClick={() => this.handleStartPlan(record)}
                                        style={{
                                            marginRight: 4,
                                        }}
                                    >
                                        启动
                                    </Typography.Link>
                                    <Typography.Link
                                        onClick={() => this.handleEditPlan(record)}
                                        style={{
                                            marginRight: 4,
                                        }}
                                    >
                                        编辑
                                    </Typography.Link>
                                    <Popconfirm title="是否确认删除?" onConfirm={() => {this.handleDelPlan(record)}}>
                                        <a>删除</a>
                                    </Popconfirm>
                                </span>
                                
                            )
                        } else if (s === 2) {
                            // 已经结束
                            return (
                                <Popconfirm title="是否确认删除?" onConfirm={() => {this.handleDelPlan(record)}}>
                                    <a>删除</a>
                                </Popconfirm>
                                )
                        } else if (s === 3) {
                            // 已放弃
                            return (
                                <Popconfirm title="是否确认删除?" onConfirm={() => {this.handleDelPlan(record)}}>
                                <a>删除</a>
                            </Popconfirm>)
                        }
                    }
                }
            ]
        }
    }
    componentWillMount() {
        this.getList();
    }
    // 结束计划
    handleEndPlan = (record) => {
        const params = {
            url: api.endPlan,
            params: {
                id: record.id
            }   
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                this.getList();
                message.success('成功');
            } else {
                message.error(res.data.msg || '失败');
            }
        })
    }
    // 删除计划
    handleDelPlan = (record) => {
        const params = {
            url: api.delePlan,
            params: {
                id: record.id
            }   
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                this.getList();
                message.success('删除成功');
            } else {
                message.error(res.data.msg || '删除失败');
            }
        })
    }
    // 启动计划
    handleStartPlan = (record) => {
        const params = {
            url: api.startPlan,
            params: {
                id: record.id
            }   
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                this.getList();
                message.success('启动成功');
            } else {
                message.error(res.data.msg || '启动失败');
            }
        })
    }
    // 获取投资计划数据
    getList = () => {
        const params = {
            url: api.touzijihua,
            params: {
                page: this.state.page,
            pageSize: this.state.pageSize
            }   
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                const data = res.data.data;
                this.setState({
                    data: data.list,
                    total: data.totalSize
                })
            } else {
                message.error(res.data.msg || '获取接口失败');
            }
        })
    }
    // 获取交易计划数据
    getjiaoyiList = (planId) => {
        planId = planId || this.state.planId;
        const params = {
            url: api.transactionplan,
            params: {
                page: this.state.transactionplanPage,
                pageSize: this.state.pageSize,
                planId
            }   
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                const data = res.data.data;
                this.setState({
                    jihuaData: data.list,
                    transactionplanTotal: data.totalSize,
                    planId: planId
                })
            } else {
                message.error(res.data.msg || '获取接口失败');
            }
        })
    }
    handleChangePage = (page) => {
        this.setState({ page }, () => {
            this.getList();
        })
    }
    handleJiaoyihangePage = (page) => {
        this.setState({ transactionplanPage: page }, () => {
            this.getjiaoyiList();
        })
    }
    handleRowClick(e, record) {
        this.getjiaoyiList(record.id);
        this.setState({
            isModalVisible: true
        })
    }
    handleCancel = () => {
        this.setState({
            isModalVisible: false,
            transactionplanPage: 1
        })
    }
    handleOk = () => {
        this.setState({
            isModalVisible: false,
            transactionplanPage: 1
        })
    }
    handleAddModalOk = () => {
        this.setState({
            isModalVisibleAdd: false
        })
    }
    // 添加交易计划
    handleAdd() {
        this.setState({
            isModalVisibleAdd: true
        })
    }
    // 修改投资计划
    handleEditPlan = (record) => {
        this.setState({
            isModalVisibleAddPlan: true,
            currenPlan: record
        })
    }
    render() {
        const { data, pageSize, total,
            isModalVisible, jihuaData,
            transactionplanTotal, isModalVisibleAdd,
            planId, isModalVisibleAddPlan,
            jihuacolumns,
            currenPlan
        } = this.state;
        return (
            <div>
                {!(window.location.hash === '#/jihuahistory') ? 
                    <Button type="primary" onClick={() => this.setState({isModalVisibleAddPlan: true})}>
                        新增 {window.location.hash}
                    </Button> : ''
                }
                
                <Table
                    columns={jihuacolumns}
                    scroll={{
                        y: 540,
                      }}
                dataSource={data}
                pagination={{ pageSize, total, onChange: this.handleChangePage }}
                onRow={record => {
                    return {
                      onClick: event => {}, // 点击行
                      onDoubleClick: event => {this.handleRowClick(event, record)},
                      onContextMenu: event => {},
                      onMouseEnter: event => {}, // 鼠标移入行
                      onMouseLeave: event => {},
                    };
                  }}
                />
                <Modal
                    title="交易计划"
                    visible={isModalVisible}
                    onOk={() => this.handleOk()}
                    onCancel={() => this.handleCancel()}
                    width="80%"
                >
                    {!(window.location.hash === '#/jihuahistory') ? 
                    <Button type="primary" onClick={() => this.handleAdd()}>
                    新增
                    </Button> : ''
                }
                    
                    <Jiaoyi
                        dataSource={jihuaData}
                        pageSize={pageSize}
                        planId={planId}
                        transactionplanTotal={transactionplanTotal}
                        onChange={this.handleJiaoyihangePage}
                        getjiaoyiList={this.getjiaoyiList}
                    />
                </Modal>
                <Modal
                    title="新增交易计划"
                    visible={isModalVisibleAdd}
                    onOk={() => this.handleAddModalOk()}
                    onCancel={() => this.handleAddModalOk()}
                    footer={null}
                    width="50%"
                >
                    <AddJiaoyi
                        planId={planId}
                        getjiaoyiList={this.getjiaoyiList}
                        closeModal={() => {this.setState({isModalVisibleAdd: false})}}
                    />
                </Modal>
                <Modal
                    title="新增投资计划"
                    visible={isModalVisibleAddPlan}
                    onOk={() => this.setState({isModalVisibleAddPlan: false})}
                    onCancel={() => this.setState({isModalVisibleAddPlan: false})}
                    footer={null}
                    width="50%"
                >
                    <AddPlan
                        planId={planId}
                        onOk={() => this.setState({ isModalVisibleAddPlan: false })}
                        getList={this.getList}
                        currenPlan={currenPlan}
                    />
                </Modal>
                
            </div>
        )
    }
}
export default Jihua;