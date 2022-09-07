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

    //Customer pulldown menu:
    const [selected, setSelected] = useState("Select Customer");

    const handleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value)
    }
    const options = [
        { value: '', text: 'Choose a Meter' },
        {
            value: '', text: 'Dynamic energy'
        }];

    //useEffect to restrict code from going into an infinite loop
    useEffect(() => {
        setIsLoading(true)
        fetch('./noms')
            .then(response => {
                return response.json();

            })
            .then(nomData => {
                setIsLoading(false)
                setReturnedNomData(nomData.recordsets[0])
            });
    }, []);
    if (isLoading) {
        return <p>Loading....</p>
    }

    const myChart3 = ({
        labels: ['Volumes'],
        datasets: [{
            label: ['Volumes DTL'],
            nomData: [returnedNomData[2]],
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
        <div>
            <select value={selected} onChange={handleChange}>
                {options.map(option => (
                    <option key={option.value} value={option.value}>
                        {option.text}
                    </option>
                ))}
            </select>
            <p>{returnedNomData}</p>
            <Pie nomData={myChart3} />
            {/* <button className='btn btn-primary mt-2' onClick={() => getNoms('./noms')}>Click me to get Nominations</button> */}

        </div>
    )
}

export default PieChart3
