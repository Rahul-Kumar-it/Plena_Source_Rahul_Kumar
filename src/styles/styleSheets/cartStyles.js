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
  minHeightContainer: {
    width: rw(100),
    minHeight: rh(100),
    alignItems: 'center',
    paddingTop: rh(5),
    paddingBottom: rh(13),
  },
  headerContainer: {
    width: '88%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: rw(6),
  },
  cartItemContainer: {
    width: '100%',
    height: rh(55),
    flexDirection: 'column',
    alignItems: 'center',
    gap: rw(6),
    paddingTop: rh(4),
  },
  emptyCartContainer: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    width: '96%',
    position: 'absolute',
    bottom: 0,
    borderRadius: 30,
    backgroundColor: color.col_10,
    height: rh(30),
    flexDirection: 'column',
    alignItems: 'center',
    gap: rh(2),
    paddingTop: rh(3),
  },
  priceContainer: {
    width: '84%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    width: '87%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: rh(2),
  },
  mainCartItemContainer: {
    width: rw(100),
    height: rh(10),
    flexDirection: 'row',
    alignItems: 'center',
    gap: rw(7),
    paddingHorizontal: rw(8),
    borderBottomColor: color.col_19,
    borderBottomWidth: 1,
  },

  /* Text styling */
  cartText: {
    fontSize: font_size.fs_16,
    color: color.col_15,
    fontFamily: fontFamily.fm_4,
  },

  noItemText: {
    fontSize: font_size.fs_19,
    color: color.col_15,
    fontFamily: fontFamily.fm_2,
  },
  brandText: {
    fontSize: font_size.fs_14,
    color: color.col_15,
    fontFamily: fontFamily.fm_1,
  },
  priceWithDiscountText: {
    fontSize: font_size.fs_14,
    color: color.col_15,
    fontFamily: fontFamily.fm_1,
  },

  totalText: {
    fontSize: font_size.fs_14,
    color: color.col_17,
    fontFamily: fontFamily.fm_4,
  },
  proceedText: {
    fontSize: font_size.fs_14,
    color: color.col_13,
    borderRadius: 45,
    fontFamily: fontFamily.fm_4,
  },
  /* Image styling */
  globalImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  totalValueText: {
    fontSize: font_size.fs_14,
    color: color.col_15,
    fontFamily: fontFamily.fm_5,
  },

  /* Button styling */
  proceedButton: {
    backgroundColor: color.col_1,
    width: '100%',
    height: 56,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});