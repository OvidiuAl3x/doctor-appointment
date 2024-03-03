import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import { COLORS, SIZES, icons } from "../../constants";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import Search from "../../components/home/Search";
import Template from "../../components/home/Template";

type MyJwtPayload = {
  userId: string;
};

type UserData = {
  firstName: string;
  lastName: string;
};

const Home = () => {
  const [data, setData] = useState<UserData | null>(null);

  // useEffect(() => {
  //   const fetchUserId = async () => {
  //     try {
  //       const storedToken = await AsyncStorage.getItem("token");
  //       if (storedToken) {
  //         const decodedToken = jwtDecode<MyJwtPayload>(storedToken);
  //         const userIdFromToken = decodedToken.userId;

  //         const response = await axios.get(
  //           `http://192.168.100.18:5555/patients/${userIdFromToken}`
  //         );
  //         setData(response.data);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   fetchUserId();
  // }, []);

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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
export default Home;
