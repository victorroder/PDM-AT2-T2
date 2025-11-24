import Button from "@/components/Button";
import { ProfileStorage } from "@/services/profileStorage";
import { UserProfile } from "@/types/profile";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  const [profile, setProfile] = useState<UserProfile>({
    name: "Úsuario",
    surname: "Teste",
    age: 12,
    institution: "casa",
    course: "nutrição"
  });

  useFocusEffect(
    useCallback(() => {
      async function loadProfile() {
        const savedProfile = await ProfileStorage.load();

        if (savedProfile) {
          setProfile(savedProfile);
        }
      }

      loadProfile();
    }, [])
  );

  const handleEditProfile = () => {
    router.push("./profile/edit-profile");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu Perfil</Text>

      {/* Foto padrão */}
      <Image
        source={
          profile.fileUri
            ? { uri: profile.fileUri }
            : { uri: "https://github.com/victorroder.png" }
        }
        style={styles.profileImage}
      />

      {/* Informações do Perfil */}
      <View style={styles.profileInfo}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nome:</Text>
          <Text style={styles.infoValue}>{profile.name}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Sobrenome:</Text>
          <Text style={styles.infoValue}>{profile.surname}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Idade:</Text>
          <Text style={styles.infoValue}>{profile.age}</Text>
        </View>


      </View>

      {/* Botões */}
      <View style={styles.footer}>
        <Button title="EDITAR PERFIL" onPress={handleEditProfile} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 20,
    gap: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  footer: {
    width: "100%",
    gap: 12,
    paddingBottom: 40,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileInfo: {
    width: "100%",
    marginBottom: 40,
  },
  infoItem: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666666",
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: "500",
    color: "#333333",
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
});