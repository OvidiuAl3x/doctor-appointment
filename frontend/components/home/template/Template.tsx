import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";

import styles from "./template.style";
import { icons, SIZES } from "../../../constants";

const jobTypes = ["Full-time", "Part-time", "Contractor"];

const Template = () => {
  const router = useRouter();
  const [activeJobType, setActiveJobType] = useState("Full-time");

  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.userName}>Hello Adrian</Text>
        <Text style={styles.welcomeMessage}>Find your perfect job</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchWrapper}>
          <TextInput
            style={styles.searchInput}
            placeholder="What are you looking for?"
          />
        </View>

        <TouchableOpacity style={styles.searchBtn}>
          <Image
            source={icons.menu}
            resizeMode="contain"
            style={styles.searchBtnImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// https://youtu.be/mJ3bGvy0WAY?t=2500

export default Template;
