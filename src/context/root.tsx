import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { PaperProvider } from "react-native-paper"
import { HasChidren } from '@myapp/utilities/common-types'


interface RootContextProps extends HasChidren {
  
}

export default function RootContext({ children }: RootContextProps) {
  return (
    <>
      <PaperProvider>
        {children}
      </PaperProvider>
    </>
  )
}

const styles = StyleSheet.create({})