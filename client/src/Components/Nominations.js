import React from "react";
// import { useState } from "react"

import refresh from '../assets/img/refresh.png';
import add from '../assets/img/add.gif';
import excelBtn from '../assets/img/excel.gif'
import addView from '../assets/img/activity.gif'
import viewBtn from '../assets/img/pool-cust-summary.png'
import ggpBtn from '../assets/img/gpp.gif'

// import data from '../mock-noms.json'

const Nominations = () => {

    // const [nomData, setNomData] = useState(data);



    return (
        <div className="container-fluid main-bg" >
            <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 p-2">
                    <button className="m-2 btn btn-primary"><img src={add} alt="Add" className="p-1" />Refresh</button>
                    <button className="m-2 btn btn-primary"><img src={refresh} alt="Refresh" className="p-1" />New</button>
                    <button className="m-2 btn btn-primary"><img src={excelBtn} alt="Export to Excel" className="p-1" />Export to Excel</button>
                    <button className="m-2 btn btn-primary"><img src={addView} alt="Add/View Activity" className="p-1" />Add/View Activity</button>
                    <button className="m-2 btn btn-primary"><img src={viewBtn} alt="View Marketer Pool" className="p-1" />View Marketer Pool balances</button>
                    <button className="m-2 btn btn-primary"><img src={ggpBtn} alt="GGP" className="p-1" />GGP</button>
                </div>
            </div>
            <div className="row mt-1 p-2">
                <div className="col-sm-12 col-md-6 col-lg-4 text-white"><h4>Display Filters:</h4>
                    <div className="col-sm-12 col-md-12 col-lg-6">
                        <form>
                            <label>
                                From Date:
                                <br />
                                <select value={"value"} >
                                    <option vlaue={"null"} type="select" className="rounded m-2">Pick a Date</option>
                                    <option vlaue={"09/12/2022"} type="select" className="rounded m-2">09/12/2022</option>
                                    <option vlaue={"09/13/2022"} type="select" className="rounded m-2">09/13/2022</option>
                                    <option vlaue={"09/14/2022"} type="select" className="rounded m-2">09/14/2022</option>
                                    <option vlaue={"09/15/2022"} type="select" className="rounded m-2">09/15/2022</option>
                                </select>
                            </label>
                        </form>
                        <form >
                            <label>
                                To Date:
                                <br />
                                <select value={"value"} >
                                    <option vlaue={"null"} type="select" className="rounded m-2">Pick a Date</option>
                                    <option vlaue={"09/12/2022"} type="select" className="rounded m-2">09/12/2022</option>
                                    <option vlaue={"09/13/2022"} type="select" className="rounded m-2">09/13/2022</option>
                                    <option vlaue={"09/14/2022"} type="select" className="rounded m-2">09/14/2022</option>
                                    <option vlaue={"09/15/2022"} type="select" className="rounded m-2">09/15/2022</option>
                                </select>
                            </label>
                        </form>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 col-lg-4 text-white">
                    <div className="row"><h4>Display Filters:</h4>
                        <div className="col-sm-12 col-md-12 col-lg-5">
                            <form >
                                <label>
                                    Contract:
                                    <br />
                                    <select value={"value"} >
                                        <option vlaue={"null"} type="select" className="rounded m-2">Select Contract</option>
                                        <option vlaue={"123456"} type="select" className="rounded m-2">123456</option>

                                    </select>
                                </label>
                            </form>

                            <form >
                                <label>
                                    Noms:
                                    <br />
                                    <select value={"value"} >
                                        <option vlaue={"null"} type="select" className="rounded m-2">Select Nomination</option>
                                        <option vlaue={"123456"} type="select" className="rounded m-2">123456</option>

                                    </select>
                                </label>
                            </form>
                        </div>


                        <div className="col-sm-12 col-md-12 col-lg-5">
                            <form >
                                <label>
                                    Trans-Type:
                                    <br />
                                    <select value={"value"} >
                                        <option vlaue={"null"} type="select" className="rounded m-2">Select Trans-type</option>
                                        <option vlaue={"123456"} type="select" className="rounded m-2">123456</option>

                                    </select>
                                </label>
                            </form>
                            <form >
                                <label>
                                    Pool Pt:
                                    <br />
                                    <select value={"value"} >
                                        <option vlaue={"null"} type="select" className="rounded m-2">Select Pool Pt</option>
                                        <option vlaue={"123456"} type="select" className="rounded m-2">123456</option>

                                    </select>
                                </label>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            {/* Table below: */}
            
            <div className="row text-center mt-3 p-2" >
                <h4 className="text-start text-white">Nominations:</h4>
                <div className="col-sm-12 col-md-12 col-lg-12">
                    <table className="bg-white table table-sm table-hover table-striped-columns table-bordered border-primary rounded">
                        <thead>
                            <tr>
                                <th style={{ minWidth: "8rem" }}>View</th>
                                <th>Details</th>
                                <th>Status</th>
                                <th>Cycle</th>
                                <th>Up Transporter</th>
                                <th>Up Shipper</th>
                                <th>Up Contract #</th>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Rec Pt</th>
                                <th>Rank</th>
                                <th>Nom Qty</th>
                                <th>Del Pt</th>
                                <th>Trans Type</th>
                                <th>Contract #</th>
                                <th>Activity</th>
                                <th>Pkg #</th>
                                <th>Updated By</th>
                                <th>Updated On</th>
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
            </div >
            </div>

        

    )
}

export default Nominations;