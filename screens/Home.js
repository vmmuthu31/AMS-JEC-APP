import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          style={styles.logo}
          source={{
            uri: "https://blogger.googleusercontent.com/img/a/AVvXsEjmL38K-8tCjcNKGjvAGHeVHkyN8t1lo68bXI2oqe2WVp8RVuF9ombU-79T9guiG2Z4FRk18nhzTWz5-ZkPpy993uWl7D59MyfLyfz0I5d4fKH2XuKhSC0h9SqofVdxzM-lplb8s_pCCZk3sUyccrZEL3uWAkliNXGUWWX_uCg6txRFRASiN-24sUvaUT0",
          }}
        />
        <Text style={styles.title}>JEC - AMS</Text>
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.description}>
          A seamless platform for faculties to record and manage student
          attendance...
        </Text>
        {/* Description and buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.button, styles.loginButton]}
            onPress={() => navigation.navigate("LoginScreen")}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.registerButton]}
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.buttonText}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009FF8",
    alignItems: "center",
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  descriptionContainer: {
    padding: 30,
    backgroundColor: "white",
    borderRadius: 10,
  },
  description: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  button: {
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 5,
  },
  loginButton: {
    backgroundColor: "#4F14FF",
  },
  registerButton: {
    backgroundColor: "#DC2626",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Home;
