import React, {useContext, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {
  responsiveScreenWidth as rw,
  responsiveScreenHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import {fontFamily, font_size} from '../../styles/font';
import {color} from '../../styles/color';
import {
  IconAddFav,
  IconBack,
  IconCart,
  IconStar,
  IconStarHalf,
} from '../../svgIcons';
import {ApplicationContext} from '../../contextApi/application_ctx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GLobalSnackBar} from '../../components/snackBar';
import {styles} from '../../styles/styleSheets/productDetailStyles';
import {TouchableRipple} from 'react-native-paper';
export const ProductDetail = ({navigation}) => {
  const {perProductData, setPerProductData, setProducts} =
    useContext(ApplicationContext);

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [scroll, setScroll] = useState(0);

  /* Back handler */
  const handleBack = () => {
    navigation.goBack();
  };

  /* Function to add product to cart using local storage */
  const handleAddCart = async type => {
    let savedData = JSON.parse(await AsyncStorage.getItem('cart-items')) ?? [];
    let checkAlreadyExist = savedData.filter(
      (match, i) => match.id === perProductData.id,
    );
    /* Condition to handle same product add again in cart , if available it will alert otherwise add to cart*/
    if (checkAlreadyExist.length !== 0) {
      setTitle('Already added to cart');
      setOpen(true);
      if (type === 'buy') {
        setOpen(false);
        goToCart();
      }
    } else {
      let addCount = [perProductData]?.map((data, i) => {
        data.count = 1;
        return data;
      });
      await AsyncStorage.setItem(
        'cart-items',
        JSON.stringify([...addCount, ...savedData]),
      );
      if (type === 'cart') {
        setTitle('Added to your cart');
        setOpen(true);
      } else {
        goToCart();
      }
    }
  };

  /* Handler to navigate to cart */
  const goToCart = () => {
    navigation.navigate('Cart');
  };

  /* Function to add products to favourites using local storage so state remain persist */
  const handleAddFav = async () => {
    let savedData = JSON.parse(await AsyncStorage.getItem('products'));
    let index = savedData.findIndex(fIndex => fIndex.id === perProductData?.id);

    if (perProductData.favStatus === 0) {
      perProductData.favStatus = 1;
      savedData[index].favStatus = 1;
    } else {
      perProductData.favStatus = 0;
      savedData[index].favStatus = 0;
    }

    await AsyncStorage.setItem('products', JSON.stringify(savedData));
    setProducts(savedData);
    setPerProductData({...perProductData});
  };

  /* Function to handle carousel on scroll */
  const handleScroll = e => {
    setScroll(
      Math.round(
        e.nativeEvent.contentOffset.x / Dimensions.get('window').width,
      ),
    );
  };

  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.scrollViewParent}>
            <View style={{width: '88%', flexDirection: 'row'}}>
              <IconBack onPress={handleBack} />
              <View style={{flex: 1}}></View>
              <IconCart onPress={() => navigation.navigate('Cart')} />
            </View>
            <View style={styles.productDescription}>
              <Text style={styles.brandText}>{perProductData?.brand}</Text>
              <Text style={styles.titleText}>{perProductData?.title}</Text>
            </View>
            <View style={styles.ratingContainer}>
              {Array.from(Array(5).keys()).map((data, i) => {
                return (
                  <>
                    {i < parseInt(perProductData?.rating) ? (
                      <IconStar key={i} />
                    ) : (
                      <IconStarHalf key={i} />
                    )}
                  </>
                );
              })}
            </View>
            <View style={styles.carouselImageContainer}>
              <View style={styles.iconAddFavContainer}>
                <IconAddFav
                  color={
                    perProductData.favStatus === 0 ? color.col_13 : color.col_20
                  }
                  onPress={handleAddFav}
                />
              </View>

              <ScrollView
                onScroll={e => handleScroll(e)}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                disableIntervalMomentum
                showsHorizontalScrollIndicator={false}>
                {perProductData?.images.map((data, i) => {
                  return (
                    <>
                      <View key={data?.id} style={styles.imageContainer}>
                        {/* <CardSvg color={color.col_12} /> */}
                        <Image
                          source={{uri: data}}
                          style={styles.globalImage}
                          resizeMode="contain"
                        />
                      </View>
                    </>
                  );
                })}
              </ScrollView>
              <View style={styles.carouselDotsContainer}>
                {Array.from(Array(perProductData?.images?.length).keys()).map(
                  (data, i) => {
                    return (
                      <View
                        key={i}
                        style={{
                          ...styles.dotsContainer,
                          backgroundColor:
                            scroll === i ? color.col_3 : color.col_18,
                        }}></View>
                    );
                  },
                )}
              </View>
            </View>

            <View style={styles.productPriceContainer}>
              <Text style={styles.priceText}>${perProductData?.price}</Text>
              <Text style={styles.discountText}>
                $
                {Math.round(
                  (perProductData?.price * perProductData?.discountPercentage) /
                    100,
                )}{' '}
                OFF
              </Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableRipple
                onPress={() => handleAddCart('cart')}
                borderless
                style={styles.addToCartButton}>
                <Text style={styles.addToCartText}>Add To Cart</Text>
              </TouchableRipple>
              <TouchableRipple
                borderless
                onPress={() => handleAddCart('buy')}
                style={styles.goToCartButton}>
                <Text style={styles.buyNowText}>Buy Now</Text>
              </TouchableRipple>
            </View>
            <View style={styles.detailsContainer}>
              <Text style={styles.detailText}>Details</Text>
              <Text style={styles.descriptionText}>
                {perProductData?.description}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>

      <GLobalSnackBar
        open={open}
        margin={rh(12)}
        setOpen={setOpen}
        action={true}
        title={title}
      />
    </>
  );
};
