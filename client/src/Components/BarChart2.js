import React from 'react'
import { useState } from 'react';
import { Bar } from 'react-chartjs-2'
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'chart.js';
// import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';

Chart.register(ChartStreaming);


function BarChart2() {

    //Nomination Call:
    //Only storing two peices of data for simple testing
    let [returnedNomData, setReturnedNomData] = useState({ VOLUMEOUT: '' })
    // const [returnedNomData, setReturnedNomData] = useState([]);
    const getNoms = async (url) => {
        let newNomData = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
            },

        }).then(function (response) {
            // console.log(response);
            return response.json();

        }).then(function (data) {
            console.log(data.recordset)
            return data.recordset
            // console.log(data.recordset[0]['VOLUMEOUT'])
            // return data.recordset[0]['VOLUMEOUT']
        });

        // console.log(newNomData.recordsets[0][1]['PT_NUM'])
        setReturnedNomData(newNomData)

        // const setReturnedNomData = (newNomData.recordset)
        console.log(returnedNomData);
        //     // setReturnedNomData(newNomData.recordset) - this method works
        // return setReturnedNomData(newNomData.data.recordset[0]);
        return returnedNomData;
    };

    const map1 = returnedNomData.map(x => x);

    console.log(map1);

    // const [fetchedNoms] = useState({
    const myChart = ({
        labels: ['Mon', 'Tue', 'Wed'],
        datasets: [{
            label: ["GAS"],
            data: [returnedNomData, returnedNomData, returnedNomData],
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
            ],
            borderColor: "blue",
            borderWidth: 2,

        }]

    })
    // console.log(fetchedNoms)
    console.log(myChart);

    return (
        <div>
            <h4>Nominations Chart</h4>

            <button className='btn btn-primary mb-2' onClick={() => getNoms('./noms')}>Click me to get Nominations</button>
            {/* <Bar data={fetchedNoms} /> */}
            {/* <Bar data={fetchedNoms} /> */}
            <Bar data={myChart} />

        </div>


    )
}

export default BarChart2

