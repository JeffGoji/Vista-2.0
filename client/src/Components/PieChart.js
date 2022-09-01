import React from "react";
import { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'chart.js';

function PieChart() {
    //State for handling loading:
    const [isLoading, setIsLoading] = useState(true)
    //State for handling data:
    const [nomData, setNomData] = useState([])
    //City State useState:
    const [returnedCityData, setReturnedCityData] = useState([])
    //useEffect to restrict code from going into an infinite loop
    useEffect(() => {
        fetch('./cityApi')
            .then(response => {
                return response.json();

            })
            .then(citydata => {
                setReturnedCityData(citydata.recordsets[0])
                console.log(citydata);
            });
    }, []);

    //useEffect to restrict code from going into an infinite loop
    useEffect(() => {
        setIsLoading(true)
        fetch('./noms')
            .then(response => {
                return response.json();

            })
            .then(data => {
                setIsLoading(false)
                setNomData(data.recordsets[0])
                console.log(data);
            });
    }, []);

    if (isLoading) {
        return <p>Loading....</p>
    };


    //State for handling data:
    // const [returnedCityData, setReturnedCityData] = useState([])
    //useEffect to restrict code from going into an infinite loop




    const pieChart1 = ({
        labels: ['Volume In', 'End Imbalance', 'Net End Imbalance'],
        datasets: [{
            label: ['Nominations'],
            data: [nomData[2].VOLUMEIN, nomData[2].VOLUMEOUT, nomData[2].END_IMBAL],
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
    });
    console.log(pieChart1);



    return (
        <div>
            <h4>Volumes Chart</h4>
            <p>Facility Name:
                <br />
                {returnedCityData[2].FAC_NAME}</p>
            <p>State ID:
                <br />
                {returnedCityData[2].FAC_ID} </p>
            <Pie data={pieChart1} />

            <p>Longitude:
                <br />
                {returnedCityData[2].LONGITUDE}</p>

        </div>
    )
}


export default PieChart;


    // let [returnedNomData, setReturnedNomData,] = useState({ VOLUMEIN: '', END_IMBAL: '', NET_END_IMBAL: '' })
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
    //         console.log(data.recordset)
    //         return data.recordset

    //     });

    //     setReturnedNomData(volInData.recordset)
    //     console.log(returnedNomData);
    //     //     // setReturnedNomData(volInData.recordset) - this method works
    //     return getNoms;

    // };

    // getNoms();