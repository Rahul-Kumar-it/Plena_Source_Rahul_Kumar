import {
    StyleSheet,
  } from 'react-native';
  import {
    responsiveScreenWidth as rw,
    responsiveScreenHeight as rh,
    responsiveFontSize as rf,
  } from 'react-native-responsive-dimensions';
  import {fontFamily, font_size} from '../../styles/font';
  import {color} from '../../styles/color';
  
  export const styles = StyleSheet.create({
    mainContainer: {
      width: '100%',
      flex: 1,
      alignItems: 'center',
      backgroundColor: color.col_13,
    },
  
    scrollViewParent: {
      width: rw(100),
      minHeight: rh(100),
      alignItems: 'center',
      paddingTop: rh(5),
      paddingBottom: rh(13),
    },
    productDescription: {
      width: '88%',
      paddingBottom: rh(1),
      justifyContent: 'center',
    },
  
    ratingContainer: {
      width: '87%',
      flexDirection: 'row',
      gap: rw(2),
      alignItems: 'center',
    },
    carouselImageContainer: {
      marginTop: rh(2),
      width: '100%',
      height: rh(23.5),
      justifyContent: 'center',
      backgroundColor: color.col_10,
    },
    iconAddFavContainer: {
      width: '100%',
      paddingHorizontal: rw(8),
      alignItems: 'flex-end',
      position: 'absolute',
      top: rh(2),
      zIndex: 100,
    },
    imageContainer: {
      width: rw(100),
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    carouselDotsContainer: {
      width: '100%',
      paddingHorizontal: rw(7),
      alignItems: 'center',
      flexDirection: 'row',
      position: 'absolute',
      bottom: rh(3),
      gap: 6,
    },
    dotsContainer: {
      width: 22,
      height: 4,
      borderRadius: 40,
      alignItems: 'center',
    },
    productPriceContainer: {
      width: '90%',
      gap: 10,
      height: rh(9),
      flexDirection: 'row',
      alignItems: 'center',
    },
    buttonsContainer: {
      width: '90%',
      gap: 21,
      height: rh(10),
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    detailsContainer: {
      width: '88%',
      paddingTop: rh(2),
      gap: 6,
      justifyContent: 'center',
    },
  
    /* Text styling */
    brandText: {
      fontSize: 50,
      color: color.col_15,
      fontFamily: fontFamily.fm_3,
      lineHeight: 62,
    },
    titleText: {
      fontSize: 50,
      color: color.col_15,
      fontFamily: fontFamily.fm_2,
      lineHeight: 62,
    },
    priceText: {
      fontSize: font_size.fs_16,
      color: color.col_1,
      fontFamily: fontFamily.fm_2,
    },
  
    discountText: {
      fontSize: font_size.fs_16,
      color: color.col_13,
      borderRadius: 45,
      paddingHorizontal: rw(3),
      paddingVertical: rh(0.4),
      fontFamily: fontFamily.fm_4,
      backgroundColor: color.col_1,
    },
  
    addToCartText: {
      fontSize: font_size.fs_14,
      color: color.col_1,
      borderRadius: 45,
      fontFamily: fontFamily.fm_4,
    },
    /* Image styling */
    globalImage: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  
    buyNowText: {
      fontSize: font_size.fs_14,
      color: color.col_13,
      borderRadius: 45,
      fontFamily: fontFamily.fm_4,
    },
    detailText: {
      fontSize: font_size.fs_16,
      color: color.col_15,
      fontFamily: fontFamily.fm_4,
    },
    descriptionText: {
      fontSize: font_size.fs_16,
      color: color.col_12,
      fontFamily: fontFamily.fm_4,
    },
  
    /* Button styling */
    addToCartButton: {
      borderColor: color.col_1,
      borderWidth: 1,
      width: rw(34.5),
      height: rh(6),
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  
    goToCartButton: {
      backgroundColor: color.col_1,
      width: rw(41.5),
      height: rh(6),
      borderRadius: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  