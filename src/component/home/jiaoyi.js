import { Table, Form, Input, Typography, Popconfirm, InputNumber, message } from 'antd';
import React, { useState } from 'react';
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api';

const Jiaoyi = (props) => {
  const [data, setData] = useState([]);
    const [editingKey, setEditingKey] = useState('');
    const [form] = Form.useForm();
    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps
      }) => {
        const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
        return (
          <td {...restProps}>
            {editing ? (
              <Form.Item
                name={dataIndex}
                style={{
                  margin: 0,
                }}
                rules={[
                  {
                    required: true,
                    message: `Please Input ${title}!`,
                  },
                ]}
              >
                {inputNode}
              </Form.Item>
            ) : (
              children
            )}
          </td>
        );
      };
  const jiaoyijihuaColumns = () => {
    const col1 = [
      {
          title: '序号',
          dataIndex: 'id',
          key: 'id',
      },
      {
          title: '名称',
          dataIndex: 'name',
          key: 'name',
          editable: true,
      },
      {
          title: '买入价',
          dataIndex: 'planPurchasePrice',
          key: 'planPurchasePrice',
          editable: true,
      },
      {
          title: '清仓价',
          dataIndex: 'planCleanupPrice',
          key: 'planCleanupPrice',
          editable: true,
      },
      {
          title: '计划金额',
          dataIndex: 'planPurchaseAmount',
          key: 'planPurchaseAmount',
          editable: true,
      },
      {
          title: '计划持股',
          dataIndex: 'planPurchaseNum',
          key: 'planPurchaseNum',
          editable: true,
      },
      {
          title: '使用金额',
          dataIndex: 'usedPlanAmount',
          key: 'usedPlanAmount',
      },
      {
          title: '持股',
          dataIndex: 'holdStockNum',
          key: 'holdStockNum',
      },
      {
          title: '成本价',
          dataIndex: 'holdStockAvgPrice',
          key: 'holdStockAvgPrice',
      },
      {
          title: '盈亏',
          dataIndex: 'incomeAmount',
          key: 'incomeAmount',
      },
      
    ]
    const col2 = [
        {
            title: '操作',
            dataIndex: 'opration',
            key: 'opration',
            render: (_, record) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                      <Typography.Link
                        onClick={() => save(record.id)}
                        style={{
                          marginRight: 8,
                        }}
                      >
                        保存
                      </Typography.Link>
                      <Popconfirm title="是否确认取消?" onConfirm={cancel}>
                        <a>取消</a>
                      </Popconfirm>
                    </span>
                ) : (
                    <div>
                        <Typography.Link onClick={() => startJiaoyiPlan(record)}>
                          启动
                        </Typography.Link>
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Typography.Link onClick={() => edit(record)}>
                            修改
                        </Typography.Link>
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <Popconfirm title="是否确认删除?" onConfirm={() => handleDel(record)}>
                        <a>删除</a>
                      </Popconfirm>
                    </div>
                  );
            }
        },
    ]
      const col3 = [
          {
            title: '操作',
            dataIndex: 'opration2',
              key: 'opration2',
              render: (_, record) => {
                  return (
                    <Typography.Link
                        onClick={() => startJiaoYi(record.id)}
                        style={{
                        marginRight: 8,
                        }}
                    >
                    交易
                </Typography.Link>
                    )
              }
        }
      ];
      if (window.location.hash === '#/gupiaohistory' || window.location.hash === '#/jihuahistory') {
          return col1;
      }
      if (props.type === 'chigu') {
        return [...col1, ...col3];
    } else {
        return [...col1, ...col2];
      }
      
  }
  
    // 启动交易计划
  const startJiaoyiPlan = (record) => {
      const params = {
        url: api.startTransactionplan,
        params: {
          id: record.id
        }
      }
      fetchService(params).then(res => {
          if (res?.data?.code === 0) {
              props.getjiaoyiList();
              message.success('启动成功');
          } else {
            message.error(res.data.msg || '启动成功失败');
          }
      });
  }
    const save = async (id) => {
        try {
            const row = await form.validateFields();
            row.id = id;
            row.planId = props.planId;
            const newData = [...props.dataSource];
            const index = newData.findIndex((item) => id === item.id);
            const item = newData[index];
            newData.splice(index, 1, { ...item, ...row });
            setData(newData);
            saveFn(row);
          } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
          }
    }
    const saveFn = (values) => {
        const params = {
            url: api.addTransctionPlan,
            params: values
        }
      fetchService(params).then(res => {
          if (res?.data?.code === 0) {
              props.getjiaoyiList();
              message.success('保存成功');
              setEditingKey('');
          } else {
            message.error(res.data.msg || '保存失败');
          }
        });
    }
    const cancel = () => {
      setEditingKey('');
    }
    // 启动交易
    const startJiaoYi = (id) => {
        if (props.start !== undefined) {
            props.start(id);
        }

    }
  const handleDel = (record) => {
      const params = {
        url: api.delTransactionplan,
        params: {
          id: record.id
        }
      };
    fetchService(params).then(res => {
        if (res?.data?.code === 0) {
          props.getjiaoyiList();
          message.success('删除成功');
        } else {
          message.error(res.data.msg || '删除失败');
        }
      });
    }
    const edit = (record) => {
        form.setFieldsValue({
            ...record,
        });
        setEditingKey(record.id);
    }
    const handleJiaoyihangePage = (page) => {
        if (props.onChange !== undefined) {
            props.onChange(page);
        };
    }
    const isEditing = (record) => record.id === editingKey;
    const mergedColumns = jiaoyijihuaColumns().map(col => {
        if (!col.editable) {
            return col;
        };
        return {
            ...col,
            onCell: (record) => ({
              record,
              inputType: 'text',
              dataIndex: col.dataIndex,
              title: col.title,
              editing: isEditing(record),
            }),
          };
    })
    return (
        <Form form={form} component={false}>
            <Table 
                components={{
                    body: {
                      cell: EditableCell,
                    },
                  }}
                columns={mergedColumns}
                dataSource={props.dataSource}
                pagination={{
                    pageSize: props.pageSize,
                    total: props.transactionplanTotal,
                    onChange: handleJiaoyihangePage
                }}
            />
        </Form>
    )
}

export default Jiaoyi;