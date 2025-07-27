import { StyleSheet, View } from 'react-native'
import React from 'react';
import { useCameraDevice, useCameraPermission, Camera, useCodeScanner } from 'react-native-vision-camera';
import { RootStackScreenProps } from '@myapp/routes/types';
import { parseUpiUri } from '@myapp/utilities/common-helpers';

interface ScannerProps extends RootStackScreenProps<"Scanner"> {}

export default function Scanner({ navigation }: ScannerProps) {
    const device = useCameraDevice('back')
    const { hasPermission } = useCameraPermission()
    const codeScanner = useCodeScanner({
        codeTypes: ['qr'],
        onCodeScanned: (codes) => {
          console.log(`Scanned ${codes.length} codes!`, codes[0].value);
          if (codes.length === 0) return;
          // Assuming the first code is a UPI URI
          const upiGpay = parseUpiUri(codes[0].value!);
          // const upiGpay = parseUpiUri("upi://pay?pa=harish.lakkavatri52-1@okhdfcbank&pn=harish%20lakkavatri&aid=uGICAgIC1-dCgTw")
          if (!upiGpay) {
            console.warn("Invalid UPI URI");
            return;
          }
          // Navigate to Amount screen with UPI details
          navigation.navigate("Amount", {
            vpa: upiGpay.vpa,
            name: upiGpay.name,
            am: upiGpay.am,
            cu: upiGpay.cu,
            mc: upiGpay.mc,
            mode: upiGpay.mode,
            orgid: upiGpay.orgid,
            tid: upiGpay.tid,
            pa: upiGpay.pa,
            url: upiGpay.url,
            pn: upiGpay.pn,
            sign: upiGpay.sign,
            tr: upiGpay.tr,
            tn: upiGpay.tn
          });
          // sendUPI(codes[0].value, "Guest", "Testing", "10", () => console.log("Success"))
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