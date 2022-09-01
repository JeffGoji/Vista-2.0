import React, { Component } from "react";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'chart.js';

import { Noms } from './Noms'

function PieChart({ Noms }) {

    // let [returnedNomData, setReturnedNomData,] = useState({ VOLUMEIN: '', VOLUMEOUT: '', END_IMBAL: '', NET_END_IMBAL: '' })
    // const getNoms = async (url) => {
    //     let volInData = await fetch(url, {
    //         method: 'GET',
    //         headers: {
    //             'content-type': 'application/json',
    //             'Accept': 'application/json',
    //         },

    //     }).then(function (response) {
    //         // console.log(response);
    //         return response.json();

    //     }).then(function (data) {
    //         // console.log(data.recordset)
    //         // return data.recordset
    //         console.log(data.recordset[1])
    //         return data.recordset[1]

    //     });

    //     setReturnedNomData(volInData)

    //     console.log(returnedNomData);
    //     //     // setReturnedNomData(volInData.recordset) - this method works
    //     return getNoms;


    // };
    const pieChart1 = ({
        labels: ['Volume In', 'End Imbalance', 'Net End Imbalance'],
        datasets: [{
            label: ['Nominations'],
            data: [{ Noms }.VOLUMEIN, { Noms }.END_IMBAL, { Noms }.NET_END_IMBAL],
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



    return (
        <div>
            < Pie data={pieChart1} />
        </div>
    )
}


export default PieChart;
