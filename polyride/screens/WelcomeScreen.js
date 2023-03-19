import {
  View,
  Text,
  StyleSheet,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Button } from "react-native-elements";
import tw from "twrnc";

const WelcomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={[tw`bg-white h-full`, styles.container]}>
      <View style={tw`flex h-full w-full px-5`}>
        <View style={tw`h-3/4 flex justify-center items-center`}>
          <Image source={require("./../assets/logo.jpeg")} />
          <Text style={tw`text-2xl mt-3 font-bold`}>Polyride</Text>
        </View>
        <View style={tw`h-1/4 w-full flex gap-y-3 justify-center items-center`}>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignUp")}
            style={tw`w-full bg-black py-3 rounded`}
          >
            <Text style={tw`text-lg text-white text-center`}>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("SignIn")}
            style={tw`w-full bg-black py-3 rounded`}
          >
            <Text style={tw`text-lg text-white text-center`}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  buttons: {
    flex: 1,
  },

  button: {
    marginTop: 10,
  },
});

export default WelcomeScreen;
