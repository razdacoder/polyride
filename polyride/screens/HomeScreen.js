import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { useState, useEffect } from "react";
import { Icon } from "react-native-elements";
import tw from "twrnc";
import * as Location from "expo-location";
import { useDispatch, useSelector } from "react-redux";
import { setOrigin, selectOrigin } from "../slices/navSlice";
import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { selectUser, setUser } from "../slices/authSlice";

const HomeScreen = ({ navigation }) => {
  const [errorMsg, setErrorMsg] = useState(null);
  const origin = useSelector(selectOrigin);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      dispatch(
        setOrigin({
          lat: location.coords.latitude,
          long: location.coords.longitude,
        })
      );
    })();
  }, []);
  if (errorMsg) {
    text = errorMsg;
  } else if (origin) {
    text = JSON.stringify(origin);
  }
  const places = [
    "Main Gate",
    "Beautiful Gate",
    "Complex",
    "B Block",
    "Auditorium 1",
  ];
  return (
    <View style={tw`px-3 pt-3`}>
      <View style={tw``}>
        <Text style={tw`text-3xl font-bold`}>Choose your destination</Text>
      </View>
      <View style={tw`flex h-full py-4 `}>
        <FlatList
          data={places}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate("MapScreen")}
              style={tw`bg-gray-300 mb-5 flex flex-row justify-between py-4 px-3 rounded `}
            >
              <Text style={tw`text-lg font-bold`}>{item}</Text>
              <Icon name="chevron-right" type="material" />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item}
        />

        <TouchableOpacity>
          <Text>Beautiful Gate</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeScreen;
