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
import { createUserWithEmailAndPassword } from "firebase/auth";
import {
  query,
  collection,
  doc,
  getDocs,
  where,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../firebaseConfig";
import { Input, CheckBox } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";

const SignUp = ({ navigation }) => {
  const [value, setValue] = React.useState({
    email: "",
    password: "",
    name: "",
    driver: false,
    error: "",
  });
  async function signUp() {
    if (value.email === "" || value.password === "" || value.name === "") {
      setValue({
        ...value,
        error: "Please fill in the required fields",
      });
      return;
    }
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        value.email,
        value.password
      );
      const user = result.user;
      const q = query(collection(db, "users"), where("uid", "==", user.uid));
      const docs = await getDocs(q);
      if (docs.docs.length === 0) {
        const result = await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          name: value.name,
          driver: value.driver,
          driverStatus: null,
        });
      }
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
            placeholder="Full Name"
            value={value.name}
            onChangeText={(text) => setValue({ ...value, name: text })}
            leftIcon={<Icon name="envelope" size={16} />}
          />
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
          <CheckBox
            style={tw`text-left`}
            title="Driver"
            checked={value.driver}
            onPress={() => setValue({ ...value, driver: !value.driver })}
          />
          <TouchableOpacity
            onPress={signUp}
            style={tw`w-full mt-3 bg-black py-3 rounded`}
          >
            <Text style={tw`text-lg text-white text-center`}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS == "android" ? StatusBar.currentHeight : 0,
  },
});
