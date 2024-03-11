import React from "react";
import { ScrollView } from "react-native";

import { services } from "@/services";
import { Ingredient, IngredientProps } from "../Ingredient";
import { styles } from "./styles";

type IngredientsProps = {
  ingredients: IngredientProps[];
};

export function Ingredients({ ingredients }: IngredientsProps) {
  return (
    <ScrollView
      horizontal
      style={styles.container}
      contentContainerStyle={styles.ingredientsContent}
      showsHorizontalScrollIndicator={false}
    >
      {ingredients.map((item) => (
        <Ingredient
          key={item.name}
          name={item.name}
          image={`${services.storage.imagePath}/${item.image}`}
        />
      ))}
    </ScrollView>
  );
}
