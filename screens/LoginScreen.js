import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  TouchableOpacity,
} from "react-native";
import { useDispatch } from "react-redux";
import { login } from "../slice/authSlice"; // Adjust the path based on your folder structure
import { useNavigation } from "@react-navigation/native";
import { ToastAndroid } from "react-native";

function LoginScreen() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    const response = await fetch("https://ams-back.vercel.app/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      dispatch(
        login({
          token: data.token,
          role: data.role,
          email: data.email,
          department: data.department,
        })
      );
      ToastAndroid.show("Login Successful!", ToastAndroid.SHORT);
      navigation.navigate("DashboardScreen");
    } else {
      console.error("Login failed");
      ToastAndroid.show("Login Failed!", ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      {/* Logo and title ... */}
      <View style={styles.loginContainer}>
        <Text style={styles.title}>Login here!</Text>
        <TextInput
          style={styles.input}
          placeholder="Email address"
          value={formData.email}
          onChangeText={(value) => handleInputChange("email", value)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => handleInputChange("password", value)}
          secureTextEntry
        />
        <Button title="Login" onPress={handleSubmit} />
        <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.registerText}>
            Don’t have an account? Sign up!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    width: "80%",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  registerText: {
    color: "blue",
    textAlign: "center",
    marginTop: 20,
  },
});

export default LoginScreen;
