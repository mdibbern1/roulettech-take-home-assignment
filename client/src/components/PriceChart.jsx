import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

const PriceChart = (props) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const [data, setData] = useState([]);

    useEffect(() => {
        console.log(props.selectedCoin);
        if(props.data){
            setData(props.data);
        }
        else{
            const now = Math.floor(Date.now() / 1000);
            const vs_currency = 'usd';
            const from = now - (7 * 24 * 60 * 60);
            const to = now;
            const url = `https://api.coingecko.com/api/v3/coins/${props.selectedCoin.toLowerCase()}/market_chart/range?vs_currency=${vs_currency}&from=${from}&to=${to}`;
            axios.get(url, {}).then((response) => {
                if(response.status === 200){
                    setData(response.data.prices);
                }
            }).catch((error) => {

            });
        }
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
                    label: `${props.selectedCoin} Price`,
                    data: data.map(item => item[1]),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
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
        });

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [data]);

    return (
        <div>
            <canvas style={{height: '100px', width: '40px'}} ref={chartRef}></canvas>
        </div>
    );
}

export default PriceChart;