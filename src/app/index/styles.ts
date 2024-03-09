import { theme } from "@/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  title: {
    fontSize: theme.fonts.size.heading.xl,
    lineHeight: 44,
    marginTop: 42,
    fontFamily: theme.fonts.family.bold,
  },
  subtile: {
    fontFamily: theme.fonts.family.regular,
  },
  message: {
    fontSize: theme.fonts.size.heading.md,
    fontFamily: theme.fonts.family.regular,
    color: theme.colors.gray_400,
    marginTop: 12,
    marginBottom: 38,
  },
});
