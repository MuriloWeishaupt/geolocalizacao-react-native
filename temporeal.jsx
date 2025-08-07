import MapView, { Marker } from "react-native-maps";
import { styles } from "./style";

import {
    requestForegroundPermissionsAsync,
    getCurrentPositionAsync,
    watchPositionAsync,
    LocationAcurracy,
} from "expo-location";
import { use, useEffect, useState, useRef } from "react";
import { View } from "react-native";

export default function TempoReal() {
    const [location, setLocation] = useState(null);
    const mapRef = useRef(null);

    async function requestLocationPermissions() {
        const { granted } = await requestForegroundPermissionsAsync();

        if (granted) {
            const currentPosition = await getCurrentPositionAsync()
                setLocation(currentPosition);
                console.log("Localização atual:", currentPosition);
            };
        }

        useEffect(() => {
            requestLocationPermissions();
        }, []); 

        useEffect(() => {
            const subscribe = async () => {
                await watchPositionAsync(
                    {
                        accuracy: LocationAcurracy.High,
                        timeInterval: 1000,
                        distanceInterval: 1,
                    },

                    (response) => {
                        console.log("Nova localização:", response);
                        setLocation(response);
                        mapRef.current?.animateCamera({
                            pitch: 70,
                            center: response.coords,
                        });
                    }
                );
            };

            subscribe();
        }, []);

        return (
            <View style={styles.container}>
                {location && (
                    <MapView
                        ref={mapRef}
                        style={styles   .map}
                        mapType="standard"
                        showsBuildings={true}
                        initialRegion={{
                            latitude: location.coords.latitude,
                            longitude: location.coords.longitude,
                            latitudeDelta: 0.005,
                            longitudeDelta: 0.005,
                        }}
                    >
                        <Marker
                            coordinate={{
                                latitude: location.coords.latitude,
                                longitude: location.coords.longitude,
                            }}
                            title="Você está aqui"
                    />
                    </MapView>
                )}
            </View>
        )

}
