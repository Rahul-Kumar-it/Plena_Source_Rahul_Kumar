import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Snackbar} from 'react-native-paper';

export const GLobalSnackBar = ({open, setOpen, title, margin, action}) => {
  const navigation = useNavigation();
  const onDismissSnackBar = () => {
    setOpen(false);
  };
  return (
    <>
      <View style={{...styles.mainContainer, bottom: margin}}>
        <Snackbar
          duration={2000}
          visible={open}
          onDismiss={onDismissSnackBar}
          action={
            action
              ? {
                  label: 'Check out',
                  onPress: () => {
                    // Do something
                    navigation.navigate('Cart');
                  },
                }
              : ''
          }>
          {title}
        </Snackbar>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1000,
    width: '100%',
    position: 'absolute',
    justifyContent: 'space-between',
  },
});
