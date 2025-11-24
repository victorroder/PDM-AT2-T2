import Button from "@/components/Button";
import { ProfileStorage } from "@/services/profileStorage";
import { UserProfile } from "@/types/profile";
import * as DocumentPicker from "expo-document-picker";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Image, StyleSheet, Text, TextInput, View } from "react-native";

export default function EditProfileModal() {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [age, setAge] = useState<number>(0);
  const [fileUri, setFileUri] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function loadProfile() {
        const savedProfile = await ProfileStorage.load();
        if (savedProfile) {
          setName(savedProfile.name);
          setSurname(savedProfile.surname);
          setAge(savedProfile.age);
          setFileUri(savedProfile.fileUri || null);
        }
      }
      loadProfile();
    }, [])
  );

  const handlePickDocument = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: "image/*",
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setFileUri(uri);
    } else {
      console.warn("Nenhuma imagem selecionada");
    }
  };

  const handleSave = async () => {
    const updatedProfile: UserProfile = {
      name: name.trim(),
      surname: surname.trim(),
      age: age,
      institution: "",
      course: "",
      fileUri: fileUri || undefined,
    };

    await ProfileStorage.save(updatedProfile);
    handleCancel();
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Perfil</Text>

      <View style={styles.profileInfo}>
        {fileUri && (
          <View style={styles.previewContainer}>
            <Image source={{ uri: fileUri }} style={styles.preview} />
          </View>
        )}

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Nome:</Text>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Digite seu nome"
            placeholderTextColor="#9e9e9e"
          />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Sobrenome:</Text>
          <TextInput
            style={styles.textInput}
            value={surname}
            onChangeText={setSurname}
            placeholder="Digite seu sobrenome"
            placeholderTextColor="#9e9e9e"
            autoCapitalize="none"
          />
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Idade:</Text>
          <TextInput
            style={styles.textInput}
            value={age.toString()}
            onChangeText={(text) => setAge(Number(text))}
            placeholder="Digite sua idade"
            placeholderTextColor="#9e9e9e"
            keyboardType="numeric"
            autoCapitalize="none"
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Button
          title="Selecionar imagem"
          variant="secondary"
          onPress={handlePickDocument}
        />
        <Button title="Salvar" onPress={handleSave} />
        <Button title="Cancelar" onPress={handleCancel} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5", // cinza claro
    paddingHorizontal: 24,
    paddingVertical: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    textAlign: "center",
    color: "#333333",
    marginBottom: 32,
  },
  profileInfo: {
    width: "100%",
    marginBottom: 30,
  },
  infoItem: {
    marginBottom: 18,
  },
  infoLabel: {
    fontSize: 15,
    fontWeight: "600",
    color: "#6D4BC9",
    marginBottom: 6,
  },
  textInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: "#cccccc",
    color: "#222222",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  previewContainer: {
    alignItems: "center",
    marginBottom: 24,
  },
  preview: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: "#ddd",
  },
  footer: {
    width: "100%",
    gap: 12,
  },
});
