import React from 'react'
import { useEffect, useState } from 'react'

function Table() {

    //State for handling loading:
    const [isLoading, setIsLoading] = useState(true)
    //State for handling data:
    const [bidData, setBidData] = useState([])
    useEffect(() => {
        fetch('./bidPkg')
            .then(response => {
                return response.json();

            })
            .then(biddata => {
                setBidData(biddata.recordsets[0])
                console.log(biddata);
            });
    }, []);

    if (isLoading) {
        return <p>Loading....</p>
    };

    return (

        <div className="p-2">

        </div>



    )
}

export default Table