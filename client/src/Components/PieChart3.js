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
    const [returnedNomData, setReturnedNomData] = useState({})

    //State for handling Meter Number data:
    const [meterData, setMeterData] = useState({})

    //State for returning DAILY_VOL from the Meter data:
    // const [returnedFuel, setFuelData] = useState('')

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
                setReturnedNomData(data.recordset) //Use recordset for array, recordsets if an object.

            });
        setIsLoading(true)
        fetch('./gas_meters')
            .then(response => {
                return response.json();
            })
            .then(data => {
                setIsLoading(false)
                setMeterData(data.recordsets)
                // for (let index = 0; index < gasMeters.recordsets.length; index++) {
                //     const meterNo = gasMeters.recordsets[index][2]['METERNO'];
                //     setMeterData(meterNo)
                // };
                // for (const forEachMeter of gasMeters.recordsets) {
                //     // console.log(forEachMeter)
                //     setMeterData(forEachMeter)
                // }
                // for (const forEachFuel of gasMeters.recordsets) {
                //     // console.log(forEachMeter)
                //     setFuelData(forEachFuel)
                // }
                // setMeterData(gasMeters.recordsets[0])
                //This version displays one meter number:
                // for (let index = 0; index < gasMeters.recordsets.length; index++) {
                //     const meterNo = gasMeters.recordsets[index][2]['METERNO'];
                //     setMeterData(meterNo)
                // }
            });

    }, []);


    if (isLoading) {
        return <p>Loading....</p>
    }

    // console.log(returnedNomData);
    // console.log(meterData);

    let volAddUp = Array.from(returnedNomData).map((volumes) =>
        <option key={volumes.DATESTAMP} className='form-control' value={volumes.VOLUMEIN} >
            {volumes.DATESTAMP}
        </option>);
    // volumes.END_IMBAL
    // value = { volumes.END_IMBAL }

    let options = Array.from(meterData).map((meters) =>

        <option key={meters.DATESTAMP}>{meters.METERNO}</option>
    );

    //This works for mapping through array of VOLUMEIN in Noms:
    // let volAddUp = Array.from(returnedNomData).map((volumes) =>
    //     <li key={volumes.DATESTAMP}>
    //         Volume in: {volumes.VOLUMEIN}
    //     </li>);

    // let options = Array.from(meterData).map((meters) =>

    //     <option key={meters.DATESTAMP}>{meters.METERNO}</option>
    // );

    // console.log(volAddUp);
    // console.log(options);

    //Pulldown menu with measure point API call:
    const handleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value);
    }

    //Chart:
    const myChart3 = ({
        labels: ["Volume In", "End Imbalance"],
        datasets: [{
            label: ['Meter Point Data'],
            data: [selected, selected],
            //Array.from(returnedNomData).map((data) => data.END_IMBAL),
            // data: [meterData.ENERGY, meterData.DAILY_VOL],
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

    // console.log(returnedNomData);
    console.log(myChart3)
    return (
        <div className='mt-2 p-2' key={options.DATESTAMP}>
            <p>Select Gasflow Date</p>
            <select className='m-3' onChange={handleChange}>
                {volAddUp}
                {/* {options.METERDATE} */}
                {/* <option key={options.METERDATE}>
                    {options.METERNO}
                </option> */}
                {/* {Array.from(meterData).map(option => (
                    <option key={option.METERDATE} value={option.METERDATE}>
                        {option.METERDATE}
                    </option>
                ))} */}
            </select>

            <Pie data={myChart3} />
            {/* <ul>
                {volAddUp}
            </ul> */}

            {/* <button className='btn btn-primary mt-2' onClick={() => getNoms('./noms')}>Click me to get Nominations</button> */}

        </div>
    )
}

export default PieChart3
