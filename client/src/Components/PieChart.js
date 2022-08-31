import React, { Component } from "react";
import { useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'chart.js';

function PieChart() {

    let [returnedNomData, setReturnedNomData,] = useState({ VOLUMEIN: '', END_IMBAL: '', NET_END_IMBAL: '' })
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
            console.log(data.recordset)
            return data.recordset

        });

        setReturnedNomData(volInData.recordset)
        console.log(returnedNomData);
        //     // setReturnedNomData(volInData.recordset) - this method works
        return getNoms;

    };

    getNoms();


    const pieChart1 = ({
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
    console.log(pieChart1);



    return (
        <div>
            < Pie data={pieChart1} />
            <button></button>
        </div>
    )
}


export default PieChart;
