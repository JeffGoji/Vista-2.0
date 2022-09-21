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
        if (renders.current < 1) { // only do these things on first render

            // get data
            getContracts('/contracts').catch(console.error)

            // update renders reference
            renders.current = renders.current + 1
        }
    }, [])

    return (
        <div className="container-fluid text-white">
            <div className="row">
                {/* FILTERS */}
                <div className="col">
                    <h4 className="p-2">Display Filters:</h4>
                    <div className="row p-2">
                        <div className="row">
                            <div className="col-auto">
                                <label>Gas Flow Month:</label>
                            </div>
                            <div className="col">
                                <input type="text" />
                            </div>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="row">
                            <div className="col-auto">
                                <label className="form-label">Contracts:</label>
                            </div>
                            <div className="col">
                                <select className="form-select form-select-sm" style={{ width: 'auto' }}>
                                    {
                                        contracts.sort((a, b) => (a.CNTR_TITLE > b.CNTR_TITLE) ? 1 : -1).map(({ CNTR_NUM, CNTR_PARTY1, CNTR_TITLE }) => {
                                            if (CNTR_PARTY1 === props.BA.BA_ID) {
                                                return (
                                                    <option key={CNTR_NUM}>{CNTR_TITLE}</option>
                                                )
                                            }
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="row p-2">
                        <div className="row">
                            <div className="col-auto">
                                <label>Show Daily Burn For All Contracts:</label>
                            </div>
                            <div className="col">
                                <input type="checkbox" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col"></div>
                {/* BUTTONS */}
                <div className="col">
                    <div className="row h-100 align-items-center justify-content-center">
                        <div className="col-sm-7 col-md-7 col-lg-7">
                            <button className="btn btn-primary m-2" type="button"><img src={refreshPng} alt="Refresh" />Refresh</button>
                            <button className="btn btn-primary" type="button"><img src={excelGif} alt="Excel" />Excel Report</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* DATA LIST */}
            <div className="row">
                <div className="row text-center">
                    <h4>Meter Burn List</h4>
                </div>
                <div className="row">
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
                                    <td><button className="btn btn-sm btn-primary">View</button> <button className="btn btn-sm btn-primary">Save</button></td>
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
                                    <td><button className="btn btn-sm btn-primary">View</button> <button className="btn btn-sm btn-primary">Save</button></td>
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
                                    <td><button className="btn btn-sm btn-primary">View</button> <button className="btn btn-sm btn-primary">Save</button></td>
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
                                    <td><button className="btn btn-sm btn-primary">View</button> <button className="btn btn-sm btn-primary">Save</button></td>
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
                                    <td><button className="btn btn-sm btn-primary">View</button> <button className="btn btn-sm btn-primary">Save</button></td>
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
                                    <td><button className="btn btn-sm btn-primary">View</button> <button className="btn btn-sm btn-primary">Save</button></td>
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
    )
}

export default MeterBurnList