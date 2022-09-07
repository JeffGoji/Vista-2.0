
import { useState } from 'react'

//Original Map idea for the right-click menu:
// import Map from '../Map'

//New right click menu:
import EventMap from '../EventMap'

//Chart Imports:
// import BarChart from '../BarChart'
// import LineChart from '../LineChart'
import PieChart from '../PieChart'
import ApiData from '../ApiData'

//GET API experiment:
import { UserData } from '../Data'

//Get Bar graph with built in API experiment:
import BarChart2 from '../PieChart2'

import NetworkGraph from '../NetworkGraph'


function Main() {
    // eslint-disable-next-line no-unused-vars
    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [{
            label: "Users Gained",
            data: UserData.map((data) => data.userGain),
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,

        }]
    });

    // eslint-disable-next-line no-unused-vars
    const [oilData, setOilData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [{
            labels: "Users Lost",
            data: UserData.map((data) => data.userLost),
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,
        }]

    })

    // eslint-disable-next-line no-unused-vars
    const [pieData, setPieData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [{
            label: "Pie's eaten",
            data: UserData.map((data) => data.userLost),
            backgroundColor: [
                "rgba(75,192,192,1)",
                "#ecf0f1",
                "#50AF95",
                "#f3ba2f",
                "#2a71d0",
            ],
            borderColor: "black",
            borderWidth: 2,

        }]

    })


    return (
        <>
            <div className="row justify-content-center">
                <div className="col-lg-2 col-md-3 col-sm-12 text-center">
                    {/* <Data1 />
                    <br /> */}
                    <PieChart chartData={pieData} />
                    <br />
                    <ApiData />
                </div>
                <div className="col-lg-8 col-md-6 col-sm-12 text-center rounded p-2 window-border"> Middle Screen (Map)

                    <NetworkGraph />

                </div>
                <div className="col-lg-2 col-md-3 col-sm-12 text-center">
                    {/* <BarChart chartData={userData} />
                    <LineChart chartData={oilData} /> */}
                    <BarChart2 style={{ maxHeight: "40px" }} />
                </div>
                {/* <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center bg-warning">
                    </div>
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center bg-success bg-dark text-white"> Screen 5
                        <div><h2>Screen will display data here</h2></div></div>
                    <div className="col-lg-4 col-md-4 col-sm-12 text-center bg-primary pb-5"> Screen 6
                        <div><h2>Screen will display data here</h2></div>
                    </div>
                </div> */}
            </div>
        </>)
}

export default Main;