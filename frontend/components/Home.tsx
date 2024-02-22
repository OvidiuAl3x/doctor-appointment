import { View, Text } from "react-native";
import React from "react";

type Style = {
  design: {
    color: string;
    fontSize: number;
  };
};

export default function Home({ design }: Style) {
  return (
    <View>
      <Text style={design}>Home</Text>
    </View>
  );
}
