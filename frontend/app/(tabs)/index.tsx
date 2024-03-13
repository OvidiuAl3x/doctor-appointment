import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView, View } from "react-native";
import { COLORS, SIZES } from "../../constants";
import Search from "../../components/home/Search";
import Template from "../../components/home/Template";
import Symptoms from "../../components/home/Symptoms";
import Doctors from "../../components/home/Doctors";
import axios from "axios";

type Doctor = {
  _id: number;
  firstName: string;
  lastName: string;
  fieldActivity: string;
  hospital: string;
};

const Index = () => {
  const [data, setData] = useState<Doctor[]>([]);
  const navigation = useNavigation<any>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check token and redirect if not present
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          navigation.navigate("screens/Login");
        }

        // Fetch doctors data
        const res = await axios.get("http://192.168.100.18:5555/doctors");
        setData(res.data.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.background }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View
          style={{
            flex: 1,
            padding: SIZES.medium,
          }}
        >
          <Search />
          <Template />
          <Symptoms />
          <Doctors data={data} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Index;
