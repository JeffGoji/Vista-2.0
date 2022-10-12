import { useMemo } from 'react'
import { GoogleMap, useLoadScript, Polyline } from '@react-google-maps/api'

export default function Map() {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: "AIzaSyCKeEY422ZuBTe73vpjaSySdoJGJ8OX_5Y"
    })
    const renderMap = () => {
        return (
            <GoogleMap zoom={10} center={{ lat: 40, lng: -90 }} mapContainerStyle={{ width: '500px', height: '500px' }}>
                <>
                    <Polyline options={{ strokeColor: 'blue', strokeOpacity: '0.35', strokeWeight: '1' }} path={[{ lat: 40, lng: -90 }, { lat: 40, lng: -91 }]} />
                </>
            </GoogleMap>
        )
    }
    return isLoaded ? renderMap() : <div>Loading...</div>
}