import React, { useState, useEffect } from 'react';
import { Button, Cascader, DatePicker, message, Form } from 'antd';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
import moment from 'moment'
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api'
import Echart from './echart.js';

const { RangePicker } = DatePicker;
const KlinePattern = (props) => {
    const [form] = Form.useForm();
    const [options, setOptions] = useState(
        [{
            value: '',
            label: '',
            isLeaf: false,
        }]
    );
    const [echartData, setEchartData] = useState([]);
    const onFinish = (values) => {
        const params = {
            url: api.getKline,
            params: {
                code: values.gupiaocode[1],
                startTime: values.kdate[0].format('yyyy-MM-DD'),
                endTime: values.kdate[1].format('yyyy-MM-DD')
            }
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                const data = res.data.data;
                setEchartData(data);
            } else {
                message.error(res.data.msg || '失败');
            }
        });
    }
    const handleAddGuPiao = () => {
        const values = form.getFieldsValue() || {};
        const gupiaocode = values.gupiaocode[1];
        const params = {
            url: api.addZixuan,
            params: {
                code: gupiaocode
            }
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                message.success('添加成功');
            } else {
                message.error(res.data.msg || '失败');
            }
        });
    }
    useEffect(() => {
        getklinepattern();
        form.setFieldsValue({
            kdate: [moment().startOf('year'), moment()],
            date: [moment().startOf('year'), moment()]
        });
    }, [])
    const getklinepattern = () => {
        const params = {
            url: api.getklinepattern,
            params: {
            }
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                const data = res.data.data;
                data.map(item => {
                    item.label = item.name
                    item.isLeaf = false
                });
                setOptions(res.data.data);
            } else {
                message.error(res.data.msg || '失败');
            }
        });
    }
    const handlePickerChange = (dates, dateStrings) => {
    }
    const filter = (inputValue, path) => path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    const loadData = (selectedOptions) => {
        const targetOption = selectedOptions[selectedOptions.length - 1];
        const values = form.getFieldsValue() || {};
        targetOption.loading = true; // load options lazily
        const params = {
            url: api.searchList,
            params: {
                searchName: targetOption.value,
                startTime: values?.date[0],
                endTime: values?.date[1]
            }
        }
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                targetOption.loading = false;
                const data = res.data.data;
                data.map(item => {
                    item.label = item.name
                    item.value = item.code
                    item.isLeaf = true
                });
                targetOption.children = data;
                setOptions([...options]);
            } else {
                message.error(res.data.msg || '失败');
            }
        });
    }
    
    return (
        <div>
            <Form
                        name="basic"
                        form={form}
                        layout="inline"
                        labelCol={{ span: 6 }}
                        wrapperCol={{ span: 20 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="日期"
                            name="date"
                            initialValues={[moment().startOf('year'), moment()]}
                            rules={[{ required: true, message: '请选择日期!' }]}
                        >
                            <RangePicker locale={locale} onChange={handlePickerChange} />
                        </Form.Item>

                        <Form.Item
                            label="股票"
                            name="gupiaocode"
                            rules={[{ required: true, message: '请选择股票!' }]}
                        >
                        <Cascader
                            options={options}
                            loadData={loadData}
                            placeholder="Please select"
                            showSearch={{
                                filter,
                            }}
                            onSearch={(value) => console.log(value)}
                        />
                </Form.Item>
                        <Form.Item
                            label="K线日期"
                            name="kdate"
                        >
                    <RangePicker
                        locale={locale}
                        onChange={handlePickerChange}
                    />
                        </Form.Item>
                        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                            <Button type="primary" htmlType="submit">
                                查询
                            </Button>   
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button onClick={handleAddGuPiao}>
                                添加自选
                            </Button>   
                        </Form.Item>
            </Form>
            <br />
            <div className="echart">
                {echartData.length ? <Echart echartData={echartData}/> : ''}
            </div>
        </div>
    )
}
export default KlinePattern;