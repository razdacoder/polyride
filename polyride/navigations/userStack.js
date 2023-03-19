import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Avatar } from "react-native-elements";
import HomeScreen from "../screens/HomeScreen";
import MapScreen from "../screens/MapScreen";
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { selectUser, setUser } from "../slices/authSlice";

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      dispatch(
        setUser({
          uid: docSnap.id,
          ...docSnap.data(),
        })
      );
    })();
  });

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            headerTitle: "Polyride",
            headerRight: () => (
              <Avatar
                size={32}
                rounded
                title="RR"
                containerStyle={{ backgroundColor: "black" }}
              />
            ),
          }}
        />
        <Stack.Screen
          name="MapScreen"
          component={MapScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AuthStack;
