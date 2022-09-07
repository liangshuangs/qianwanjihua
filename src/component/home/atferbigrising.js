/*
 * @Anthor: liangshuang15
 * @Description:
 * @Date: 2022-07-27 18:08:28
 * @LastEditTime: 2022-09-07 17:29:54
 * @FilePath: /qianwanjihua/src/component/home/atferbigrising.js
 */
import { Button, Table, Modal, Form, Input, message, InputNumber, Row, Col } from 'antd';
import React, { useState } from 'react';
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api';
import AddOption from '../common/addOptions';
import 'moment/locale/zh-cn';
import EchartModal  from '../echartModal';

const Atferbigrising = (props) => {
  const [form] = Form.useForm();
  const [data, setData] = useState('');
  const[loading, setloading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [echartData, setEchartData] = useState({});
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
      title: '大涨次数',
      dataIndex: 'bigRisingCount',
      key: 'bigRisingCount'
    },
    {
      title: '第一天价格',
      dataIndex: 'firstDayPrice',
      key: 'firstDayPrice'
    },
    {
      title: '启动价',
      dataIndex: 'startPrice',
      key: 'startPrice',
    },
    {
      title: '上涨后最低价',
      dataIndex: 'recentMinPrice',
      key: 'recentMinPrice',
    },
    {
      title: '上涨后最高价',
      dataIndex: 'recentMaxPrice',
      key: 'recentMaxPrice',
    },
    {
      title: '操作',
      dataIndex: 'opration',
      key: 'opration',
      render: (_, record) => {
        return (
          <AddOption record={record} type="atferbigrising" />
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
  const onFinish = (values) => {
    const params = {
      url: api.atferbigrising,
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
              label="上涨前天数"
              name="preDays"
            >
              <InputNumber />
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
          <Col span={8}>
            <Form.Item
              label="忽略近期已看天数"
              name="ignoreViewDays"
            >
              <InputNumber style={{ width: 100, textAlign: 'center' }} placeholder="忽略近期已看天数" />
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
      <EchartModal record={record} echartData={echartData} rowData={data} visible={isModalVisible} closeEchartModal={closeEchartModal}>
      	<AddOption record={record} type="atferbigrising" />
      </EchartModal>
    </div>
  )
};
export default Atferbigrising;