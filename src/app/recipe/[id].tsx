import { useEffect, useState } from "react"
import { FlatList, Image, ScrollView, Text, View } from "react-native"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"
import { Redirect, router, useLocalSearchParams } from "expo-router"

import { services } from "@/services"

import { styles } from "./styles"
import { Step } from "@/components/Step"
import { Loading } from "@/components/Loading"
import { Ingredients } from "@/components/Ingredients"

export default function Recipe() {
  const [isLoading, setIsLoading] = useState(true)
  const [recipe, setRecipe] = useState<RecipeResponse | null>(null)
  const [ingredients, setIngredients] = useState<IngredientResponse[]>([])
  const [preparations, setPreparations] = useState<PreparationsResponse[]>([])

  const { id } = useLocalSearchParams<{ id: string }>()

  useEffect(() => {
    services.recipes
      .show(id)
      .then((response) => setRecipe(response))
      .finally(() => setIsLoading(false))
  }, [])

  useEffect(() => {
    services.ingredients
      .findByRecipeId(id)
      .then((response) => setIngredients(response))
  }, [])

  useEffect(() => {
    services.preparations
      .findByRecipeId(id)
      .then((response) => setPreparations(response))
  }, [])

  if (isLoading) {
    return <Loading />
  }

  if (!id || !recipe) {
    return <Redirect href="/" />
  }

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: recipe.image }} style={styles.image} />

      <View style={styles.body}>
        <View style={styles.header}>
          <MaterialIcons
            size={32}
            name="arrow-back"
            onPress={() => router.back()}
          />

          <Text style={styles.name}>{recipe.name}</Text>
          <Text style={styles.time}>{recipe.minutes} minutos de preparo</Text>
        </View>

        <Ingredients ingredients={ingredients} />

        <View style={styles.content}>
          <Text style={styles.preparation}>Modo de preparado</Text>

          {preparations.map((preparation, index) => (
            <Step
              key={index}
              step={preparation.step}
              description={preparation.description}
            />
          ))}
        </View>
      </View>
    </ScrollView>
  )
}
