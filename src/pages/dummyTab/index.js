import React, {useEffect, useState} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  VirtualizedList,
} from 'react-native';
import {
  responsiveScreenWidth as rw,
  responsiveScreenHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import {fontFamily, font_size} from '../../styles/font';
import {color} from '../../styles/color';
import {IconBack, IconDecre, IconIncre} from '../../svgIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GLobalSnackBar} from '../../components/snackBar';
import {GLobalLoader} from '../../components/globalLoader';
import {styles} from '../../styles/styleSheets/cartStyles';

export const DummyTab = ({navigation}) => {
  return (
    <>
      <View style={{...styles.mainContainer, justifyContent: 'center'}}>
        <Text
          style={{
            fontSize: font_size.fs_19,
            color: color.col_15,
            fontFamily: fontFamily.fm_2,
          }}>
          No content found
        </Text>
      </View>
    </>
  );
};
