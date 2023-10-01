import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  Button,
  Image,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useSelector } from "react-redux";

function AddAttendanceScreen() {
  const token = useSelector((state) => state.auth.token);
  const department = useSelector((state) => state.auth.department);
  const currentDate = new Date().toISOString().split("T")[0];

  const initialFormData = {
    date: currentDate,
    class: "",
    total: "",
    department: department,
    present: "",
    year: "1",
    absentees: "",
    absent: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const absent = formData.total - formData.present;
  formData.absent = absent.toString();

  const showToast = (message) => {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
  };

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const navigation = useNavigation();
  const handleSubmit = async () => {
    const response = await fetch("https://ams-back.vercel.app/api/attendance", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(formData),
    });
    if (response.ok) {
      showToast("Uploaded the attendance!");
      setFormData(initialFormData);

      navigation.navigate("DashboardScreen");
    } else {
      console.error(" failed");
      showToast("Failed to upload the attendance!");
    }
  };

  return (
    <View>
      <View className="flex flex-row justify-center space-x-3 py-3 bg-[#009FF8]">
        <Image
          className="h-10 w-10"
          source={{
            uri: "https://blogger.googleusercontent.com/img/a/AVvXsEjmL38K-8tCjcNKGjvAGHeVHkyN8t1lo68bXI2oqe2WVp8RVuF9ombU-79T9guiG2Z4FRk18nhzTWz5-ZkPpy993uWl7D59MyfLyfz0I5d4fKH2XuKhSC0h9SqofVdxzM-lplb8s_pCCZk3sUyccrZEL3uWAkliNXGUWWX_uCg6txRFRASiN-24sUvaUT0",
          }}
        />
        <Text className="pt-1 text-white font-bold text-xl">JEC-AMS</Text>
      </View>
      <Text className="text-center text-blue-600 font-semibold text-lg my-2">
        Please select the Year and update your department attendance for today.
      </Text>

      <View className="mx-6 mt-5">
        <Text>Year</Text>
        <View style={styles.pickerContainer}>
          <Picker
            selectedValue={formData.year}
            onValueChange={(value) => handleInputChange("year", value)}
          >
            <Picker.Item label="Select Year" value="" />
            <Picker.Item label="1" value="1" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="4" value="4" />
          </Picker>
        </View>
        {/* Sample TextInput for 'class' */}
        <Text>Section</Text>
        <TextInput
          value={formData.class}
          onChangeText={(value) => handleInputChange("class", value)}
          style={styles.input}
          placeholder="Enter Section"
        />
        <Text>Total Students</Text>
        <TextInput
          value={formData.total}
          onChangeText={(value) => handleInputChange("total", value)}
          style={styles.input}
          placeholder="Enter Total Students"
        />
        <Text>Students Present</Text>
        <TextInput
          value={formData.present}
          onChangeText={(value) => handleInputChange("present", value)}
          style={styles.input}
          placeholder="  Students Present"
        />
        <Text>Absentees Number</Text>
        <TextInput
          value={formData.absentees}
          onChangeText={(value) => handleInputChange("absentees", value)}
          style={styles.input}
          placeholder="Absentees Number"
        />
        <Text className="my-1">
          {" "}
          Absentee Count:{formData.total - formData.present}{" "}
        </Text>
        {/* You can add other input fields similarly */}
        <Button
          className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          title="Upload"
          onPress={handleSubmit}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  title: {
    fontSize: 16,
    marginBottom: 16,
  },
  pickerContainer: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    borderRadius: 4, // Optional for rounded corners
  },
  form: {
    // ... additional styles
  },
  input: {
    height: 50,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    padding: 10,
  },
  // ... other styles
});

export default AddAttendanceScreen;
