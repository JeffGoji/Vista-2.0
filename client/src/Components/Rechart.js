import { useState, useEffect } from 'react';
import { LineChart, Line } from 'recharts';

export function Rechart() {
    const [isLoading, setIsLoading] = useState(true)
    const [returnedMeter, setMeterData] = useState({})

    useEffect(() => {
        setIsLoading(true)
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

            });

    }, []);
    console.log(returnedMeter)

    if (isLoading) {
        return <p>Loading....</p>
    }

    return (
        <div>
            <LineChart width={400} height={"auto"} data={returnedMeter}>
                <Line type="monotone" dataKey="DAILY_VOL" stroke="#8884d8" strokeWidth="2" />
                <Line type="monotone" dataKey="ENERGY" stroke="#8884d8" strokeWidth="2" />
            </LineChart>

        </div>
    )
}