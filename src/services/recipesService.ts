import { supabase } from "./supabase";

async function findByIngredientsIds(ids: string[]) {
  const { data } = await supabase
    .rpc("recipes_by_ingredients", { ids })
    .returns<RecipeResponse[]>();

  return data ?? [];
}

async function getRecipesByIngredients(ids: string[]) {
  const { data: filteredIngredients } = await supabase
    .from("recipes_ingredients")
    .select("recipe_id")
    .eq("ingredient_id", ids);
  // console.log("filteredIngredients", filteredIngredients);

  // If there are filtered ingredients, join and select recipes
  if (filteredIngredients?.length ?? 0 > 0) {
    const recipeIds = filteredIngredients?.map(
      (ingredient) => ingredient.recipe_id
    );
    // console.log("Selecting recipes query:", recipeIds);
    const { data: recipes } = await supabase
      .from("recipes")
      .select("*")
      .in("id", recipeIds ?? [])
      .returns<RecipeResponse[]>();
    // console.log("recipes", recipes);
    return recipes ?? [];
  } else {
    // Handle case where no ingredients are found
    return [];
  }
}

async function show(id: string) {
  const { data } = await supabase
    .from("recipes")
    .select()
    .eq("id", id)
    .returns<RecipeResponse>()
    .single();

  return data;
}

export { findByIngredientsIds, show, getRecipesByIngredients };
