import React from 'react'
import { useState, } from 'react'
import { Bar } from 'react-chartjs-2'
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'



function BarChart2() {
    //Nomination Call:
    //Only storing two peices of data for simple testing
    const [returnedNomData, setReturnedNomData] = useState({ VOLUMEIN: "200", VOLUMEOUT: `50` });

    const getNoms = async (url) => {
        const newNomData = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
            },

        })
            .then(res => res.json());
        console.log(newNomData);
        // console.log(returnedNomData); console log for testing
        //setReturnedNomData(newNomData.recordset) - this method works
        setReturnedNomData(newNomData.recordset[1])

    }



    const [fetchedNoms, setNomData] = useState({
        labels: returnedNomData.recordset,
        datasets: [{
            label: "Noms Chart",
            data: returnedNomData.recordset,
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
    });

    return (
        <div>

            <h4>Nominations Chart</h4>

            <button className='btn btn-primary mb-2' onClick={() => getNoms('./noms')}>Click me to get Nominations</button>
            <Bar data={fetchedNoms} />
        </div>


    )
}

export default BarChart2

