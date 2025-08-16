import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DashboardValueModal from './dashboard-modal';
import { createDashboard, getDashboard, updateDashboard } from '@myapp/storage/actions/dashboardRealmActions';
import Realm from 'realm';

const { width } = Dimensions.get('window');
const cardWidth = (width - 40) / 2;

const CardsComponents = () => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [cards, setCards] = useState([
    { title: 'Total Balance', value: '0', icon: 'wallet-outline', color: '#4CAF50', key: "totalBalance" },
    { title: 'Total Income', value: '0', icon: 'trending-up-outline', color: '#2196F3', key: "totalIncome" },
    { title: 'Total Expense', value: '0', icon: 'trending-down-outline', color: '#F44336', key: "totalExpense" },
    { title: 'Budget Left', value: '0', icon: 'pie-chart-outline', color: '#FF9800', key: "budgetLeft" },
  ]);

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    await createDashboard(); // ensure one dashboard exists
    const dashboards = await getDashboard();
    if (dashboards.length > 0) {
      const dashboard = dashboards[0];
      setCards(prevCards =>
        prevCards.map(card => ({
          ...card,
          value: dashboard[card.key] ? `₹${dashboard[card.key]}` : '₹0'
        }))
      );
    }
  };

  const handleSave = async (key: string, newValue: number) => {
    await updateDashboard(key, newValue);
    init(); // refresh
  };

  return (
    <View style={styles.container}>
      {cards.map((card, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.card, { backgroundColor: card.color }]}
          activeOpacity={0.8}
          onPress={() => setActiveModal(card.key)}
        >
          <Ionicons name={card.icon} size={28} color="#fff" />
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.cardValue}>{card.value}</Text>
        </TouchableOpacity>
      ))}

      {cards.map((card, index) => (
        <DashboardValueModal
          key={`modal-${index}`}
          title={`Enter ${card.title}`}
          visible={activeModal === card.key}
          onClose={() => setActiveModal(null)}
          onSave={(val) => handleSave(card.key, val)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  card: {
    width: cardWidth,
    padding: 15,
    borderRadius: 15,
    marginBottom: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 14,
    color: '#fff',
    marginTop: 10,
    fontWeight: '500',
  },
  cardValue: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginTop: 5,
  },
});

export default CardsComponents;
