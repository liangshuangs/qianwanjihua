export const jihuacolumns = [
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
            if (s === 1) {
                // 开始状态
                return '空仓';
            } else if (s === 0) {
                // 未开始状态
                return '启动 删除'
            } else if (s === 2) {
                // 已经结束
                return '删除'
            } else if (s === 3) {
                // 已放弃
                return '删除'
            }
        }
    }
]

