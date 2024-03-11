import { useEffect, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { styles } from "./styles";
import { services } from "@/services";
import { Ingredients } from "@/components/Ingredients";
import { Recipe } from "@/components/Recipe";

export default function Recipes() {
  const params = useLocalSearchParams<{ ingredientsIds: string }>();
  const [recipes, setRecipes] = useState<RecipeResponse[]>([]);
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([]);
  const ingredientsIds = params.ingredientsIds.split(",");
  
  useEffect(() => {
    services.ingredients.findByIds(ingredientsIds).then(setIngredients);
  }, []);

  useEffect(() => {
    services.recipes.getRecipesByIngredients(ingredientsIds).then(setRecipes);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <MaterialIcons name="arrow-back" size={32} onPress={router.back} />

        <Text style={styles.title}>Ingredientes</Text>

        <Ingredients ingredients={ingredients} />
      </View>
      <FlatList
        data={recipes}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Recipe recipe={item} onPressOut={() => router.navigate('/recipe/' + item.id)} />}
        style={styles.recipes}
        contentContainerStyle={styles.recipesContent}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{gap: 16}}
        numColumns={2}
      />
    </View>
  );
}
