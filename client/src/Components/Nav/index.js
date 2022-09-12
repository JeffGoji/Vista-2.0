
import logo1 from '../../assets/img/logo.png'
// you will need link and withRouter from react router dom
// import { Link } from 'react-router-dom';

import { NavLink } from 'react-router-dom'
// import Auth from '../../utils/auth';
import '../../index.css'


export const Nav = () => {

    return (
        <>
            <div className="navbar navbar-expand-lg navbar-light bg-light text-white">
                <div className="container-fluid">

                    <NavLink className="navbar-brand" to="/">
                        <img src={logo1}
                            alt="Company Logo"
                            style={{ width: '40%' }}
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
                                    <li>
                                        <NavLink className="dropdown-item" to="gastar-risk">Gastar Risk</NavLink>
                                    </li>
                                </ul>
                            </li>

                            <li className={"ms-lg-3"}>
                                <NavLink to="/about"><button className='btn btn-md btn-primary'>New Network</button></NavLink>
                            </li>
                            <li className={"ms-lg-3"}>
                                <NavLink to="newsstand"><button className='btn btn-md btn-success'>Save Network</button></NavLink>
                            </li>
                            <li className={"ms-lg-3"}>
                                <NavLink to='contact'><button className='btn btn-md btn-warning'>Edit Network</button></NavLink>
                            </li>
                            <li className={"ms-lg-3"}>
                                <NavLink to='contact'><button className='btn btn-md btn-danger'>Delete Network</button></NavLink>
                            </li>
                        </div>
                    </div>
                </div>
            </div >
            {/* // modal for Request Demo: */}

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