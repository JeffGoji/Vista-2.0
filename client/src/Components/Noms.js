import { useState } from "react";


function Noms() {

    let [returnedNomData, setReturnedNomData,] = useState({ VOLUMEIN: '', VOLUMEOUT: '', END_IMBAL: '', NET_END_IMBAL: '' })
    const getNoms = async (url) => {
        let volInData = await fetch(url, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                'Accept': 'application/json',
            },

        }).then(function (response) {
            // console.log(response);
            return response.json();

        }).then(function (data) {
            // console.log(data.recordset)
            // return data.recordset
            console.log(data.recordset[1])
            return data.recordset[1]

        });

        setReturnedNomData(volInData)

        console.log(returnedNomData);
        //     // setReturnedNomData(volInData.recordset) - this method works
        return getNoms();

    };

    console.log(getNoms);
}
export default Noms;