import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const Index = () => {
  const navigation = useNavigation<any>();

  useEffect(() => {
    const checkTokenAndRedirect = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          // Token exists, navigate to the home screen
          navigation.navigate("screens/Home");
        } else {
          // Token doesn't exist, navigate to the login screen
          navigation.navigate("screens/Login");
        }
      } catch (error) {
        console.error("Error retrieving token from AsyncStorage:", error);
      }
    };

    checkTokenAndRedirect();
  }, []); // Run this effect only once on app startup

  // ... rest of your app code
};

export default Index;
