import { View, Text } from "react-native";
import React from "react";
import MapView from "react-native-maps";
import { Marker } from "react-native-maps";
import tw from "twrnc";
import { useSelector } from "react-redux";
import { selectOrigin } from "../slices/navSlice";
const MapScreen = () => {
  const origin = useSelector(selectOrigin);
  return (
    <View style={tw`h-full flex`}>
      <View style={tw`h-2/3`}>
        <MapView
          mapType="mutedStandard"
          style={tw`flex-1`}
          initialRegion={{
            latitude: origin.lat,
            longitude: origin.long,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            coordinate={{ latitude: origin.lat, longitude: origin.long }}
            title={"Me"}
            description={"My Current Location"}
          />
        </MapView>
      </View>
      <View style={tw`h-1/3`}></View>
    </View>
  );
};

export default MapScreen;
