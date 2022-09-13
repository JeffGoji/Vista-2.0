import React, { useEffect, useRef, useState } from "react";
import excelGif from '../assets/img/excel.gif'
import refreshPng from '../assets/img/refresh.png'

const MeterBurnList = (props) => {

    // references
    const renders = useRef(0)

    // state variables
    const [contracts, setContracts] = useState([])

    // api calls
    const getData = async (url) => {
        await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
            },
        })
        .then(res => res.json())
        .then(res => setContracts(res.recordset))
    }

    useEffect(() => {
        if (renders.current < 1){ // only do these things on first render

            // get data
            getData('/contracts').catch(console.error)

            // update renders reference
            renders.current = renders.current + 1
        }
    }, [])

    return (
        <div className="container-fluid p-2 fw-bold">
            {/* BUTTONS */}
            <div className="row">
                <div className="text-center">
                    <button className="btn btn-primary m-1" type="button">
                        <span>
                            <img src={refreshPng} alt="refreshPng" />
                        </span>
                        Refresh
                    </button>
                    <button className="btn btn-primary m-1" type="button">
                        <span>
                            <img src={excelGif} alt="excelGif" />
                        </span>
                        Excel Report
                    </button>
                </div>
            </div>
            {/* FILTERS */}
            <div className="row bg-light bg-opacity-75 m-2 rounded p-2">
                <div className="container-fluid"> {/* container */}
                    <div className="row"> {/* title */}
                        <legend className="text-center">Filters:</legend>
                    </div>
                    <div className="row"> {/* rows */}
                        <div className="text-center col-lg-4"> {/* gas flow month */}
                            <label className="pe-2">Gas Flow Month:</label>
                            <input type="text"/>
                        </div>
                        <div className="text-center col-lg-5"> {/* contracts */}
                            <label className="pe-2">Contracts:</label>
                            <select>
                                {
                                    contracts.map(({CNTR_NUM, CNTR_PARTY2, CNTR_TITLE}) => {
                                        if (CNTR_PARTY2 === props.BU.pipelineID) {
                                            return (
                                                <option key={CNTR_NUM}>{CNTR_TITLE}</option>
                                            )
                                        }
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-sm-5 text-center col-lg-3"> {/* show daily burn for all contracts */}
                            <label className="pe-2">Show Daily Burn For All Contracts:</label>
                            <input type="checkbox" />
                        </div>
                    </div>
                </div>
            </div>
            {/* DATA LIST */}
            <div className="row bg-light bg-opacity-75 m-2 rounded p-2">
                <div>
                    <legend className="text-center">Meter Burn List</legend>
                </div>
            </div>
        </div>
    )
}

export default MeterBurnList