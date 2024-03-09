import React, { useState } from "react";
import { Text, View } from "react-native";
import { styles } from "./styles";
import { Ingredients } from "../components/ingredients/Ingredients";

export default function Index() {
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Escolha{"\n"}
        <Text style={styles.subtile}>os produtos</Text>
      </Text>
      <Text style={styles.message}>
        Descubra receitas baseadas nos produtos que você escolheu.
      </Text>

      <Ingredients />
    </View>
  );
}
