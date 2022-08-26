/*
 * @Anthor: liangshuang15
 * @Description: 
 * @Date: 2022-08-01 19:39:36
 * @LastEditTime: 2022-08-05 19:05:21
 * @FilePath: /qianwanjihua/src/component/home/subecharts.js
 */
import React, { useState, useEffect } from 'react';
let handleEchartData = [];
const SubEcharts = (props) => {
    useEffect(() => {
        const {echarts, echartsData} = props;
        if (echartsData.echartData) {
            updateEcharts(echarts, echartsData.echartData);
        }
    })
    const updateEcharts = (echarts, echartsData = []) => {
        const dates = hanldeDates(echartsData);
        const data = handleData(echartsData);
        const option = handleOptions(dates, data);
        console.log(option, '--')
        handleEchartData = option;
        echarts && echarts.setOption(option);
    }
    const calculateMA = (dayCount, data) => {
        var result = [];
        for (var i = 0, len = data.length; i < len; i++) {
            if (i < dayCount) {
                result.push('-');
                continue;
            }
            var sum = 0;
            for (var j = 0; j < dayCount; j++) {
                sum += +data[i - j][1];
            }
            result.push(sum / dayCount);
        }
        return result;
    }
    const hanldeDates = (rawData = []) => {
        const dates = rawData.map(item => {
            return item[0];
        });
        return dates;
    }
    const handleData = (rawData = []) => {
        const data = rawData.map(function (item) {
            return [+item[1], +item[2], +item[3], +item[4]];
        });
        return data;
    }
    const calculateRate = (data = []) => {
        const idx = data.dataIndex;
       const preIdx = idx ? idx - 1 : 0;;
       const preData = handleEchartData.series[0].data;
        const preDataClosePrice = preData[preIdx][1];
        const currentDataClosePrice = data.value[2];
        const rate = ((currentDataClosePrice - preDataClosePrice) / preDataClosePrice * 100).toFixed(2);
        let rateHtml = `涨&nbsp;&nbsp;幅：<span style= 'color: #f33'>${rate}% </span> <br />`;
        if (rate < 0) {
            rateHtml = `涨&nbsp;&nbsp;幅：<span style= 'color: #00af5a'>${rate}% </span> <br />`;
        }
        let str = `日&nbsp;&nbsp;期: ${data.name} <br />`;
        str += rateHtml;
        str += `开盘价：${data.value[1]}  <br />`;
        str += `收盘价：${data.value[2]}  <br />`;
        str += `最低价：${data.value[3]}  <br />`;
        str += `最高价：${data.value[4]}  <br />`;
        return str;
    }
    const handleOptions = (dates, data) => {
        const option = {
            legend: {
                data: ['日K', 'MA5', 'MA10', 'MA20'],
                inactiveColor: '#777'
            },
            grid: {
                left: '10%',
                right: '10%',
                bottom: '15%'
              },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    animation: false,
                    type: 'cross',
                    lineStyle: {
                        color: '#376df4',
                        width: 2,
                        opacity: 1
                    }
                },
                formatter: function (param) {
                    return  calculateRate(param[0]);
                }
            },
            xAxis: {
                type: 'category',
                data: dates,
                axisLine: { lineStyle: { color: '#8392A5' } }
            },
            yAxis: {
                scale: true,
                axisLine: { lineStyle: { color: '#8392A5' } },
                splitLine: { show: false }
            },
            dataZoom: [
                {
                    xAxisIndex: [0, 1],
                    textStyle: {
                        color: '#8392A5'
                    },
                    start: 70,
                    handleIcon:
                        'path://M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                    dataBackground: {
                        areaStyle: {
                            color: '#8392A5'
                        },
                        lineStyle: {
                            opacity: 0.8,
                            color: '#8392A5'
                        }
                    },
                    brushSelect: true,
                },
                {
                    type: 'inside'
                }
            ],
            series: [
                {
                    type: 'candlestick',
                    name: 'Day',
                    data: data,
                    itemStyle: {
                        color: '#fff',
                        color0: '#00af5a',
                        borderColor: '#F33',
                        borderColor0: '#00af5a'
                    }
                },
                {
                    name: 'MA5',
                    type: 'line',
                    data: calculateMA(5, data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'MA10',
                    type: 'line',
                    data: calculateMA(10, data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 1
                    }
                },
                {
                    name: 'MA20',
                    type: 'line',
                    data: calculateMA(20, data),
                    smooth: true,
                    showSymbol: false,
                    lineStyle: {
                        width: 1
                    }
                }
            ]
        };
        return option;
    }
    return (
        <div>
        </div>
    )
};
export default SubEcharts;