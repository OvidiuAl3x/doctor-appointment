import { Image, TouchableOpacity } from "react-native";
import React from "react";
import { COLORS, icons } from "../../../constants";

const HeaderRight = () => {
  return (
    <TouchableOpacity>
      <Image
        source={icons.heart}
        style={{ width: 30, height: 30, tintColor: COLORS.primary }}
      />
    </TouchableOpacity>
  );
};

export default HeaderRight;
