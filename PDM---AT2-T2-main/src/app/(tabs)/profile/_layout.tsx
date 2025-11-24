import { Stack } from "expo-router";

export default function ProfileLayout() {
  return (
    <Stack>
      {/* Tela principal do perfil */}
      <Stack.Screen
        name="index"
        options={{
          headerShown: false, // oculta o header padrão
        }}
      />

      {/* Tela de edição do perfil (modo modal) */}
      <Stack.Screen
        name="edit-profile"
        options={{
          presentation: "modal", // abre como modal
          headerShown: false,    // oculta o header
          animation: "slide_from_bottom", // animação válida
        }}
      />
    </Stack>
  );
}
