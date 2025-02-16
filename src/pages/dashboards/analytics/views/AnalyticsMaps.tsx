import React, { useState } from 'react';
import { GoogleMap, Marker, InfoWindow, Polyline, useJsApiLoader } from '@react-google-maps/api';

const AnalyticsMaps = ({ locations }: any) => {
    const [selectedTrip, setSelectedTrip] = useState(null);
    const { isLoaded } = useJsApiLoader({
        id: 'google-maps-script',
        googleMapsApiKey: 'AIzaSyCMQSbtDZ6hYTs2ICUAumPTr0GtVMvtSbk',
    });

    const mapStyles = {
        height: "100vh",
        width: "100%"
    };

    const defaultCenter = {
        lat: 40.712776,
        lng: -74.005974
    };

    const handleMarkerClick = (trip: any) => {
        setSelectedTrip(trip);
      };
    
    const handleInfoWindowClose = () => {
        setSelectedTrip(null);
    };
    
    if (!isLoaded) {
        return <div>Loading...</div>;
    }
    
    return (
        <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={10}
            center={defaultCenter}
        >
            {locations.map((location: any, index: any) => (
                <React.Fragment key={index}>
                    <Marker
                    position={{ lat: parseFloat(location.pickup_latitude), lng: parseFloat(location.pickup_longitude) }}
                    onClick={() => handleMarkerClick(location)}
                />
                <Marker
                    icon={{
                        path: "M-1.547 12l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM0 0q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
                        fillColor: "blue",
                        fillOpacity: 0.6,
                        strokeWeight: 0,
                        rotation: 0,
                        scale: 2,
                        anchor: new google.maps.Point(0, 20),
                    }}
                    position={{ lat: parseFloat(location.dropoff_latitude), lng: parseFloat(location.dropoff_longitude) }}
                    onClick={() => handleMarkerClick(location)}
                />
                <Polyline
                    path={[
                    { lat: parseFloat(location.pickup_latitude), lng: parseFloat(location.pickup_longitude) },
                    { lat: parseFloat(location.dropoff_latitude), lng: parseFloat(location.dropoff_longitude) },
                    ]}
                    options={{
                    strokeColor: '#FF0000',
                    strokeOpacity: 5,
                    strokeWeight: 5,
                    }}
                />
                </React.Fragment>
            ))}

            {selectedTrip && (
                <InfoWindow
                position={{ lat: selectedTrip.pickup_latitude, lng: selectedTrip.pickup_longitude }}
                onCloseClick={handleInfoWindowClose}
                >
                <div>
                    <h2>Trip Details</h2>
                    <p>Vendor ID: {selectedTrip.vendor_id}</p>
                    <p>Pickup Date/Time: {selectedTrip.pickup_datetime}</p>
                    <p>Dropoff Date/Time: {selectedTrip.dropoff_datetime}</p>
                    <p>Passenger Count: {selectedTrip.passenger_count}</p>
                    <p>Trip Distance: {selectedTrip.trip_distance}</p>
                    <p>Payment Type: {selectedTrip.payment_type}</p>
                    <p>Fare Amount: {selectedTrip.fare_amount}</p>
                    <p>MTA Tax: {selectedTrip.mta_tax}</p>
                    <p>Tip Amount: {selectedTrip.tip_amount}</p>
                    <p>Tolls Amount: {selectedTrip.tolls_amount}</p>
                    <p>Total Amount: {selectedTrip.total_amount}</p>
                    <p>Improvement Surcharge: {selectedTrip.imp_surcharge}</p>
                    <p>Rate Code: {selectedTrip.rate_code}</p>
                </div>
                </InfoWindow>
            )}
        </GoogleMap>
    );
};

export default AnalyticsMaps;