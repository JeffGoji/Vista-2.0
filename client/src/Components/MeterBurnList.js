import React, { useEffect, useRef, useState } from "react";
import excelGif from '../assets/img/excel.gif'
import refreshPng from '../assets/img/refresh.png'

const MeterBurnList = (props) => {

    // references
    const renders = useRef(0)

    // state variables
    const [contracts, setContracts] = useState([])

    // api calls
    const getContracts = async (url) => {
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
            getContracts('/contracts').catch(console.error)

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
                        <div className="text-center col-lg-4 col-sm-4 col-md-4"> {/* gas flow month */}
                            <label className="pe-2">Gas Flow Month:</label>
                            <input type="text"/>
                        </div>
                        <div className="text-center col-lg-4 col-sm-4 col-md-4"> {/* contracts */}
                            <label className="pe-2">Contracts:</label>
                            <select className="form-select">
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
                        <div className="col-sm-5 text-center col-lg-4 col-sm-4 col-md-4"> {/* show daily burn for all contracts */}
                            <label className="pe-2">Show Daily Burn For All Contracts:</label>
                            <input type="checkbox" />
                        </div>
                    </div>
                </div>
            </div>
            {/* DATA LIST */}
            <div className="row bg-light bg-opacity-75 m-2 rounded p-2">
                <div className="container-fluid">
                    <div className="row">
                        <legend className="text-center">Meter Burn List</legend>
                    </div>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12">
                        <div className="table-responsive">
                        <table className="bg-white table table-sm table-hover table-striped-columns table-bordered border-primary rounded">
                            <thead>
                                <tr>
                                    <th scope="col" style={{ minWidth: "8rem" }}>View</th>
                                    <th scope="col">Details</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Cycle</th>
                                    <th scope="col">Up Transporter</th>
                                    <th scope="col">Up Shipper</th>
                                    <th scope="col">Up Contract #</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th scope="col">Rec Pt</th>
                                    <th scope="col">Rank</th>
                                    <th scope="col">Nom Qty</th>
                                    <th scope="col">Del Pt</th>
                                    <th scope="col">Trans Type</th>
                                    <th scope="col">Contract #</th>
                                    <th scope="col">Activity</th>
                                    <th scope="col">Pkg #</th>
                                    <th scope="col">Updated By</th>
                                    <th scope="col">Updated On</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td scope="row"><button className="btn btn-sm btn-primary">View</button> <button className="btn btn-sm btn-primary">Save</button></td>
                                    <td><button className="btn btn-sm btn-primary">Details</button></td>
                                    <td>NM</td>
                                    <td>TIM</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>8/1/2022</td>
                                    <td>8/31/2022</td>
                                    <td>924-LGA-Direct Energy</td>
                                    <td>68</td>
                                    <td>647-P1-POR-Agway</td>
                                    <td>68</td>
                                    <td>PP</td>
                                    <td>Direct Energy Bs Mkt</td>
                                    <td>PNG 924 LGA to 647 Agway P1</td>
                                    <td>00031677</td>
                                    <td>elavskyr</td>
                                    <td>9/13/2022</td>
                                </tr>
                                <tr>
                                    <td scope="row"><button className="btn btn-sm btn-primary">View</button> <button className="btn btn-sm btn-primary">Save</button></td>
                                    <td><button className="btn btn-sm btn-primary">Details</button></td>
                                    <td>NM</td>
                                    <td>TIM</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>8/1/2022</td>
                                    <td>8/31/2022</td>
                                    <td>924-LGA-Direct Energy</td>
                                    <td>68</td>
                                    <td>647-P1-POR-Agway</td>
                                    <td>68</td>
                                    <td>PP</td>
                                    <td>Direct Energy Bs Mkt</td>
                                    <td>PNG 924 LGA to 647 Agway P1</td>
                                    <td>00031677</td>
                                    <td>elavskyr</td>
                                    <td>9/13/2022</td>
                                </tr>
                                <tr>
                                    <td scope="row"><button className="btn btn-sm btn-primary">View</button> <button className="btn btn-sm btn-primary">Save</button></td>
                                    <td><button className="btn btn-sm btn-primary">Details</button></td>
                                    <td>NM</td>
                                    <td>TIM</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>8/1/2022</td>
                                    <td>8/31/2022</td>
                                    <td>924-LGA-Direct Energy</td>
                                    <td>68</td>
                                    <td>647-P1-POR-Agway</td>
                                    <td>68</td>
                                    <td>PP</td>
                                    <td>Direct Energy Bs Mkt</td>
                                    <td>PNG 924 LGA to 647 Agway P1</td>
                                    <td>00031677</td>
                                    <td>elavskyr</td>
                                    <td>9/13/2022</td>
                                </tr>
                                <tr>
                                    <td scope="row"><button className="btn btn-sm btn-primary">View</button> <button className="btn btn-sm btn-primary">Save</button></td>
                                    <td><button className="btn btn-sm btn-primary">Details</button></td>
                                    <td>NM</td>
                                    <td>TIM</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>8/1/2022</td>
                                    <td>8/31/2022</td>
                                    <td>924-LGA-Direct Energy</td>
                                    <td>68</td>
                                    <td>647-P1-POR-Agway</td>
                                    <td>68</td>
                                    <td>PP</td>
                                    <td>Direct Energy Bs Mkt</td>
                                    <td>PNG 924 LGA to 647 Agway P1</td>
                                    <td>00031677</td>
                                    <td>elavskyr</td>
                                    <td>9/13/2022</td>
                                </tr>
                                <tr>
                                    <td scope="row"><button className="btn btn-sm btn-primary">View</button> <button className="btn btn-sm btn-primary">Save</button></td>
                                    <td><button className="btn btn-sm btn-primary">Details</button></td>
                                    <td>NM</td>
                                    <td>TIM</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>8/1/2022</td>
                                    <td>8/31/2022</td>
                                    <td>924-LGA-Direct Energy</td>
                                    <td>68</td>
                                    <td>647-P1-POR-Agway</td>
                                    <td>68</td>
                                    <td>PP</td>
                                    <td>Direct Energy Bs Mkt</td>
                                    <td>PNG 924 LGA to 647 Agway P1</td>
                                    <td>00031677</td>
                                    <td>elavskyr</td>
                                    <td>9/13/2022</td>
                                </tr>
                                <tr>
                                    <td scope="row"><button className="btn btn-sm btn-primary">View</button> <button className="btn btn-sm btn-primary">Save</button></td>
                                    <td><button className="btn btn-sm btn-primary">Details</button></td>
                                    <td>NM</td>
                                    <td>TIM</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td>8/1/2022</td>
                                    <td>8/31/2022</td>
                                    <td>924-LGA-Direct Energy</td>
                                    <td>68</td>
                                    <td>647-P1-POR-Agway</td>
                                    <td>68</td>
                                    <td>PP</td>
                                    <td>Direct Energy Bs Mkt</td>
                                    <td>PNG 924 LGA to 647 Agway P1</td>
                                    <td>00031677</td>
                                    <td>elavskyr</td>
                                    <td>9/13/2022</td>
                                </tr>
                            </tbody>
                        </table>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MeterBurnList