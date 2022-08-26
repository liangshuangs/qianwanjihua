/*
 * @Anthor: liangshuang15
 * @Description: 
 * @Date: 2022-07-29 16:39:29
 * @LastEditTime: 2022-07-29 17:14:32
 * @FilePath: /qianwanjihua/src/component/common/addOptions.js
 */
import { Button, Input, Form, message, DatePicker, Modal, Typography } from 'antd';
import React, { useState } from 'react';
import { fetchService } from '../../fetch/fetchService';
import { api } from '../../fetch/api';
import 'moment/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/zh_CN';
const { TextArea } = Input;

const AddOption = (props) => {
    const [form] = Form.useForm();
    const [isIgnoreModalVisible, setIgnoreModalVisible] = useState(false);
    const handleAdd = () => {
        const params = {
            url: api.addZixuan,
            params: {
                code: props.record.code,
                tag: props.type
            }
        };
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                message.success('添加成功');
            } else {
                message.error(res.data.msg || '失败');
            }
        });
    }
    const handleIgnore = () => {
        setIgnoreModalVisible(true);
    }
    const onFinish = (values) => {
        const params = {
            url: api.viewignore,
            params: {
                code: props.record.code,
                content: values.content || '',
                expireDate: values.expireDate && values.expireDate.format('yyyy-MM-DD')
            }
        };
        fetchService(params).then(res => {
            if (res?.data?.code === 0) {
                message.success('添加成功');
                setIgnoreModalVisible(false);
            } else {
                message.error(res.data.msg || '失败');
            }
        });
    }
    return (
        <div>
            <Typography.Link onClick={() => handleAdd()}>
                自选
            </Typography.Link>
            &nbsp;&nbsp;
            <Typography.Link onClick={() => handleIgnore()}>
                忽略
            </Typography.Link>
            <Modal
                title={"添加忽略--" + (props.record.name)}
                visible={isIgnoreModalVisible}
                onOk={() => setIgnoreModalVisible(false)}
                onCancel={() => setIgnoreModalVisible(false)}
                footer={null}
                maskClosable={false}
                width="40%"
            >
                <Form
                    name="advanced_search"
                    form={form}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <Form.Item
                        label="过期日期"
                        name="expireDate"
                    >
                        <DatePicker locale={locale} />
                    </Form.Item>
                    <Form.Item
                        label="备注"
                        name="content"
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            添加忽略
                        </Button>
                    </Form.Item>
            </Form>
        </Modal>
        </div >

    )
}
export default AddOption;