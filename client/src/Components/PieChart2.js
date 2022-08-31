import React from 'react'
import { useState } from 'react';
import { Pie } from 'react-chartjs-2'
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'chart.js';
// import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';

Chart.register(ChartStreaming);


function BarChart2() {

    //Nomination Call:
    let [returnedNomData, setReturnedNomData,] = useState({ VOLUMEIN: '', VOLUMEOUT: '', END_IMBAL: '', NET_END_IMBAL: '' })
    const getNoms = async (url) => {
        let volInData = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
            },

        }).then(function (response) {
            // console.log(response);
            return response.json();

        }).then(function (data) {
            // console.log(data.recordset)
            // return data.recordset
            console.log(data.recordset[1])
            return data.recordset[1]

        });

        setReturnedNomData(volInData)


        console.log(returnedNomData);
        //     // setReturnedNomData(volInData.recordset) - this method works
        return returnedNomData;


    };
    const myChart = ({
        labels: ['Volume In', 'End Imbalance', 'Net End Imbalance'],
        datasets: [{
            label: ['Nominations'],
            data: [returnedNomData.VOLUMEIN, returnedNomData.END_IMBAL, returnedNomData.NET_END_IMBAL],
            //data: [returnedNomData, returnedNomData, returnedNomData],
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

    console.log(myChart);


    return (
        <div>
            <h4>Nominations Chart</h4>
            <p>Gas Flow date:<br />
                {returnedNomData.GASFLOW_DATE}</p>

            User Stamp:
            <br />
            {returnedNomData.USERSTAMP}
            <br />

            <Pie data={myChart} />
            <button className='btn btn-primary mt-2' onClick={() => getNoms('./noms')}>Click me to get Nominations</button>

        </div>


    )
}

export default BarChart2



        //Looped through the volInData Array to return all of the  VOLUMEIN data:
        // let volIn = volInData
        // let returnedNomData = volIn.map(myFunction)
        // function myFunction(data2) {
        //     return data2.VOLUMEIN;
        // }

        //For Each method:
        // let volIn = volInData
        // let returnedNomData = volIn.map(myFunction)
        // function myFunction(data2) {
        //     return data2.VOLUMEIN;
        // }

        // //For Each method for looping through an additiona
        // let volOut = volInData
        // let returnedNomData2 = volOut.map(myFunction2)
        // function myFunction2(data3) {
        //     return data3.VOLUMEOUT;
        // }

        // for (const VOLUMEIN in returnedNomData.recordset) {
        //     if (Object.hasOwnProperty.call(returnedNomData, VOLUMEIN)) {
        //         const element = returnedNomData[VOLUMEIN];
        //         console.log(element);
        //         return returnedNomData.data
        //     }
        // }