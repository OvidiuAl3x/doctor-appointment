import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { COLORS, FONT, SIZES, icons } from "../../../constants";

type MyJwtPayload = {
  userId: string;
};

type UserData = {
  firstName: string;
  lastName: string;
};

const HeaderLeft = () => {
  const [data, setData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        // if (storedToken) {
        //   const decodedToken = jwtDecode<MyJwtPayload>(storedToken);
        //   const userIdFromToken = decodedToken.userId;

        const response = await axios.get(
          `http://192.168.100.18:5555/patients/65da20de4fcaa879135c29d9`
        );
        setData(response.data);
        // }
      } catch (err) {
        console.log(err);
      }
    };
    fetchUserId();
  }, []);

  return (
    <TouchableOpacity style={styles.container}>
      <Image source={icons.profile} style={styles.profileImage} />
      <View>
        <Text style={{ color: COLORS.gray, fontSize: SIZES.small }}>
          Welcome!
        </Text>
        <Text style={{ fontSize: SIZES.medium, fontFamily: FONT.bold }}>
          {data?.lastName} {data?.firstName}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
    gap: 5,
  },
  profileImage: {
    width: 40,
    height: 40,
  },
});

export default HeaderLeft;
