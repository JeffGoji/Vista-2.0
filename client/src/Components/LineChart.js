import React from 'react'
import { Line } from 'react-chartjs-2'

function LineChart({ chartData }) {

    return (

        <Line data={chartData} id="chart" />
    )

}

export default LineChart