import React from 'react';
import { Layout, Menu } from 'antd';
import {HashRouter, Routes, Route} from 'react-router-dom'
import Login from '../login/login.js';
import Jihua from '../home/jihua.js';
import MyGuPiao from './mygupiao.js';
import KlinePattern from './klinepattern.js';
import history from '../../utils/history.js';
import MyZiXuan from './myZiXuan.js';
import HoldGuPoao from '../history/holdGupiao';
import HoldPlan from '../history/holdPlan';
import DaDieHuiSheng from './DaDieHuiSheng.js';
import Multirising from './multirising';
import Atferbigrising from './atferbigrising';
import Ignore from './ignore';
import {
    AppstoreOutlined,
    PieChartOutlined,
  } from '@ant-design/icons';
// import Echart from './echart.js';
const { Content, Sider } = Layout;

function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
}
  
const items = [
    getItem('交易', 'sub1', <AppstoreOutlined />, [
        getItem('投资计划', '1'),
        getItem('持股', '2'),
      ]),
    getItem('选股', 'sub2', <PieChartOutlined />, [
      getItem('大跌回升', '7'),
      getItem('连续上涨', '8'),
      getItem('大阳不跌', '9'),
      getItem('K线图', '3'),
      getItem('自选股', '4'),
      getItem('忽略股票', '10'),
    ]),
    getItem('历史数据', 'sub3', <PieChartOutlined />, [
        getItem('历史计划', '5'),
        getItem('历史持股', '6'),
      ]),
  ];

class Home extends React.Component {
    constructor(props) {
        super(props)
    }
    onClick = (data) => {
        if (+data?.key === 1) {
            window.location.hash = '';
        } else if (+data?.key === 2) {
            window.location.hash = '/gupiao';
        } else if (+data?.key === 3) {
            window.location.hash = '/klinePattern';
        } else if (+data?.key === 4) {
            window.location.hash = '/zixuan';
        } else if (+data?.key === 5) {
            window.location.hash = '/jihuahistory';
        } else if (+data?.key === 6) {
            window.location.hash = '/gupiaohistory';
        } else if (+data?.key === 7) {
            window.location.hash = '/dadiehuisheng';
        } else if (+data?.key === 8) {
            window.location.hash = '/multirising';
        } else if (+data?.key === 9) {
            window.location.hash = '/atferbigrising';
        } else if (+data?.key === 10) {
            window.location.hash = '/ignore';
        }
    }
    render() {
        return (
            <Layout style={{ height: '100vh' }}>
                <Sider collapsible >
                    <Menu
                        defaultSelectedKeys={['1']}
                        defaultOpenKeys={['sub1']}
                        mode="inline"
                        theme="dark"
                        items={items}
                        onClick={(e) => this.onClick(e)}
                    />
                </Sider>
                <Layout className="site-layout">
                    <Content
                        className="site-layout-background"
                        style={{
                        margin: '24px 16px',
                        padding: 24,
                        minHeight: 600,
                        }}
                    >
                        <HashRouter history={history}>
                            <Routes>
                                <Route path='/' element={<Jihua></Jihua>} />
                                <Route path='/login' element={<Login></Login>} />
                                <Route path='/gupiao' element={<MyGuPiao></MyGuPiao>} />
                                <Route path='/klinePattern' element={<KlinePattern></KlinePattern>} />
                                <Route path='/zixuan' element={<MyZiXuan></MyZiXuan>} />
                                <Route path='/jihuahistory' element={<HoldPlan></HoldPlan>} />
                                <Route path='/gupiaohistory' element={<HoldGuPoao></HoldGuPoao>} />
                                <Route path='/dadiehuisheng' element={<DaDieHuiSheng></DaDieHuiSheng>} />
                                <Route path='/multirising' element={<Multirising></Multirising>} />
                                <Route path='/atferbigrising' element={<Atferbigrising></Atferbigrising>} />
                                <Route path='/ignore' element={<Ignore></Ignore>} />
                                
                            </Routes>
                        </HashRouter>
                    </Content>
                </Layout>
            </Layout>
        )
    }
}
export default Home;