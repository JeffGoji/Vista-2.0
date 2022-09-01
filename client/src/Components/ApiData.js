import React from 'react'
import { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { Chart as ChartJS } from 'chart.js/auto'



function ApiData() {

    //City API call:
    const [returnedData, setReturnedData] = useState({ FACILITY_ID: '', FACILITY_NAME: '' });

    const getData = async (url) => {
        const newData = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(res => res.json());
        //console.log(newData);
        setReturnedData(newData.recordset[1])
    }

    //Console Log to verify data coming in
    // console.log(returnedData);

    //Nomination Call:
    //Only storing two peices of data for simple testing
    const [returnedNomData, setReturnedNomData] = useState({ VOLUMEIN: '', VOLUMEOUT: '', });

    const getNoms = async (url) => {
        const newNomData = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(res => res.json());

        return setReturnedNomData(newNomData.recordset[1])

    }


    return (
        <div>
            {/* <button className='btn btn-primary mb-2' onClick={() => getData('./cityApi')}>Click me to get City Id and Name!</button>
            <br />
            <button className='btn btn-primary mb-2' onClick={() => getNoms('./noms')}>Click me to get Nominations</button>

            <p>Date:
                <br />
                {returnedData.LONGITUDE}</p>
            <p>City:
                <br />
                {returnedData.FAC_NAME}</p>
            <p>State ID:
                <br />
                {returnedData.FAC_ID} </p>

            <h4>Nominations</h4>

            <p>Volume In:
                <br />
                {returnedNomData.VOLUMEIN}</p>

            <p>Volume Out:
                <br />
                {returnedNomData.VOLUMEOUT}</p> */}

        </div>


    )
}

export default ApiData