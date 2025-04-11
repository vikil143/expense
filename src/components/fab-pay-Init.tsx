import { StyleSheet, View, TouchableWithoutFeedback, Platform } from 'react-native'
import React from 'react'
import { Menu, Icon } from 'react-native-paper';
import SendIntentAndroid from 'react-native-send-intent';

// import 

const paymentApps = {
  GPay: 'com.google.android.apps.nbu.paisa.user',
  PhonePay: 'com.phonepe.app',
}

export default function FABPayInit() {
  const [visible, setVisible] = React.useState(false);
  const [avaliableApps, setAvaliableApps] = React.useState({});
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  React.useEffect(() => {
    const checkApps = async (key: string, appId: string) => {
      const installedApps = await SendIntentAndroid.isAppInstalled(appId);
      setAvaliableApps({ ...avaliableApps, [key]: installedApps });
    }
    Object.entries(paymentApps).forEach(([key, appId]) => {
      checkApps(key, appId);
    })
  }
  , []);


  return (
    <>
      {avaliableApps && Object.entries(avaliableApps).length > 0 && Object.entries(avaliableApps).map(([key, value]) => {
        return (
            <View style={styles.fabContainer} key={key}>
              {value ? ( 
                <Menu
                  visible={visible}
                  onDismiss={closeMenu}
                  style={styles.fab}
                  anchor={(
                    <TouchableWithoutFeedback onPress={openMenu}>
                      <View style={[styles.fab]}>
                        <Icon source="plus" color='white' size={30} />
                      </View>
                    </TouchableWithoutFeedback>
                  )}>
                      <Menu.Item onPress={() => { }} title="GPay" />
                      <Menu.Item onPress={() => { }} title="PhonePay" />
                </Menu>
              ) : null}
            </View>
      )})}
    </>
  )
}

const SIZE = 60;

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  fab: {
    backgroundColor: '#6200ee',
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.29,
  },
})