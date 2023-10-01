import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  Button,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

function GetAttendanceScreen() {
  const [attendance, setAttendance] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today's date
  const token = useSelector((state) => state.auth.token);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const date = new Date();

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false); // close date picker for Android
    setSelectedDate(currentDate.toISOString().split("T")[0]);
  };

  useEffect(() => {
    fetch("https://ams-back.vercel.app/api/attendance?date=" + selectedDate, {
      headers: {
        Authorization: token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAttendance(data);
      })
      .catch((error) => console.error("Error fetching attendance:", error));
  }, [selectedDate]);
  const groupedAttendanceByDepartment = attendance.reduce((acc, record) => {
    const { department, year } = record;
    if (!acc[department]) {
      acc[department] = {};
    }
    if (!acc[department][year]) {
      acc[department][year] = [];
    }
    acc[department][year].push(record);
    return acc;
  }, {});

  const aggregateDataByDepartment = Object.entries(
    groupedAttendanceByDepartment
  ).reduce((acc, [department, yearRecords]) => {
    acc[department] = { total: 0, present: 0, absent: 0 };
    Object.values(yearRecords).forEach((records) => {
      records.forEach((record) => {
        acc[department].total += record.total;
        acc[department].present += record.present;
        acc[department].absent += record.absent;
      });
    });
    return acc;
  }, {});

  return (
    <ScrollView style={styles.container}>
      <View>
        <View className="flex flex-row justify-center space-x-3 py-3 bg-[#009FF8]">
          <Image
            className="h-10 w-10"
            source={{
              uri: "https://blogger.googleusercontent.com/img/a/AVvXsEjmL38K-8tCjcNKGjvAGHeVHkyN8t1lo68bXI2oqe2WVp8RVuF9ombU-79T9guiG2Z4FRk18nhzTWz5-ZkPpy993uWl7D59MyfLyfz0I5d4fKH2XuKhSC0h9SqofVdxzM-lplb8s_pCCZk3sUyccrZEL3uWAkliNXGUWWX_uCg6txRFRASiN-24sUvaUT0",
            }}
          />
          <Text className="pt-1" style={styles.title}>
            JEC-AMS
          </Text>
        </View>
        <Text className="text-center text-blue-600 font-semibold text-lg my-2">
          You can view the Entire Department's Attendance here.
        </Text>
        <View className=" flex flex-row justify-center">
          <Button title="Choose Date" onPress={() => setShowDatePicker(true)} />
          <Text className="pt-1 text-lg"> : {selectedDate}</Text>
        </View>

        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={new Date(selectedDate)}
            mode="date"
            display="default"
            maximumDate={new Date(date)}
            onChange={handleDateChange}
          />
        )}
      </View>
      {attendance.length === 0 ? (
        <Text className="text-center font-bold text-xl text-red-600 mt-5">
          No data available
        </Text>
      ) : (
        <View className="mx-4 my-4">
          {Object.entries(groupedAttendanceByDepartment).map(
            ([department, yearRecords]) => (
              <View
                key={department}
                className="rounded-xl mb-3 border-2 px-3 py-3 border-gray-200"
              >
                <Text style={styles.departmentTitle}>
                  Department: {department}
                </Text>
                {Object.entries(yearRecords).map(([year, records]) => (
                  <View key={year}>
                    <Text style={styles.yearTitle}>Year: {year}</Text>
                    {records.map((record) => {
                      const percentage = (record.present / record.total) * 100;
                      return (
                        <View
                          key={record._id}
                          className=" border rounded-2xl mb-3 border-blue-400 text-center py-4 px-4"
                        >
                          <View>
                            <Text className="text-md">
                              Section: {record.class}
                            </Text>
                          </View>
                          <View style={styles.recordHeader}>
                            <Text style={styles.recordHeaderText}>
                              Total Number of Students: {record.total}
                            </Text>
                            <Text
                              style={[
                                styles.recordHeaderText,
                                percentage < 50
                                  ? styles.redText
                                  : percentage < 75
                                  ? styles.orangeText
                                  : styles.greenText,
                              ]}
                            >
                              {percentage.toFixed(2)}%
                            </Text>
                          </View>
                          <View style={styles.recordSubHeader}>
                            <Text style={styles.recordSubHeaderText}>
                              No. OF PRESENT: {record.present}
                            </Text>
                            <Text style={styles.recordSubHeaderText}>
                              NO. OF ABSENT: {record.absent}
                            </Text>
                          </View>
                          <Text style={styles.absenteesText}>
                            Absentees Roll Numbers: {record.absentees}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ))}
                <View style={styles.departmentSummary}>
                  <Text style={styles.departmentSummaryText}>
                    Total Number of Students in Department:{" "}
                    {aggregateDataByDepartment[department].total}
                  </Text>
                  <Text style={styles.departmentSummaryText}>
                    Total Present:{" "}
                    {aggregateDataByDepartment[department].present}
                  </Text>
                  <Text style={styles.departmentSummaryText}>
                    Total Absent: {aggregateDataByDepartment[department].absent}
                  </Text>
                  <Text
                    style={[
                      styles.departmentSummaryText,
                      (aggregateDataByDepartment[department].present /
                        aggregateDataByDepartment[department].total) *
                        100 <
                      50
                        ? styles.redText
                        : (aggregateDataByDepartment[department].present /
                            aggregateDataByDepartment[department].total) *
                            100 <
                          75
                        ? styles.orangeText
                        : styles.greenText,
                    ]}
                  >
                    Department Percentage:{" "}
                    {(
                      (aggregateDataByDepartment[department].present /
                        aggregateDataByDepartment[department].total) *
                      100
                    ).toFixed(2)}
                    %
                  </Text>
                </View>
              </View>
            )
          )}
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    padding: 20,
    alignItems: "center",
    backgroundColor: "#009FF8",
  },
  headerImage: {
    height: 80,
    width: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitle: {
    fontSize: 16,
    color: "white",
    marginTop: 10,
  },
  dateInput: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  dateText: {
    fontSize: 18,
  },
  content: {
    padding: 20,
  },
  noDataText: {
    fontSize: 18,
    textAlign: "center",
    marginVertical: 20,
  },
  departmentContainer: {
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "lightgray",
    padding: 10,
  },
  departmentTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  yearContainer: {
    marginVertical: 5,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  yearTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  record: {
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    marginBottom: 10,
  },
  recordHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  recordHeaderText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  recordSubHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  recordSubHeaderText: {
    fontSize: 14,
  },
  absenteesText: {
    fontSize: 14,
    marginTop: 5,
  },
  departmentSummary: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  departmentSummaryText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  redText: {
    color: "red",
  },
  orangeText: {
    color: "orange",
  },
  greenText: {
    color: "green",
  },
});

export default GetAttendanceScreen;
