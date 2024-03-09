import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import { Ingredient } from "../ingredient/Ingredient";
import { styles } from "./styles";
import { SelectedIngredients } from "../SelectedIngredients";

export function Ingredients() {
  const [selected, setSelected] = useState<string[]>([]);

  function handleToggleSelected(value: string) {
    if (selected.includes(value)) {
      return setSelected((state) => state.filter((item) => item !== value));
    }

    setSelected([...selected, value]);
  }

  function handleClearSelected() {
    Alert.alert("Limpar", "Deseja limpar os ingredientes selecionados?", [
      {
        text: "Cancelar",
        style: "cancel",
      },
      {
        text: "Limpar",
        onPress: () => setSelected([]),
      },
    ]);
  }

  return (
    <>
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
      
      {selected.length > 0 && (
        <SelectedIngredients
          quantity={selected.length}
          onClear={handleClearSelected}
          onSearch={() => {}}
        />
      )}
    </>
  );
}
