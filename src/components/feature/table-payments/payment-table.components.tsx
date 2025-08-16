import { Transaction } from '@myapp/storage/db';
import { getDate, getFullYear, getMonth, MONTHS } from '@myapp/utilities/common-date';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const ITEMS_PER_PAGE = 10;

interface PaginatedTableProps {
  list: Transaction[];
}

const PaginatedTable = ({ list }: PaginatedTableProps) => {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);

  const paginatedData = list.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const handleViewMore = (item: Transaction) => {
    Alert.alert(
      "Transaction Details",
      `Category: ${item.category}\nNote: ${item.note}\nAmount: ₹${item.amount}\nDate: ${getDate(item.date)} ${MONTHS[getMonth(item.date)]} ${getFullYear(item.date)}`
    );
  };

  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>📜 Recent History</Text>

      {/* Header */}
      <View style={[styles.row, styles.header]}>
        <Text style={[styles.cell, styles.id, styles.headerText]}>Sr No</Text>
        <Text style={[styles.cell, styles.headerText]}>Name</Text>
        <Text style={[styles.cell, styles.headerText]}>Amount</Text>
        <Text style={[styles.actionHeader, styles.headerText]}>Action</Text>
      </View>

      {/* Rows */}
      {paginatedData.length > 0 ? paginatedData.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <View
            key={item.id.toString()}
            style={[
              styles.row,
              { backgroundColor: isEven ? '#f9f9f9' : '#fff' },
            ]}
          >
            <Text style={[styles.cell, styles.id]}>{index + 1 + (page - 1) * ITEMS_PER_PAGE}</Text>
            <Text style={styles.cell}>{item.category}</Text>
            <Text style={[styles.cell, styles.amount]}>₹{item.amount}</Text>

            <TouchableOpacity
              style={styles.viewButton}
              onPress={() => handleViewMore(item)}
            >
              <Text style={styles.viewButtonText}>View</Text>
            </TouchableOpacity>
          </View>
        );
      }): (
        <Text style={{ textAlign: 'center', color: '#999', marginVertical: 20 }}>
          No transactions found.
        </Text>
      )}


      {/* ✅ View All Button */}
      {paginatedData.length > 0 && (
        <TouchableOpacity
          style={[styles.pageButton, { marginTop: 10, alignSelf: 'center' }]}
          // onPress={() => setViewAll(true)}
        >
          <Text style={styles.buttonText}>View All</Text>
        </TouchableOpacity>
      )}

      {/* Pagination */}
      {/* <View style={styles.pagination}>
        <TouchableOpacity
          onPress={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          style={[
            styles.pageButton,
            page === 1 && styles.disabledButton,
          ]}
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
      </View> */}
    </View>
  );
};

export default PaginatedTable;

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007BFF',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#EAF3FF',
    paddingVertical: 8,
    borderRadius: 8,
  },
  wrapper: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f4f6f8',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
    alignItems: 'center',
  },
  header: {
    backgroundColor: '#007BFF',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  headerText: {
    fontWeight: 'bold',
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  cell: {
    flex: 1,
    paddingHorizontal: 5,
    textAlign: 'center',
    fontSize: 13,
    color: '#333',
  },
  id: {
    flex: 0.5,
  },
  amount: {
    fontWeight: 'bold',
    color: '#E53935',
  },
  actionHeader: {
    flex: 0.7,
    textAlign: 'center',
  },
  viewButton: {
    flex: 0.7,
    backgroundColor: '#28A745',
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 6,
    alignItems: 'center',
  },
  viewButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 5,
  },
  pageButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#007BFF',
    borderRadius: 20,
  },
  disabledButton: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  pageText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
