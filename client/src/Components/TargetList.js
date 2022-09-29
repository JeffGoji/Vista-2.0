import React, {useRef, useState, useEffect} from "react"

import refresh from '../assets/img/refresh.png'
import add from '../assets/img/add.gif'
import excelBtn from '../assets/img/excel.gif'
import addView from '../assets/img/activity.gif'
import viewBtn from '../assets/img/pool-cust-summary.png'
import ggpBtn from '../assets/img/gpp.gif'

const TargetList = ({contract, contracts, setContract, point, points, selectPoint, BA, cntrPathRates, prevContracts, prevPoints}) => {

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

        // set point
        if (points !== prevPoints && points.length !== 0) {
            console.log("updating point...")
            setContract(points.find(point => point.POINT_NAME === selectPoint.current.value))
            console.log(point)
        }

    }, [points, point, contracts, contract, BA])

    return (
        <div className="container-fluid main-bg" >
            {/* BUTTONS */}
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 p-2">
                    <button className="m-2 btn btn-primary"><img src={refresh} alt="Refresh" className="p-1" />Refresh</button>
                    <button className="m-2 btn btn-primary"><img src={excelBtn} alt="Export to Excel" className="p-1" />Export to Excel</button>
                </div>
            </div>
            {/* FILTERS */}
            <div className="row mt-1 p-3">
                <div className="col-sm-12 col-md-6 col-lg-4 text-white">
                    <div className="row"><h4>Display Filters:</h4>
                        <div className="col-sm-12 col-md-12 col-lg-4">
                            <form >
                                <label>
                                    Contract ID:
                                    <br />
                                    <select ref={selectContract} onChange={() => {}} >
                                        <option value={"null"} type="select" className="rounded m-2">Select Contract</option>
                                        <option value={"Agway"} type="select" className="rounded m-2">Agway-Agway</option>
                                    </select>
                                </label>
                            </form>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-3">
                            <form >
                                <label>
                                    Point ID:
                                    <br />
                                    <select ref={selectPoint} onChange={() => {}} >
                                        <option value={"null"} type="select" className="rounded m-2">Select Point</option>
                                        <option value={"647"} type="select" className="rounded m-2">647-P1-POR-Agway</option>
                                    </select>
                                </label>
                            </form>
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-3">
                            <form >
                                <label>
                                    Display Month:
                                    <br />
                                    <input className="form-control form-control-sm" type="month" value={`${new Date().getFullYear()}-${(new Date().getMonth() > 8 ? "" : "0")+ (new Date().getMonth()+1)}`} onChange={() => {}}/>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Table below: */}
            
            <div className="row text-center mt-3 p-2" >
                <h4 className="text-start text-white">Target List:</h4>
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <table className="bg-white table table-sm table-hover table-striped-columns table-bordered border-primary rounded">
                        <thead>
                            <tr>
                                <th>Target Date</th>
                                <th>Gross Required</th>
                                <th>Reconciled Required</th>
                                <th>Assigned Local Prod</th>
                                <th>Adjusted Local Prod</th>
                                <th>Assigned Local Fuel</th>
                                <th>Net Required</th>
                                <th>Nom Local</th>
                                <th>Nom Interstate</th>
                                <th>Total Nom Qty</th>
                                <th>St Injection</th>
                                <th>St Withdrawl</th>
                                <th>Imbalance</th>
                                <th>% Imbalance</th>
                                <th>Updated By</th>
                                <th>Updated On</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>1/1/2022</td>
                                <td>68</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>68</td>
                                <td>68</td>
                                <td>0</td>
                                <td>68</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>STEP248</td>
                                <td>2021-12-30 01:26:02</td>
                            </tr>
                            <tr>
                                <td>1/2/2022</td>
                                <td>124</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>124</td>
                                <td>124</td>
                                <td>0</td>
                                <td>124</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>STEP248</td>
                                <td>2021-12-30 01:26:27</td>
                            </tr>
                            <tr>
                                <td>1/3/2022</td>
                                <td>129</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>129</td>
                                <td>129</td>
                                <td>0</td>
                                <td>129</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>STEP248</td>
                                <td>2021-12-30 01:26:55</td>
                            </tr>
                            <tr>
                                <td>1/4/2022</td>
                                <td>112</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>112</td>
                                <td>112</td>
                                <td>0</td>
                                <td>112</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>STEP248</td>
                                <td>2021-12-30 01:27:20</td>
                            </tr>
                            <tr>
                                <td>1/5/2022</td>
                                <td>112</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>112</td>
                                <td>112</td>
                                <td>0</td>
                                <td>112</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>CUR2313</td>
                                <td>2022-01-03 09:45:31</td>
                            </tr>
                            <tr>
                                <td>1/6/2022</td>
                                <td>138</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>138</td>
                                <td>138</td>
                                <td>0</td>
                                <td>138</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>CUR2313</td>
                                <td>2022-01-04 09:47:31</td>
                            </tr>
                            <tr>
                                <td>1/7/2022</td>
                                <td>150</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>150</td>
                                <td>150</td>
                                <td>0</td>
                                <td>150</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>CUR2313</td>
                                <td>2022-01-05 10:28:26</td>
                            </tr>
                            <tr>
                                <td>1/8/2022</td>
                                <td>122</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>122</td>
                                <td>122</td>
                                <td>0</td>
                                <td>122</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>CUR2313</td>
                                <td>2022-01-06 10:50:39</td>
                            </tr>
                            <tr>
                                <td>1/9/2022</td>
                                <td>120</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>120</td>
                                <td>120</td>
                                <td>0</td>
                                <td>120</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>CUR2313</td>
                                <td>2022-01-06 10:51:04</td>
                            </tr>
                            <tr>
                                <td>1/10/2022</td>
                                <td>158</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>158</td>
                                <td>158</td>
                                <td>0</td>
                                <td>158</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>0</td>
                                <td>CUR2313</td>
                                <td>2022-01-05 10:51:26</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div >
        </div>
    )
}

export default TargetList