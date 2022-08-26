import React from 'react';
import { Layout, Menu, Table } from 'antd';
const columns = [
    {
        title: '序号',
        dataIndex: 'id',
        key: 'id',
    },
    {
        title: '股票',
        dataIndex: 'gupiao',
        key: 'gupiao',
    },
    {
        title: '买入价',
        dataIndex: 'buy',
        key: 'buy',
    },
    {
        title: '止损价',
        dataIndex: 'zhisun',
        key: 'zhisun',
    },
    {
        title: '现价',
        dataIndex: 'xianjia',
        key: 'xianjia',
    },
    {
        title: '总投入',
        dataIndex: 'zongtouru',
        key: 'zongtouru',
    },
    {
        title: '分批投入',
        dataIndex: 'fenpitouru',
        key: 'fenpitouru',
    },
    {
        title: '活动投入',
        dataIndex: 'huodongtouru',
        key: 'huodongtouru',
    },
    {
        title: '已分批投入',
        dataIndex: 'yifenpitouru',
        key: 'yifenpitouru',
    },
    {
        title: '已活动投入',
        dataIndex: 'yihuodongtouru',
        key: 'yihuodongtouru',
    },
    {
        title: '已总投入',
        dataIndex: 'yizongtouru',
        key: 'yizongtouru',
    },
    {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
    },
    {
        title: '盈亏',
        dataIndex: 'yingkui',
        key: 'yingkui',
    }
]
const data = [];
class Test extends React.Component {
    render() {
        return (
            <div>
                test
            </div>
        )
    }
}
export default Test;