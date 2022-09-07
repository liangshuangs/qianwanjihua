import React, { useState, useEffect } from 'react';
import { Table, Modal, message, Tabs, Popconfirm } from 'antd';
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api';
import EchartModal  from '../echartModal';
const { TabPane } = Tabs;
const MyZiXuan = (props) => {
  useEffect(() => {
    getZiXuanTab();
  }, [])
  const [data, setData] = useState([]);
  const [TabData, setTabData] = useState([]);
  const [Tag, setTag] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [echartData, setEchartData] = useState({});
  const [record, setRecord] = useState({});
  const getList = (tag) => {
    const tagValue = tag || Tag;
    const params = {
      url: api.getZixuan,
      params: {
        tag: tagValue
      }
    }
    fetchService(params).then(res => {
      if (res?.data?.code === 0) {
        const data = res.data.data;
        setData(data)
      } else {
        message.error(res.data.msg || '失败');
      }
    });
  }
  const getZiXuanTab = () => {
    const params = {
      url: api.getZiXuanTab,
      params: {}
    }
    fetchService(params).then(res => {
      if (res?.data?.code === 0) {
        const data = res.data.data;
        const handleData = [];
        data.map(item => {
          const i = {};
          if (item === 'recover') {
            i.name = '大跌回升';
          } else if (item === 'multirising') {
            i.name = '连续上涨';
          } else if (item === 'atferbigrising') {
            i.name = '大阳不跌';
          }
          i.key = item;
          handleData.push(i);
        })
        setTabData(handleData);
        getList(data[0]);
        setTag(data[0]);
      } else {
        message.error(res.data.msg || '失败');
      }
    });
  }
  const columns = [
    {
      title: '添加日期',
      dataIndex: 'date',
      key: 'date',
    },
    {
      title: '股票名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '股票代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '操作',
      dataIndex: 'opration',
      key: 'opration',
      render: (_, record) => {
          return (
              <div>
                  <Popconfirm title="是否确认取消?" onConfirm={() => handleDel(record.id)}>
                        <a>删除</a>
                  </Popconfirm>
              </div>
          )
      }
  }
  ]
  const handleDel = (id) => {
    const params = {
      url: api.deleteZiXuan,
      params: {
        id
      }
    }
    fetchService(params).then(res => {
      if (res?.data?.code === 0) {
        message.success('删除成功');
        getList();
      } else {
        message.error(res.data.msg || '失败');
      }
    });
  }
  const handleClickRow = (record) => {
    const params = {
      url: api.getKline,
      params: {
        code: record.code
      }
    }
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
  const closeEchartModal = () => {
    setIsModalVisible(false);
  }
  const onChange = (key) => {
    setTag(key);
    getList(key);
  }
  let listResult = TabData.map(function (value, key) {
    return <TabPane tab={value.name} key={value.key}></TabPane>
    })
  return (
    <div>
      <Tabs onChange={onChange} defaultActiveKey={Tag}>
        {listResult}
      </Tabs>
      <Table
        columns={columns}
        dataSource={data}
        onRow={record => {
          return {
            onDoubleClick: event => { handleClickRow(record) }, // 点击行
          };
        }}
      />
      <EchartModal closeEchartModal={closeEchartModal} record={record} echartData={echartData} rowData={data} visible={isModalVisible}/>
    </div>
  )
}
export default MyZiXuan;