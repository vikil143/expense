import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react';
import { Menu, Button } from "react-native-paper";

interface CustMenuProps {
    onPress: (name: string) => void;
}

export default function CustMenu({ onPress }: CustMenuProps) {
    const [show, setShow] = useState(false);
    const open = () => setShow(true);
    const close = () => setShow(false);

    const handlePress = (type: string) => {
        close();
        onPress(type)
    }

  return (    
    <Menu
        visible={show}
        onDismiss={close}
        anchor={<Button onPress={open}>Type of Bar</Button>}>
        <Menu.Item onPress={() => handlePress("Line")} title="Line" />
        <Menu.Item onPress={() => handlePress("Bar")} title="Bar" />
        <Menu.Item onPress={() => handlePress("Pie")} title="Pie" />
    </Menu>
  )
}

const styles = StyleSheet.create({})