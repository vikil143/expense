import { StyleSheet, View } from 'react-native'
import React from 'react';
import { useCameraDevice, useCameraPermission, Camera, useCodeScanner } from 'react-native-vision-camera';
import { sendUPI } from '@myapp/utilities/native-module-common';

export default function Scanner() {
    const device = useCameraDevice('back')
    const { hasPermission } = useCameraPermission()
    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes) => {
          console.log(`Scanned ${codes.length} codes!`, codes);
          sendUPI(codes[0].value, "Guest", "Testing", "10", () => console.log("Success"))
        }
    })

    
    if (!hasPermission) return <View />
    if (device == null) return <View />
  
    // if (!hasPermission) return <PermissionsPage />
    // if (device == null) return <NoCameraDeviceError />
    return (
      <Camera
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        codeScanner={codeScanner}
      />
    )
}

const styles = StyleSheet.create({})