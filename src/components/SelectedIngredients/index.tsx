import { Text, View } from "react-native";
import Animated, { SlideInDown, BounceOutDown } from "react-native-reanimated";
import { MaterialIcons } from "@expo/vector-icons";
import { styles } from "./styles";
import { theme } from "@/theme";
import { Button } from "../Button";

type SelectedIngredientsProps = {
  quantity: number;
  onClear: () => void;
  onSearch: () => void;
};

export function SelectedIngredients({ quantity, onClear, onSearch }: SelectedIngredientsProps) {
  return (
    <Animated.View
      style={styles.container}
      entering={SlideInDown.duration(500)}
      exiting={BounceOutDown}
    >
      <View style={styles.header}>
        <Text style={styles.label}>{quantity} ingredientes selecionados</Text>
        <MaterialIcons
          name="close"
          size={24}
          color={theme.colors.gray_400}
          onPress={onClear}
        />
      </View>
      <Button title="Encontrar" onPress={onSearch} />
    </Animated.View>
  );
}
