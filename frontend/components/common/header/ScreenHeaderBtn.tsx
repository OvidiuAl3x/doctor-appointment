import React from "react";
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  Text,
  TouchableOpacity,
} from "react-native";
import { SIZES } from "../../../constants";
import styles from "./screenheader.style";

type ScreenHeaderBtnProps = {
  dimension: number;
  iconUrl: ImageSourcePropType;
};

export default function ScreenHeaderBtn({
  dimension,
  iconUrl,
}: ScreenHeaderBtnProps) {
  const imageStyle: StyleProp<ImageStyle> = {
    height: dimension,
    width: dimension,
    padding: SIZES.medium,
  };

  return (
    <TouchableOpacity style={styles.btnContainer}>
      <Image source={iconUrl} style={imageStyle} />
    </TouchableOpacity>
  );
}

// here https://youtu.be/mJ3bGvy0WAY?t=2084
