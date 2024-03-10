import React, { useState } from "react";
import { Alert, ScrollView } from "react-native";
import {router} from 'expo-router'
import { Ingredient } from "../Ingredient";
import { SelectedIngredients } from "../SelectedIngredients";
import { styles } from "./styles";

type IngredientProps = {
  ingredients: string[];
}

export function Ingredients({ingredients}: IngredientProps) {
  const [selected, setSelected] = useState<string[]>(ingredients);

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

  function handleSearch() {
    router.navigate('/recipes/')
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
          onSearch={handleSearch}
        />
      )}
    </>
  );
}
