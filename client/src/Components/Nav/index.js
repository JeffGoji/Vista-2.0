import React, {useEffect, useState, useRef} from 'react'

import logo1 from '../../assets/img/logo.png'
// you will need link and withRouter from react router dom
// import { Link } from 'react-router-dom';

import { NavLink } from 'react-router-dom'
// import Auth from '../../utils/auth';
import '../../index.css'

export const Nav = ({ setBU, BUs, BAs, prevBAs, setBA, BU }) => {

    // references
    const selectBU = useRef() // select business unit dropdown reference
    const selectBA = useRef() // select BA dropdown reference
    const renders = useRef(0)

    useEffect(() => {

        // only run this code on first render
        if (renders.current < 1) {
            setBU(BUs[selectBU.current.selectedIndex]) // set the business unit on load
            renders.current = renders.current + 1 // increment renders
        }

        // only run this code if BAs has changed and if its not empty
        if (BAs !== prevBAs && BAs.length !== 0) {
            setBA(BAs.find(BA => BA.NAME === selectBA.current.value))
        }

    }, [BAs, selectBU, selectBA])
    
    return (
        <>
            <div className="navbar navbar-expand-lg navbar-light bg-light text-dark" style={{borderBottom:'#004B8D solid 5px'}}>
                <div className="container-fluid">
                    <NavLink className="navbar-brand" to="/">
                        <img className='shadow rounded' src={logo1}
                            alt="Company Logo"
                            style={{ width: '40%', border:'#065599 solid 2px', padding:'5px' }}
                        /></NavLink>
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown"
                        aria-controls="navbarNavDropdown"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavDropdown">
                        <div className="navbar-nav">

                            <li className="nav-item ms-lg-3">
                                <NavLink className={"nav-link active"} aria-current="page" to="/network-builder">Network Builder</NavLink>
                            </li>

                            <li className="nav-item ms-lg-3">
                                <NavLink className={"nav-link active"} aria-current="page" to="/">Dashboard</NavLink>
                            </li>

                            {/* <li className="nav-item dropdown ms-lg-3">
                                <div
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false">
                                    About ENSYTE
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" href="#">
                                    <li><NavLink className="dropdown-item" to="/about">About Us</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="/executive-team">Our Team</NavLink></li>
                                </ul>
                            </li> */}

                            <li className={"nav-item dropdown ms-lg-3"}>
                                <div
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="navbarDropdownMenuLink"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Pages
                                </div>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" href="#">
                                    {/* <li><h4 className={"dropdown-header"}>GASTAR Features</h4></li> */}

                                    <li><NavLink className="dropdown-item" to="nominations">Nominations</NavLink></li>

                                    <li><NavLink className="dropdown-item" to="meter-burn-list">Meter Burn List</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="target-list">Target List</NavLink></li>
                                    <li>
                                        <NavLink className="dropdown-item" to="gastar-risk">Gastar Risk</NavLink>
                                    </li>
                                </ul>
                            </li>

                            <div className="nav-item m-2">
                                <label className='pe-2'>Business Unit:</label>
                                <select className='form-select form-select-sm' ref={selectBU} onChange={(event) => {setBU(BUs[event.target.selectedIndex])}}>
                                    {
                                        BUs.map(({buName}) => {
                                            return <option key={buName}>{buName}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className='nav-item m-2'>
                                <label className='pe-2'>Business Associate:</label>
                                <select className='form-select form-select-sm' ref={selectBA} onChange={(event) => {setBA(BAs.find(BA => BA.NAME === event.target.value))}}>
                                    {
                                        BAs.sort((a, b) => (a.NAME.toLowerCase() > b.NAME.toLowerCase()) ? 1 : -1).map(({BA_ID, NAME, BUSINESS_UNIT}) => {
                                            if (BU !== undefined && BUSINESS_UNIT === BU.pipelineID) {
                                                return <option key={BA_ID}>{NAME}</option>
                                            }
                                        })
                                    }
                                </select>
                            </div>

                        </div>
                    </div>
                </div>
            </div >

            {/* modal for Request Demo: */}
            <div className="modal fade" id="modal169" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="modalLabel" aria-hidden="true">
                <div className="modal-dialog modal-xl">
                    <div className="modal-content">
                        <div className="modal-header text-center blue-bg">
                            <h3 className="modal-title text-white center" id="staticBackdropLabel">Schedule Your Demo Today!</h3>
                            <button type="button" className="btn-close text-white" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body fs-6 text-wrap">

                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary text-white" data-bs-dismiss="modal">Close</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Nav;