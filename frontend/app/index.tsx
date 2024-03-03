import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView, ScrollView, View } from "react-native";
import Search from "../components/home/Search";
import Template from "../components/home/Template";
import { COLORS, SIZES } from "../constants";

const Index = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (!token) {
          navigation.navigate("screens/Login");
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      }
    };

    checkTokenAndRedirect();
  }, []); // Run this effect only once on app startup

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

export default Index;
