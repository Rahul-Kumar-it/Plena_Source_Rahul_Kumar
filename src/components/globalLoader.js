import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {
  responsiveScreenWidth as rw,
  responsiveScreenHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import {color} from '../styles/color';
import {ActivityIndicator, MD2Colors} from 'react-native-paper';
export const GLobalLoader = () => {
  return (
    <>
      <View style={styles.mainContainer}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator animating={true} size={45} color={color.col_1} />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    zIndex: 1000,
    width: rw(100),
    height: rh(100),
    position: 'absolute',
    alignItems: 'center',
    backgroundColor: 'rgba(225,225,225,0.8)',
    justifyContent: 'center',
  },
  loaderContainer: {
    zIndex: 1000,
    width: 120,
    height: 120,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: color.col_13,
  },
});
