import React from "react";
import { useSelector } from "react-redux";
import { View, Text, Image, Button, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

function DashboardScreen() {
  const navigation = useNavigation();
  const email = useSelector((state) => state.auth.email);
  const department = useSelector((state) => state.auth.department);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{
            uri: "https://blogger.googleusercontent.com/img/a/AVvXsEjmL38K-8tCjcNKGjvAGHeVHkyN8t1lo68bXI2oqe2WVp8RVuF9ombU-79T9guiG2Z4FRk18nhzTWz5-ZkPpy993uWl7D59MyfLyfz0I5d4fKH2XuKhSC0h9SqofVdxzM-lplb8s_pCCZk3sUyccrZEL3uWAkliNXGUWWX_uCg6txRFRASiN-24sUvaUT0",
          }}
          style={styles.logo}
        />
        <Text style={styles.title}>JEC - AMS</Text>
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>Welcome {email?.slice(0, -10)}</Text>
          <Text style={styles.departmentText}>Faculty of {department}</Text>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <Button
          title="View Attendance"
          onPress={() => navigation.navigate("GetAttendance")}
        />
        <Text style={styles.orText}>Or</Text>
        <Button
          title="Put Attendance"
          onPress={() => navigation.navigate("AddAttendance")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#009FF8",
  },
  header: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#009FF8",
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: "white",
  },
  welcomeContainer: {
    backgroundColor: "white",
    padding: 20,
    marginTop: 20,
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  departmentText: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  orText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 10,
  },
});

export default DashboardScreen;
