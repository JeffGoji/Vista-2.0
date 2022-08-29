const { columns } = require('mssql')
const config = require('./dbConfig')
sql = require('mssql')

//Approved Connection String Method:

// const getData = async () => {
//     try {
//         // make sure that any items are correctly URL encoded in the connection string
//         await sql.connect('Server=10.239.100.228;Database=IGASTESTAD19;User Id=sa;Password=MANAGER;Encrypt=false')
//         let result = await sql.query`select * from ENT_CITY`
//         console.dir(result.json)
//         return result;
//     } catch (err) {
//         // ... error checks
//     }
//     getData();
// }


//First version to test, CITY API call:
const getData = async () => {
    try {
        let getData = await sql.connect(config);
        let cityData = getData.request().query("SELECT * from ENT_CITY")
        console.log(cityData);
        return cityData;
    }
    catch (err) {
        console.log(err);
    }
}
console.log(getData);

//Nomination Call (original):
const getNoms = async () => {
    try {
        let getNoms = await sql.connect(config);
        let noms = await getNoms.request().query("SELECT * from ENT_PT_BALANCE")
        console.log(noms);
        return noms;
    }
    catch (error) {
        console.log(error);
    }
}


//ENT_PACKAGE call:
const getEntPkg = async () => {
    try {
        let getEntPkg = await sql.connect(config);
        let data = getEntPkg.request().query("SELECT * from ENT_PACKAGE")
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err)
    }
}
console.log(getEntPkg);

//ENT_BID_PACKAGE api call:
const getBidPkg = async () => {
    try {
        let getBidPkg = await sql.connect(config);
        let data = getBidPkg.request().query("SELECT * from ENT_BID_PKG")
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err)
    }
}
console.log(getBidPkg);

//Built in React Fetch system using the SAME nom call above but simplified:
// const getNoms = () => {
//     const [nomData, setData] = useState([]);
//     useEffect(() => {
//         const fetchNoms = async () => {
//             await sql.connect(config);
//             const responseData = await response.json();
//             console.log(responseData);
//             //create an array from the Json Object and a for-in loop to gor through the data:
//             const loadedData = []
//             for (const key in responseData) {
//                 loadedData.push({
//                     id: key,
//                     volumein: responseData[key].VOLUMEIN,
//                     volumeout: responseData[key].VOLUMEOUT
//                 })
//             }
//             setData(loadedData);
//         };

//         fetchNoms();
//     }, [])
// }


module.exports = {
    getData,
    getNoms,
    getEntPkg,
    getBidPkg
}