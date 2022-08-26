import {  Button, Form, Input, Select, InputNumber, message } from 'antd';
import React from 'react';
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api';
import { useEffect, useState } from 'react';
const { Option } = Select;
const AddPlan = (props) => {
    const [form] = Form.useForm();
    const [cols, setCols] = useState([]);
    const onFinish = (values) => {
        const params = {
            url: api.savePlan,
            params: {
                ...values,
                id: props.currenPlan.id
            }
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                message.success('添加成功');
                props.onOk();
                props.getList();
            } else {
                message.error(res.data.msg || '启添加失败');
            }
        });
    }
    useEffect(() => {
        
        if (props.currenPlan && props.currenPlan.id) {
            const cols = [...items];
            setCols(cols);
            form.setFieldsValue({
                ...props.currenPlan
            });
        } else {
            const cols = [...planName, ...items];
            setCols(cols);
        }
        
    }, [])
    const items = [
        {
            type: 'Input',
            label: '股票代码',
            name: 'code'
        },
        {
            type: 'Input',
            label: '股票名称',
            name: 'name'
        },
        {
            type: 'InputNumber',
            label: '买入价',
            name: 'startPrice'
        },
        {
            type: 'InputNumber',
            label: '清仓价',
            name: 'cleanUpPrice'
        },
        {
            type: 'Select',
            label: '投资类型',
            name: 'peroidType'
        },
        {
            type: 'InputNumber',
            label: '天数',
            name: 'peroidDays'
        },
        {
            type: 'InputNumber',
            label: '计划总投入',
            name: 'totalInvestAmount'
        },
        {
            type: 'InputNumber',
            label: '分批投入',
            name: 'planBatchAmount'
        },
        {
            type: 'InputNumber',
            label: '分批数',
            name: 'planBatches'
        },
        {
            type: 'InputNumber',
            label: '活动资金',
            name: 'planActiveAmount'
        },
        {
            type: 'Input',
            label: '预期收益',
            name: 'expectIncome'
        },
        {
            type: 'Input',
            label: '接受最大损失',
            name: 'acceptMaxLost'
        },
        {
            type: 'Input',
            label: '投资理由',
            name: 'planReason'
        },
    ];
    const planName = [{
        type: 'Input',
        label: '计划名称',
        name: 'planName'
    }];
    return (
        <div>
            <Form
                        form={form}
                        name="basic"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 16 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
            >
                {cols.map(col => {
                    return (
                        <Form.Item
                        label={col.label}
                        name={col.name}
                        rules={[{ required: true, message: `请输入${col.name}!` }]}
                    >
                            {col.type === 'Input'
                                ? <Input /> :
                                (col.type === 'InputNumber' ? <InputNumber /> :
                                <Select
                                    placeholder="选择投资类型"
                                    allowClear
                                    >
                                    <Option value="1">短期</Option>
                                    <Option value="2">短期</Option>
                                </Select>
                                 )}
                    </Form.Item>
                    )
                })}
                        
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                </Form.Item>
            </Form> 
        </div>
    )
}
export default AddPlan;