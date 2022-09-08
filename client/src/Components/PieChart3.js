import React from 'react'
import { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2'
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'chart.js';
// import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';


Chart.register(ChartStreaming);


function PieChart3() {

    //State for handling loading:
    const [isLoading, setIsLoading] = useState(true)
    //State for handling nomData:
    const [returnedNomData, setReturnedNomData] = useState([])

    //State for handling Meter Data:
    const [returnedMeter, setMeterData] = useState([])

    //Customer pulldown menu:
    const [selected, setSelected] = useState("Select Customer");

    //useEffect to restrict code from going into an infinite loop
    useEffect(() => {
        setIsLoading(true)
        fetch('./noms')
            .then(response => {
                return response.json();

            })
            .then(data => {
                setIsLoading(false)
                setReturnedNomData(data.recordsets[0])
            });
        fetch('./measure_points')
            .then(response => {
                return response.json();
            })
            .then(measurePoints => {
                setIsLoading(false)
                setMeterData(measurePoints.recordsets[0][1])
            })
    }, []);
    if (isLoading) {
        return <p>Loading....</p>
    }

    //Pulldown menu with measure point API call:
    const handleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value)
    }
    const options = [
        { value: 'Select Customer', text: 'Select Customer' },
        {
            value: [returnedMeter], text: "KRIEBEL MINERALS INC"
        },

    ];

    //Chart:
    const myChart3 = ({
        labels: ['Volume In', 'End Imbalance', 'Net End Imbalance'],
        datasets: [{
            label: ['Nominations'],
            data: [returnedNomData[2].VOLUMEIN, returnedNomData[2].VOLUMEOUT, returnedNomData[2].END_IMBAL],
            //nomData: [returnedVolData, returnedVolData, returnedVolData],
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
    console.log(myChart3)


    return (
        <div className='mt-2 p-2'>
            <select className='m-3' value={selected} onChange={handleChange}>
                {options.map(option => (
                    <option key={option.text} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
            {/* <p>{returnedNomData}</p> */}
            <Pie data={myChart3} />
            {/* <button className='btn btn-primary mt-2' onClick={() => getNoms('./noms')}>Click me to get Nominations</button> */}

        </div>
    )
}

export default PieChart3
