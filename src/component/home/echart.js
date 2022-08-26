/*
 * @Anthor: liangshuang15
 * @Description: 
 * @Date: 2022-02-23 17:21:29
 * @LastEditTime: 2022-08-25 21:05:21
 * @FilePath: /qianwanjihua/src/component/home/echart.js
 */
import React from 'react';
import * as echarts from 'echarts';
import SubEcharts from './subecharts';
export default class Echart extends React.Component {
	constructor(props) {
		super(props);
	}
	state = {
		echartsData: [],
		echarts: null,
		currentRecord: null
	}
	componentDidMount() {
		this.renderNewEcharts();
	}
	renderNewEcharts = () => {
		this.getEchartsInstance();
	}
	getEchartsInstance = () => {
		const myEcharts = echarts.init(document.getElementById('element'));
		this.setState({
			echarts: myEcharts
		})
	}
	static getDerivedStateFromProps(nextProps, state) {
		return {
			echartsData: nextProps
		}
	}
	render() {
		const { echartsData, echarts } = this.state;
		return (
			<div
				id="element" style={{ width: '100%', height: "500px" }}
			>
				< SubEcharts echartsData={echartsData} echarts={echarts} />
			</div>
			
		)
	}
}