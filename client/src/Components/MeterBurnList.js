import React, { useEffect, useRef, useState } from "react";
import excelGif from '../assets/img/excel.gif'
import refreshPng from '../assets/img/refresh.png'
import listImg from '../assets/img/listImg.png'
import { getDatasetAtEvent } from "react-chartjs-2";

const MeterBurnList = ({contract, contracts, setContract, points, BA, cntrPathRates, prevContracts}) => {

    // references
    const renders = useRef(0)

    const selectContract = useRef()


    useEffect(() => {
        if (renders.current < 1) { // only do these things on first render

            // update renders reference
            renders.current = renders.current + 1
        }

        // set contract
        if (contracts !== prevContracts && contracts.length !== 0) {
            console.log("updating contract...")
            setContract(contracts.find(contract => contract.CNTR_TITLE === selectContract.current.value))
            console.log(contract)
        }

    }, [points, contracts, contract, BA])

    return (
        <div className="container-fluid text-white p-5">
            {/* FILTERS AND BUTTONS */}
            <div className="row justify-content-center">
                {/* FILTERS */}
                <div className="col-auto">
                    <div className="row justify-content-end">
                        <div className="col-auto">
                            <div className="row align-items-center justify-content-center pb-2">
                                <div className="col-auto">
                                    <h4>Display Filters:</h4>
                                </div>
                            </div>

                            <div className="row align-items-center pb-2">
                                <div className="col-5">
                                    <div className="row justify-content-end">
                                        <div className="col-auto"><label>Gas Flow Month:</label></div>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <select className="form-select form-select-sm" ref={selectContract} onChange={(event) => {setContract(contracts.find(contract => contract.CNTR_TITLE === event.target.value))}}>
                                        {
                                            contracts.sort((a, b) => (a.CNTR_TITLE > b.CNTR_TITLE) ? 1 : -1).map(({CNTR_NUM, CNTR_PARTY1, CNTR_TITLE}) => {
                                                if (CNTR_PARTY1 === BA.BA_ID) {
                                                    return (
                                                        <option key={CNTR_NUM}>{CNTR_TITLE}</option>
                                                    )
                                                }
                                            })
                                        }
                                    </select>
                                </div>

                            </div>
                            <div className="row align-items-center pb-2">
                                <div className="col-5">
                                    <div className="row justify-content-end">
                                        <div className="col-auto"><label className="form-label" >Contracts:</label></div>
                                    </div>
                                </div>
                                <div className="col-7">
                                    <input className="form-control form-control-sm" type="month" value={`${new Date().getFullYear()}-${(new Date().getMonth() > 8 ? "" : "0")+ (new Date().getMonth()+1)}`} onChange={() => {}}/>
                                </div>
                            </div>
                            <div className="row align-items-center justify-content-center">
                                <div className="col-auto">
                                    <div className="row justify-content-end">
                                        <div className="col-auto"><label>Show Daily Burn For All Contracts:</label></div>
                                    </div>
                                </div>
                                <div className="col-auto">
                                    <div className="col-auto">
                                        <input type="checkbox" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* BUTTONS */}
                <div className="col-auto">
                    <div className="row h-100 align-items-center justify-content-start">
                        <div className="col-auto">
                            <div className="row m-1">
                                <button type="button" className="btn btn-primary"><img src={refreshPng} alt="Refresh" />Refresh</button>
                            </div>
                            <div className="row m-1">
                                <button type="button" className="btn btn-primary"><img src={excelGif} alt="Excel" />Excel Report</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DATA */}
            <div className="row mt-5 justify-content-center">
                <div className="col-auto" >
                    {/* HEADER */}
                    <div className="row text-center">
                        <h4>Meter Burn List</h4>
                    </div>
                    {/* TABLE */}
                    <div className="row">
                        <div className="col-auto">
                            <div className="table-responsive">
                                <table className="table table-light table-sm table-hover table-striped-columns table-bordered border-primary rounded">
                                    <thead>
                                        <tr>
                                            <th scope="col">Contract Path Rate Number</th>
                                            <th scope="col">Receive Point Number</th>
                                            <th scope="col">Delivery Point Number</th>
                                            <th scope="col">Effective Date</th>
                                            <th scope="col">User Stamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="table-group-divider">
                                        {cntrPathRates.map(({CNTR_PATH_RATE_NUM,CNTR_NUM, RCV_PT_NUM, DLV_PT_NUM, EFFDATE, USERSTAMP, SITE_FAC_ID}) => {
                                            if (contract !== undefined && CNTR_NUM === contract.CNTR_NUM) {
                                                return (
                                                    <tr key={CNTR_PATH_RATE_NUM}>
                                                        <td scope="row">{CNTR_PATH_RATE_NUM}</td>
                                                        <td>{RCV_PT_NUM}</td>
                                                        <td>{DLV_PT_NUM}</td>
                                                        <td>{EFFDATE}</td>
                                                        <td>{USERSTAMP}</td>
                                                    </tr>
                                                )
                                            }
                                        })}
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