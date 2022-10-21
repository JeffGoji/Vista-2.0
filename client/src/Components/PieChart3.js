import React from 'react'
import { useState, useEffect,useRef, useCallback } from 'react';
import { getDatasetAtEvent, Pie } from 'react-chartjs-2'
// eslint-disable-next-line no-unused-vars
//import { Chart as ChartJS } from 'chart.js/auto'
import { Chart } from 'chart.js';
// import 'chartjs-adapter-luxon';
import ChartStreaming from 'chartjs-plugin-streaming';


Chart.register(ChartStreaming);


function PieChart3({selectedFacility,getData,prevSelectedFacility,usePrevious}) {

    //#region other functions

    // function for getting meter volumes
    const getMeterVols = async() => {

        // create new array
        let newMeterVols = []

        // have to add a timezone offset unfortunately
        let timezoneOffset = new Date().toString().slice(new Date().toString().indexOf("GMT") + 3, new Date().toString().indexOf("GMT") + 8)
        
        // have to format the date in a certain way
        let localeDate = new Date(date + "-01T00:00:00" + timezoneOffset).toLocaleDateString()

        // this array is to add all the api fetch calls to
        let responses = []

        // map through each measurement point and make an api call to get the meter volume information,
        // add the api calls to the array of responses
        measPts.map((measPt) => 
            responses.push(getData('/measPtVols?meterNo='+measPt.METERNO+'&date='+ localeDate).then(
                res => {
                    if (res.length > 0) {
                        newMeterVols.push({meterNo: measPt.METERNO, volume: res[0].ALLOC_VOLUME})
                        console.log(newMeterVols)
                    }
                }
            ))
        )

        // wait for all fetch api calls to finish before continuing
        await Promise.all(responses)
        
        // set the meter volume information
        setMeterVols(newMeterVols)
    }

    // generate random colors
    const genHexCode = useCallback(() => {
        let hexString = "0123456789abcdef"
        let hexCode = "#"
        for (let i = 0; i < 6; i++){
            hexCode += hexString[Math.floor(Math.random() * hexString.length)]
        }
        return hexCode
    })

    //Pulldown menu with measure point API call:
    /*
    const handleChange = event => {
        console.log(event.target.value);
        setSelected(event.target.value)
    }*/
    /*
    const options = [
        { value: '', text: 'Select Meter' },
        {
            value: [returnedMeter.METERNO], text: [returnedMeter.METERNO]
            // value: [returnedMeter.METERNO], text: [returnedMeter.METERNO]
        },
    ];*/

    //#endregion

    //#region Reference and Variables
    //State for handling loading:
    const [isLoading, setIsLoading] = useState(false)
    //State for handling nomData:
    const [returnedNomData, setReturnedNomData] = useState({})

    //State for handling Meter Number data:
    const [returnedMeter, setMeterData] = useState({})

    //State for returning DAILY_VOL from the Meter data:
    const [returnedFuel, setFuelData] = useState('')

    //Customer pulldown menu:
    const [selected, setSelected] = useState("Select Customer");
    
    // selected facility's measurement points
    const [measPts, setMeasPts] = useState([])
    // previous measurement points
    const prevMeasPts = usePrevious(measPts)

    // used for tracking number of renders
    const renders = useRef(0)

    // meter volumes for pie chart
    const [meterVols, setMeterVols] = useState([])

    // total volume for selected meters
    const [totalVolume, setTotalVolume] = useState(0)

    // selected facility name
    const [facilityName, setFactilityName] = useState("")

    // date for volume query
    const [date, setDate] = useState((new Date().getFullYear()).toString() + "-" + (new Date().getMonth() + 1))

    //Chart:
    const myChart3 = ({
        labels: measPts.map(measPt => (measPt.METER_NAME)),
        datasets: [{
            label: ['Meter Point Data'],
            data: meterVols.map(meterVol => meterVol.volume)
            /*[returnedMeter.ENERGY, returnedMeter.DAILY_VOL]*/,
            // data: [returnedNomData[2].VOLUMEIN, returnedNomData[2].VOLUMEOUT, options.text],
            //nomData: [returnedVolData, returnedVolData, returnedVolData],
            backgroundColor: meterVols.map(meterVol => {
                return genHexCode()
            }),
            borderColor: "blue",
            borderWidth: 2,
        }]

    })

    //#endregion

    //#region useEffect functions
    //useEffect to restrict code from going into an infinite loop
    useEffect(() => {
        if (renders.current < 0){/*
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
                });*/
        }
        if (selectedFacility)
            setFactilityName(selectedFacility.FAC_NAME)

        if (selectedFacility !== prevSelectedFacility){
            console.log("previous facility:")
            console.log(prevSelectedFacility)
            console.log("selected facility:")
            console.log(selectedFacility)
            getData('/measPts?facKey='+selectedFacility.FAC_KEY).then(data => setMeasPts(data))
        }

        renders.current++
    }, [selectedFacility]);

    // any time measPts changes get new volumes for selected day
    useEffect(() => {
        if (measPts.length > 0)
            getMeterVols()
        setMeterVols([])
    },[measPts, date])

    // useEffect for meterVols
    useEffect(() => {
        let sum = 0
        meterVols.map(meterVol => (
            sum += meterVol.volume
        ))
        setTotalVolume(sum)
    },[meterVols])

    //#endregion

    const render = () => {
        return (
            <div className='mt-2 p-2'>
                <h4 className='text-white mb-5'>Meter Allocated Volumes</h4>
                <p className="mb-2">Prod Date:</p>
                <input 
                    onChange={(event) => {setDate(event.target.value)}} 
                    className="form-control form-control-sm mb-3" 
                    type="month" 
                    defaultValue={date} 
                />
                {/* SELECT TAG FOR MEASUREMENT POINTS
                <select className='m-3' value={selected} onChange={handleChange}>
                    {measPts.map(measPt => (
                        <option key={measPt.METERNO}>
                            {measPt.METER_NAME}
                        </option>
                    ))}
                    </select>*/}
                <h5>{facilityName}</h5>

                <Pie data={myChart3} />

                <p>Total Volume: {totalVolume}</p>

                {/* <button className='btn btn-primary mt-2' onClick={() => getNoms('./noms')}>Click me to get Nominations</button> */}

            </div>
        )
    }

    if (isLoading) {
        return <p>Loading....</p>
    }
    return render()

}

export default PieChart3
