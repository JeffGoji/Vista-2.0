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
const getData = async (req) => {
    try {
        let getData = await sql.connect(config);
        let facilityData = getData.request().query("SELECT * from ENT_FACILITY WHERE LATITUDE != 0 AND LONGITUDE < 0 AND LATITUDE < 42")
        return facilityData;
    }
    catch (err) {
        console.log(err);
    }
}

//Nomination Call (original):
const getNoms = async () => {
    try {
        let getNoms = await sql.connect(config);
        let noms = await getNoms.request().query("SELECT * from ENT_PT_BALANCE")
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
        return data;
    }
    catch (err) {
        console.log(err)
    }
}
console.log(getBidPkg);

// api call to get measurment point data
const getMeasPts = async () => {
    try {
        let sqlconnection = await sql.connect(config)
        let data = sqlconnection.request().query("SELECT * FROM ENT_MEAS_PT WHERE STATION_FAC_KEY != 0 AND STATION_FAC_KEY IS NOT NULL AND LATITUDE > 0 AND LONGITUDE < 0")
        return data
    } catch (err) {
        console.log(err)
    }
}

// api call to get allocation processes
const getAllocProcesses = async (req) => {
    try {
        let sqlconnection = await sql.connect(config)
        let data = ""
        let queriesExist = Object.keys(req.query).length !== 0 ? true : false
        if (queriesExist) {
            let facKey = req.query.facKey
            data = sqlconnection.request().query("SELECT * FROM ENT_ALLOC_PROCESS WHERE FAC_KEY = " + facKey)
        } else {
            data = sqlconnection.request().query("SELECT * FROM ENT_ALLOC_PROCESS")
        }
        return data
    } catch (err) {
        console.log(err)
    }
}

const getProcessProcess = async (req) => {
    try {
        let sqlconnection = await sql.connect(config)
        let data = ""
        let queriesExist = Object.keys(req.query).length !== 0 ? true : false
        if (queriesExist) {
            let allocNetworkKey = req.query.allocNetworkKey
            data = sqlconnection.request().query("SELECT * FROM ENT_PROCESS_PROCESS WHERE FR_ALLOC_NETWORK_KEY = " + allocNetworkKey)
        } else {
            data = sqlconnection.request().query("SELECT * FROM ENT_PROCESS_PROCESS")
        }
        return data
    } catch (err) {
        console.log(err)
    }
}

const getAllocNetwork = async (req) => {
    try {
        let sqlconnection = await sql.connect(config)
        let data = sqlconnection.request().query("SELECT * FROM ENT_ALLOC_NETWORK WHERE EXISTS ( SELECT * FROM ENT_FACILITY WHERE ENT_ALLOC_NETWORK.DEC_UNIT_KEY = ENT_FACILITY.DEC_UNIT_KEY AND ENT_FACILITY.LATITUDE != 0 )")
        return data
    } catch (err) {
        console.log(err)
    }
}

//Pipelines API:
const getPipelines = async () => {
    try {
        let getPipelines = await sql.connect(config);
        let data = getPipelines.request().query("SELECT * from ENT_PIPELINES")
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err)
    }
}
console.log(getPipelines);


//Get ENT_MEAS_PT:
const getMeasurePoints = async () => {
    try {
        let getMeasurePoints = await sql.connect(config);
        let data = getMeasurePoints.request().query("SELECT * from ENT_MEAS_PT")
        console.log(data);
        return data;
    }
    catch (err) {
        console.log(err)
    }
}
// "SELECT * from ENT_MEAS_PT WHERE METERNO = " + meter_key + ""
console.log(getMeasurePoints);

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
    getBidPkg,
    getMeasPts,
    getAllocProcesses,
    getProcessProcess,
    getAllocNetwork,
    getPipelines,
    getMeasurePoints
}