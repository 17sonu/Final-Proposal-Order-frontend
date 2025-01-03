import React, { useState, useEffect } from "react";
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import './PMC-home.css';

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

function DashboardSummary() {

    const navigate = useNavigate(); 

    const [summary, setSummary] = useState({
        totalEstimates: 0,
        totalEstimateAmount: 0,
        totalSales: 0,
        totalSalesAmount: 0,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const estimatesResponse = await axios.get("");
                const salesResponse = await axios.get("");
                setSummary({
                    totalEstimates: estimatesResponse.data.totalEstimates,
                    totalEstimateAmount: estimatesResponse.data.totalAmount,
                    totalSales: salesResponse.data.totalSales,
                    totalSalesAmount: salesResponse.data.totalAmount,
                });
            } catch (error) {
                console.error("Error fetching summary:", error);
            }
        };
        fetchData();
    }, []);

    const handleViewEstimates = () => {
        navigate('/home/pmcallproposal'); // Navigate to Estimates page
    };

    const handleViewSales = () => {
        navigate('/home/pmcallorder'); // Navigate to Sales page
    };

    const handelCreateProposal = () => {
        navigate('/home/createpropasal'); // Navigate to Estimates page
    };

    const handelCreateOrder = () => {
        navigate('/createorder'); // Navigate to Estimates page
    };

    const chartData = {
        labels: ['Total No. of Proposals:', 'Total No. of Orders:'],
        datasets: [
            {
                data: [summary.totalEstimates || 10, summary.totalSales || 8],
                backgroundColor: (context) => {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;
                    if (!chartArea) return null; // If the chart is not ready
                    return createGradientColors(ctx, chartArea);
                },
                borderColor: ['rgb(14, 105, 72)', 'rgb(160, 21, 160)'],
                borderWidth: 1,
                hoverOffset: 12, // Pops out the hovered slice
            },
        ],
    };

    // Function to create gradients
    const createGradientColors = (ctx, chartArea) => {
        const width = chartArea.right - chartArea.left;
        const height = chartArea.bottom - chartArea.top;

        const gradient1 = ctx.createLinearGradient(0, 0, width, height);
        gradient1.addColorStop(0, '#43cea2');
        gradient1.addColorStop(1, '#185b9d73');

        const gradient2 = ctx.createLinearGradient(0, 0, width, height);
        gradient2.addColorStop(0, '#ff6fd8');
        gradient2.addColorStop(1, '#845ec287');

        return [gradient1, gradient2];
    };

    return (
        <div>
            <h1 className="dashboard-title">PMC Dashboard</h1>

            {/* Estimates Section */}
            <div className="section">
                <div className="glass-box">
                    <div className="arrow-box green">
                        <h2>PROPOSALS:</h2>
                    </div>
                    <div className="glass-card green1">
                        <p>Total No. of Proposals:</p>
                        <h3>{summary.totalEstimates || 10}</h3>
                    </div>
                    <button className="glass-card green3" onClick={handleViewEstimates}>
                        <p>View All Proposals...</p>                   
                    </button>
                </div>
            </div>

            {/* Sales Section */}
            <div className="section">
                <div className="glass-box">
                    <div className="arrow-box purple">
                        <h2>ORDERS:</h2>
                    </div>
                    <div className="glass-card purple1">
                        <p>Total No. of Orders:</p>
                        <h3>{summary.totalSales || 8}</h3>
                    </div>
                    <button className="glass-card purple3" onClick={handleViewSales}>
                        <p>View All Orders...</p>                   
                    </button>
                </div>
            </div>

            {/* Pie Chart Section */}
            <div className="section">
                <div className="glass-box2">
                    <Pie
                        data={chartData}
                        options={{
                            responsive: true,
                            plugins: {
                                legend: {
                                    position: 'top',
                                },
                                tooltip: {
                                    enabled: true,
                                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                    titleFont: {
                                        size: 16,
                                        weight: 'bold',
                                    },
                                    bodyFont: {
                                        size: 14,
                                    },
                                    bodyColor: '#ffffff',
                                    cornerRadius: 8,
                                    displayColors: false,
                                    callbacks: {
                                        label: (tooltipItem) => {
                                            return `${tooltipItem.raw}`;
                                        },
                                    },
                                },
                            },
                            hover: {
                                mode: 'nearest',
                                onHover: (event, chartElement) => {
                                    event.native.target.style.cursor = chartElement.length ? 'pointer' : 'default';
                                },
                            },
                            animation: {
                                animateScale: true,
                                animateRotate: true,
                            },
                        }}
                    />
                    <button className="glass-card2 green4" onClick={handelCreateProposal}>
                        <p>Create New Proposal</p>                   
                    </button>
                    <button className="glass-card2 purple4" onClick={handelCreateOrder}>
                        <p>Create New Order...</p>                   
                    </button>
                </div>
            </div>
        </div>
    );
}

export default DashboardSummary;
