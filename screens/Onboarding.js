// Import dependencies
import React, { useState, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Pressable,
} from "react-native";
import { validateEmail } from "../utils";
import { AuthContext } from "../AuthContext";

// Onboarding Screen
const Onboarding = () => {
    // Local state (values of form inputs)
    const [firstName, setFirstName] = useState("");
    const [email, setEmail] = useState("");

    // Email validation status
    const isEmailValid = validateEmail(email);

    // useContextInstance
    const { onboard } = useContext(AuthContext);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Image
          style={styles.logo}
          source={require("../images/brand/Logo.png")}
          accessible={true}
          accessibilityLabel={"Little Lemon Logo"}
        />
      </View>
      <View style={styles.welcome}>
            <Text style={[styles.welcomeText]}>Let us get to know you</Text>
      </View>
      <View style={styles.form}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.inputBox}
              value={firstName}
              onChangeText={setFirstName}
              placeholder={"Tilly"}
            />
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.inputBox}
              value={email}
              onChangeText={setEmail}
              placeholder={"tilly.doe@example.com"}
              keyboardType="email-address"
            />
      </View>
      <View style={styles.submit}>
            <Pressable
              style={[styles.btn, isEmailValid ? styles.btnEnabled : styles.btnDisabled]}
              onPress={() => onboard({ firstName, email })}
              disabled={!isEmailValid}
            >
              <Text style={[styles.btntext, isEmailValid ? styles.btntextEnabled : styles.btntextDisabled]}>Next</Text>
            </Pressable>
          </View>
    </KeyboardAvoidingView>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: "#fff",
  },
  header: {
    flex: 0.1,
    padding: 12,
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#dee3e9",
  },
  logo: {
    height: 50,
    width: 150,
    resizeMode: "contain",
  },
  form: {
    flex: 0.5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CBD2D9"
  },
  welcome: {
    flex:0.2,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#CBD2D9",
    color: "#344854"
  },
  welcomeText: {
    color: "#344854",
    fontSize: 24,
  },
  label: {
    color: "#344854",
    fontSize: 24,
    paddingBottom: 20
  },
  inputBox: {
    width: '80%',
    borderWidth: 1,
    paddingHorizontal:20,
    paddingVertical:15,
    fontSize: 20,
    borderRadius: 9,
    borderColor: "#344854",
    backgroundColor: "#CBD2D9",
    borderWidth: 3,
    marginBottom:40
  },

  submit: {
    flex: 0.2,
    alignItems: "flex-end",
    backgroundColor: '#F1F4F7'
  },
  btn: {
    borderRadius: 9,
    marginBottom: 60,
    marginRight: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
    marginTop: 30
  },
  btnDisabled: {
    backgroundColor: "#CBD2D9",
  },
  btnEnabled: {
    backgroundColor: "#F4CE14",
  },
  btntext: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
  },
  btntextDisabled: {
    color: "#465A69"
  },
  btntextEnabled: {
    color: "#495E57"
  },
});

export default Onboarding;