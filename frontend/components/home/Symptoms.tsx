import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS, FONT, SIZES } from "../../constants";

const symptoms = ["Snuffle", "High Fever", "Nauseous", "Covid 19"];

const Symptoms = () => {
  return (
    <View style={{ marginTop: 20 }}>
      <View style={styles.containerSympt}>
        <Text style={{ fontFamily: FONT.bold, fontSize: SIZES.medium }}>
          Your Symptoms?
        </Text>
        <Text style={{ color: COLORS.primary }}>See all</Text>
      </View>
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        {symptoms.map((item, index) => (
          <View key={index} style={styles.containerSympMap}>
            <Text>{item}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default Symptoms;

const styles = StyleSheet.create({
  containerSympt: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  containerSympMap: {
    borderWidth: 2,
    borderColor: COLORS.primary,
    borderRadius: 26,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 10,
  },
});
