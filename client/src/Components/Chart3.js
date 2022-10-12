import React from 'react'
import { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2'
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
    const [returnedNomData, setReturnedNomData] = useState({})

    //State for handling Meter Number data:
    const [returnedMeter, setMeterData] = useState({})

    //State for returning DAILY_VOL from the Meter data:
    const [returnedFuel, setFuelData] = useState('')

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
                setReturnedNomData(data.recordsets)
            });
        fetch('./gas_meters')
            .then(response => {
                return response.json();
            })
            .then(gasMeters => {
                setIsLoading(false)
                // for (let index = 0; index < gasMeters.recordsets.length; index++) {
                //     const meterNo = gasMeters.recordsets[index][2]['METERNO'];
                //     setMeterData(meterNo)
                // };
                for (const forEachMeter of gasMeters.recordsets[0]) {
                    // console.log(forEachMeter)
                    setMeterData(forEachMeter)
                }
                for (const forEachFuel of gasMeters.recordsets[0]) {
                    // console.log(forEachMeter)
                    setFuelData(forEachFuel)
                }
                // setMeterData(gasMeters.recordsets[0])
                //This version displays one meter number:
                // for (let index = 0; index < gasMeters.recordsets.length; index++) {
                //     const meterNo = gasMeters.recordsets[index][2]['METERNO'];
                //     setMeterData(meterNo)
                // }
            });

    }, []);
    console.log(returnedMeter)
    console.log(returnedFuel);
    if (isLoading) {
        return <p>Loading....</p>
    }

    //Map const to experiment:



    //Pulldown menu with measure point API call:
    const handleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value)
    }
    const options = [
        { value: '', text: 'Select Meter' },
        {
            value: [returnedMeter.METERNO], text: [returnedMeter.METERNO]
            // value: [returnedMeter.METERNO], text: [returnedMeter.METERNO]
        },
    ];

    //Chart:
    const myChart3 = ({
        labels: ['Volume In', 'Daily Volume'],
        datasets: [{
            label: ['Meter Point Data'],
            data: [returnedMeter.ENERGY, returnedMeter.DAILY_VOL],
            // data: [returnedNomData[2].VOLUMEIN, returnedNomData[2].VOLUMEOUT, options.text],
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
    // console.log(myChart3)
    console.log(returnedNomData);
    return (
        <div className='mt-2 p-2'>
            <select className='m-3' value={selected} onChange={handleChange}>
                {options.map(option => (
                    <option key={option.text} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>

            <Bar data={myChart3} />

            {/* <button className='btn btn-primary mt-2' onClick={() => getNoms('./noms')}>Click me to get Nominations</button> */}

        </div>
    )
}

export default PieChart3
