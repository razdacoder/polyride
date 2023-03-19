import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  TouchableOpacity,
  Image,
} from "react-native";
import tw from "twrnc";
import React from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { Input } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const SignIn = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    error: "",
  });
  async function signIn() {
    if (value.email === "" || value.password === "" || value.name === "") {
      setValue({
        ...value,
        error: "Please fill in the required fields",
      });
      return;
    }
    try {
      await signInWithEmailAndPassword(auth, value.email, value.password);
    } catch (error) {
      setValue({
        ...value,
        error: error.message,
      });
    }
  }
  return (
    <SafeAreaView style={[tw`bg-white h-full`, styles.container]}>
      <View style={tw`flex h-full w-full`}>
        <View style={tw`h-2/4 flex justify-center items-center`}>
          <Image source={require("./../assets/logo.jpeg")} />
          <Text style={tw`text-2xl mt-3 font-bold`}>Polyride</Text>
        </View>
        {!!value.error && (
          <View>
            <Text style={tw`text-red-500 text-center`}>{value.error}</Text>
          </View>
        )}
        <View style={tw`h-2/4 flex w-full px-5`}>
          <Input
            placeholder="Email"
            value={value.email}
            onChangeText={(text) => setValue({ ...value, email: text })}
            leftIcon={<Icon name="envelope" size={16} />}
          />
          <Input
            placeholder="Password"
            value={value.password}
            onChangeText={(text) => setValue({ ...value, password: text })}
            secureTextEntry={true}
            leftIcon={<Icon name="key" size={16} />}
          />

          <TouchableOpacity
            onPress={signIn}
            style={tw`w-full mt-3 bg-black py-3 rounded`}
          >
            <Text style={tw`text-lg text-white text-center`}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});
