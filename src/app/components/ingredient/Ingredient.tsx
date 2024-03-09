import React from "react";
import { Image, Pressable, PressableProps, Text } from "react-native";
import { styles } from "./styles";

export type IngredientProps = {
  name: string;
  image: string;
  selected?: boolean;
};

export function Ingredient({
  name,
  image,
  selected,
  ...rest
}: IngredientProps & PressableProps) {
  return (
    <Pressable style={[styles.container, selected && styles.selected]} {...rest}>
      <Image source={require("@/assets/snack.png")} style={styles.image} />
      <Text style={styles.title}>Ingredient</Text>
    </Pressable>
  );
}
