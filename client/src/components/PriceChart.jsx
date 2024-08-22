import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import 'chartjs-adapter-date-fns';
import axios from 'axios';

const PriceChart = (props) => {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null);

    const [data, setData] = useState([]);

    useEffect(() => {
        if(props.data){
            setData(props.data);
        }
        else{
            const now = Math.floor(Date.now() / 1000);
            const vs_currency = 'usd';
            const from = now - (7 * 24 * 60 * 60);
            const to = now;
            const url = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart/range?vs_currency=${vs_currency}&from=${from}&to=${to}`;
            console.log(new Date(from)); // Logs the date 7 days ago
            console.log(new Date(to)); // Logs the current date
            axios.get(url, {}).then((response) => {
                if(response.status === 200){
                    setData(response.data.prices);
                }
            }).catch((error) => {

            });
        }
    }, [props.coin]);

    const dummyData = [
        { date: '2023-01-01', price: 100 },
        { date: '2023-01-02', price: 105 },
        { date: '2023-01-03', price: 102 },
        { date: '2023-01-04', price: 110 },
        { date: '2023-01-05', price: 108 },
        { date: '2023-01-06', price: 115 },
        { date: '2023-01-07', price: 120 },
    ];

    useEffect(() => {
        const ctx = chartRef.current.getContext('2d');

        // Destroy the previous chart instance if it exists
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        // Create a new chart instance
        chartInstanceRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: data.map(item => new Date(item[0])),
                datasets: [{
                    label: 'Price',
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

        // Cleanup function to destroy the chart when the component unmounts
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