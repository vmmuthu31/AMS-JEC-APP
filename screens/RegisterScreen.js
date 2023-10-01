import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";

function RegisterScreen() {
  const navigation = useNavigation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    department: "B.E AERONAUTICAL ENGINEERING",
    role: "faculty",
  });

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("https://ams-back.vercel.app/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Signup Successful!");
        navigation.navigate("LoginScreen");
      } else {
        console.error("Sign-in failed");
        alert("Signup Failed!");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text onPress={() => navigation.goBack()}>←</Text>
        <Text style={styles.title}>JEC-AMS</Text>
      </View>

      <Text style={styles.subtitle}>Signup here!</Text>

      <TextInput
        style={styles.input}
        placeholder="Email address"
        value={formData.email}
        onChangeText={(value) => handleInputChange("email", value)}
      />
      <Picker
        selectedValue={formData.department}
        onValueChange={(value) => handleInputChange("department", value)}
      >
        <Picker.Item
          label="B.E AERONAUTICAL ENGINEERING"
          value="B.E AERONAUTICAL ENGINEERING"
        >
          B.E AERONAUTICAL ENGINEERING
        </Picker.Item>
        <Picker.Item
          label="B.E CIVIL ENGINEERING"
          value="B.E CIVIL ENGINEERING"
        >
          B.E CIVIL ENGINEERING
        </Picker.Item>
        <Picker.Item
          label="B.E COMPUTER SCIENCE ENGINEERING"
          value="B.E COMPUTER SCIENCE ENGINEERING"
        >
          B.E COMPUTER SCIENCE ENGINEERING
        </Picker.Item>
        <Picker.Item
          label="B.E COMPUTER SCIENCE WITH BUSINESS SYSTEMS"
          value="B.E COMPUTER SCIENCE WITH BUSINESS SYSTEMS"
        >
          B.E COMPUTER SCIENCE WITH BUSINESS SYSTEMS
        </Picker.Item>
        <Picker.Item
          label="B.E ELECTRONICS & COMMUNICATION ENGG."
          value="B.E ELECTRONICS & COMMUNICATION ENGG."
        >
          B.E ELECTRONICS & COMMUNICATION ENGG.
        </Picker.Item>
        <Picker.Item
          label="B.E ELECTRONICS & INSTRUMENTATION ENGG."
          value="B.E ELECTRONICS & INSTRUMENTATION ENGG."
        >
          B.E ELECTRICAL & ELECTRONICS ENGG.
        </Picker.Item>
        <Picker.Item
          label="B.E ELECTRONICS & INSTRUMENTATION ENGG."
          value="B.E ELECTRONICS & INSTRUMENTATION ENGG."
        >
          B.E ELECTRONICS & INSTRUMENTATION ENGG.
        </Picker.Item>
        <Picker.Item
          label="B.E MECHANICAL ENGINEERING"
          value="B.E MECHANICAL ENGINEERING"
        >
          B.E MECHANICAL ENGINEERING
        </Picker.Item>
        <Picker.Item
          label="B.TECH TEXTILE DEPARTMENT"
          value="B.TECH TEXTILE DEPARTMENT"
        >
          B.TECH TEXTILE DEPARTMENT
        </Picker.Item>
      </Picker>
      <Picker
        selectedValue={formData.role}
        onValueChange={(value) => handleInputChange("role", value)}
      >
        <Picker.Item label="Faculty" value="faculty" />
        <Picker.Item label="HOD" value="head" />
      </Picker>
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(value) => handleInputChange("password", value)}
      />

      <Button title="Sign up" onPress={handleSubmit} />

      <Text
        style={styles.link}
        onPress={() => navigation.navigate("LoginScreen")}
      >
        Existing User?
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "white",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "500",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    marginBottom: 15,
  },
  link: {
    color: "blue",
    marginTop: 15,
    textAlign: "right",
  },
});

export default RegisterScreen;
