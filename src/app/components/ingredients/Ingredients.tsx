import React, { useState } from "react";
import { ScrollView } from "react-native";
import { Ingredient } from "../ingredient/Ingredient";
import { styles } from "./styles";

export function Ingredients() {
  const [selected, setSelected] = useState<string[]>([]);

  function handleToggleSelected(value: string) {    
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value));
    }

    setSelected([...selected, value]); 
  }

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    >
      {Array.from({ length: 10 }).map((_, index) => (
        <Ingredient
          key={index}
          name="tomate"
          image=""
          selected={selected.includes(String(index))}
          onPress={() => handleToggleSelected(String(index))}
        />
      ))}
    </ScrollView>
  );
}
