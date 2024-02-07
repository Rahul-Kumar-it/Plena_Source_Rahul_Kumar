import {StyleSheet} from 'react-native';
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
  scrollviewContainer: {
    width: rw(100),
    minHeight: rh(100),
    alignItems: 'center',
    paddingBottom: rh(12),
  },
  topTextContainer: {
    width: '100%',
    paddingHorizontal: rw(5),
    paddingBottom: rh(2),
    backgroundColor: color.col_1,
    paddingTop: rh(6),
  },

  mainSearchContainer: {
    width: '100%',
    height: rh(14),
    backgroundColor: color.col_1,
    justifyContent: 'center',
  },

  searchbar: {
    backgroundColor: color.col_2,
    height: rh(6.5),
    borderRadius: 28,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: rw(7),
    gap: rw(3),
  },

  addressContainer: {
    width: '100%',
    backgroundColor: color.col_1,
    flexDirection: 'row',
  },

  scrollView: {
    paddingLeft: rw(5),
    paddingRight: rw(17),
    gap: 16,
  },
  scrollViewParentContainer: {
    width: rw(100),
    height: rh(21),
    justifyContent: 'center',
  },
  suggestionCards: {
    width: rw(65.6),
    height: rh(13.7),
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: color.col_3,
    borderRadius: 16,
  },
  cardLeftContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardRightContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
  },
  productsRenderContainer: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: rw(7),
    paddingLeft: rw(3),
    paddingTop: rh(2),
  },
  product: {
    width: rw(38.8),
    height: rh(21.9),
    alignItems: 'center',
    backgroundColor: color.col_10,
    borderRadius: 12,
    overflow: 'hidden',
  },
  iconHeartContainer: {
    width: '87%',
    height: rh(4),
    justifyContent: 'center',
  },
  prodImageContainer: {
    width: '100%',
    height: rh(10),
  },
  productDescripContainer: {
    width: '82%',
    height: rh(7),
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Text styling */
  toptext: {
    fontSize: font_size.fs_22,
    fontWeight: '400',
    color: color.col_11,
    fontFamily: fontFamily.fm_1,
  },

  deliveryText: {
    fontSize: font_size.fs_11,
    fontWeight: '800',
    color: color.col_10,
    opacity: 0.5,
    textTransform: 'uppercase',
    fontFamily: fontFamily.fm_1,
  },
  flexContainerArrow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: rw(2),
  },
  addressText: {
    fontSize: font_size.fs_14,
    color: color.col_10,
    fontFamily: fontFamily.fm_1,
  },

  rightContainerText_1: {
    fontSize: font_size.fs_20,
    color: color.col_13,
    fontFamily: fontFamily.fm_3,
  },
  rightContainerText_2: {
    fontSize: font_size.fs_26,
    color: color.col_13,
    fontFamily: fontFamily.fm_2,
  },
  rightContainerText_3: {
    fontSize: font_size.fs_13,
    color: color.col_13,
    fontFamily: fontFamily.fm_3,
  },
  recommendText: {
    fontSize: font_size.fs_30,
    color: color.col_15,
    fontFamily: fontFamily.fm_3,
  },
  priceText: {
    flex: 1,
    fontSize: font_size.fs_14,
    color: color.col_15,
    fontFamily: fontFamily.fm_4,
  },

  brandText: {
    fontSize: font_size.fs_12,
    color: color.col_17,
    fontFamily: fontFamily.fm_4,
  },
  /* Image styling */
  globalImageStyle: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
});
