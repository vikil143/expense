import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { commonStyles } from '@myapp/utilities/common-styles'
import FABPayInit from '@myapp/components/fab-pay-Init'
import { RootStackScreenProps } from '@myapp/routes/types'
import PaymentTable from '@myapp/components/feature/table-payments/payment-table.components'
import { getLatestTransactions } from '@myapp/storage/realm-actions'
import { Transaction } from '@myapp/storage/db'
import CardsComponents from './components/cards-components.tsx'
import { LoaderWithText } from '@myapp/components/loader.tsx'
import DashboardHeader from '@myapp/components/header/dashboard-header.tsx'
import DashboardLineChart from './components/line-charts.tsx'

interface DashboardScreenProps extends RootStackScreenProps<"Dashboard"> {}


// Component wise approach
export default function DashboardScreen({ navigation } : DashboardScreenProps) {
  const [typeOfChart, setTypeOfChart] = useState("Table");
  // Initialize the component and fetch transactions
  // You can use this to set initial state or perform any setup
  // For example, fetching all transactions and setting the initial chart type
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    init()
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const init = async () => {
    try {
      // You can perform any initialization here if needed
      const allTxns = await getLatestTransactions();
      console.log("All Transactions: ", allTxns);
      // You can set the state or perform any other operations with the transactions
      setTypeOfChart("Table"); // Default to Table view
      setTransactions(allTxns); 
      timer.current = setTimeout(() => {
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  }


  const handlePress = () => {
    navigation.navigate("Scanner");
  }
  
  return (
    <View style={[commonStyles.container]}>
      {loading && <LoaderWithText text="Loading Dashboard..." />}

      <DashboardHeader />      
      <View style={[commonStyles.container]}>
        <ScrollView>
          <CardsComponents />
          <PaymentTable list={transactions} refresh={init} />
          <DashboardLineChart transactions={transactions} />
        </ScrollView>
        
        {/* <View style={[commonStyles.rowAlignEnd, commonStyles.pA15]}>
          <CustMenu onPress={toggleGraph} />
        </View> */}
        {/* {(() => {
          if(typeOfChart === "Table") {
            return <PaymentTable list={transactions} refresh={init} />
          } else if(typeOfChart === "Line") {
            return <LineGroup />
          }else if(typeOfChart === "Bar") {
            return <BarGroup />
          }else if(typeOfChart === "Pie") {
            return <PieGroup />
          }else {
            return <Loader />
          }
        })()} */}
      </View>
      <FABPayInit onPress={handlePress} />
    </View>
  )
}

const styles = StyleSheet.create({})