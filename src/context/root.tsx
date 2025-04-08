import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { HasChidren } from '@myapp/utilities/common-types'


interface RootContextProps extends HasChidren {
  
}

export default function RootContext({ children }: RootContextProps) {
  return (
    <>
        {children}
    </>
  )
}

const styles = StyleSheet.create({})