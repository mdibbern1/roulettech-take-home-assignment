import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

const PortfolioChart = (props) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const [data, setData] = useState([]);

    useEffect(() => {
        const quantity = props.userCoins.find(c => c.name.toLowerCase() === props.selectedCoin.toLowerCase()).quantity;
        const now = Math.floor(Date.now() / 1000);
        const vs_currency = 'usd';
        const from = now - (7 * 24 * 60 * 60);
        const to = now;
        const url = `https://api.coingecko.com/api/v3/coins/${props.selectedCoin.toLowerCase()}/market_chart/range?vs_currency=${vs_currency}&from=${from}&to=${to}`;
        axios.get(url, {}).then((response) => {
            if(response.status === 200){
                const temp = response.data.prices.map(price => [price[0], price[1] * quantity])
                console.log('temp: ', temp);
                setData(temp);
            }
        }).catch((error) => {

        });
    }, [props.selectedCoin]);

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        chartInstanceRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => new Date(item[0])),
                datasets: [{
                    label: `${props.selectedCoin} Price from Portfolio`,
                    data: data.map(item => item[1]),
                    borderColor: 'rgba(100, 205, 100, 1)',
                    backgroundColor: 'rgba(100, 205, 100, 0.2)',
                    fill: true,
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'time',
                        time: {
                            unit: 'day'
                        }
                    },
                    y: {
                        beginAtZero: false
                    }
                }
            }
        })

        return () => {
            if(chartInstanceRef.current){
                chartInstanceRef.current.destroy();
            }
        }

    }, [data]);

    return (
        <div>
            <canvas style={{height: '100px', width: '40px'}} ref={chartRef}></canvas>
        </div>
    )
}

export default PortfolioChart;