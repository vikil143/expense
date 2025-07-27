import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const mockData = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  amount: (Math.random() * 100).toFixed(2),
  date: `2025-07-${(i % 30) + 1}`,
}));

const ITEMS_PER_PAGE = 10;

const PaginatedTable = () => {
  const [page, setPage] = useState(1);

  const totalPages = Math.ceil(mockData.length / ITEMS_PER_PAGE);

  const paginatedData = mockData.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const renderItem = ({ item }: any) => (
    <View style={styles.row}>
      <Text style={[styles.cell, styles.id]}>{item.id}</Text>
      <Text style={styles.cell}>{item.name}</Text>
      <Text style={styles.cell}>₹{item.amount}</Text>
      <Text style={styles.cell}>{item.date}</Text>
    </View>
  );

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {/* Header */}
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.id]}>ID</Text>
        <Text style={styles.cell}>Name</Text>
        <Text style={styles.cell}>Amount</Text>
        <Text style={styles.cell}>Date</Text>
      </View>

      {/* Table */}
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />

      {/* Pagination Controls */}
      <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={[styles.pageButton, page === 1 && styles.disabledButton]}
        >
          <Text style={styles.buttonText}>Previous</Text>
        </TouchableOpacity>

        <Text style={styles.pageText}>
          Page {page} of {totalPages}
        </Text>

        <TouchableOpacity
          onPress={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages}
          style={[
            styles.pageButton,
            page === totalPages && styles.disabledButton,
          ]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PaginatedTable;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  header: {
    backgroundColor: '#eee',
    fontWeight: 'bold',
  },
  cell: {
    flex: 1,
    paddingHorizontal: 5,
  },
  id: {
    flex: 0.5,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  pageButton: {
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 4,
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
  },
  pageText: {
    fontWeight: 'bold',
  },
});
