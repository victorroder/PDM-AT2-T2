import React, { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import { Product } from "@/types/product";

const API_URL = "https://fakestoreapi.com/products";

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    fetchProducts();
  };

  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.cardContainer}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      
      <View style={styles.textContent}>
        <Text style={styles.title} numberOfLines={2}>
          {item.title}
        </Text>
        
        <Text style={styles.price}>$ {item.price.toFixed(2)}</Text>
        
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        
        <Text style={styles.category}>{item.category}</Text>
        
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingLabel}>Avaliação:</Text>
          <Text style={styles.ratingValue}>
            ⭐ {item.rating.rate.toFixed(1)} ({item.rating.count} avaliações)
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#6366F1" />
        <Text style={styles.loadingText}>Carregando produtos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>🛍️ Loja de Produtos</Text>
        <Text style={styles.headerSubtitle}>Explore nossa coleção</Text>
      </View>
      
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F7FA",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#64748B",
    fontWeight: "500",
  },
  header: {
    padding: 24,
    paddingTop: 60,
    backgroundColor: "#6366F1",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#FFFFFF",
    marginBottom: 6,
    textAlign: "center",
    letterSpacing: 0.5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: "#E0E7FF",
    textAlign: "center",
    fontWeight: "500",
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
  },
  cardContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 20,
    padding: 18,
    shadowColor: "#6366F1",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 6,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  productImage: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    marginBottom: 16,
    backgroundColor: "#F3F4F6",
    resizeMode: "contain",
  },
  textContent: {
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F2937",
    lineHeight: 24,
    letterSpacing: 0.3,
  },
  price: {
    fontSize: 26,
    fontWeight: "800",
    color: "#10B981",
    letterSpacing: 0.5,
  },
  description: {
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 20,
    textAlign: "justify",
  },
  category: {
    fontSize: 13,
    color: "#6366F1",
    fontWeight: "600",
    textTransform: "capitalize",
    backgroundColor: "#EEF2FF",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start",
    overflow: "hidden",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
    gap: 8,
  },
  ratingLabel: {
    fontSize: 14,
    color: "#6B7280",
    fontWeight: "500",
  },
  ratingValue: {
    fontSize: 14,
    color: "#F59E0B",
    fontWeight: "700",
  },
});
