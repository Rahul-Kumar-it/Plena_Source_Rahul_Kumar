import React, {useContext, useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from 'react-native';
// import { TextInput } from 'react-native-paper';
import {
  responsiveScreenWidth as rw,
  responsiveScreenHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import {color} from '../../styles/color';
import {TouchableRipple} from 'react-native-paper';
import {
  CardSvg,
  IconAdd,
  IconDownArrow,
  IconHeart,
  IconHeartFade,
  IconSearch,
} from '../../svgIcons';
import {
  getPerProducts,
  getProducts,
} from '../../api/apiController/productController';
import {ApplicationContext} from '../../contextApi/application_ctx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GLobalLoader} from '../../components/globalLoader';
import {styles} from '../../styles/styleSheets/groceryStyles';
import {GLobalSnackBar} from '../../components/snackBar';

export const GroceryHome = ({navigation}) => {
  const {perProductData, setPerProductData, products, setProducts} =
    useContext(ApplicationContext);
  const [scroll, setScroll] = useState(0);
  const [loaderState, setLoaderState] = useState(false);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [action, setAction] = useState(false);

  /* Useffect to fetch data from products api */
  useEffect(() => {
    (async () => {
      setLoaderState(true);
      try {
        let response = await getProducts();
        console.log(response);
        // saving data into local storage so can be used for add to favourites functionality
        if (!(await AsyncStorage.getItem('products'))) {
          let savedData = response?.data?.products.map((data, i) => {
            data.favStatus = 0;
            return data;
          });
          await AsyncStorage.setItem('products', JSON.stringify(savedData));
          setProducts(savedData);
        }
        setLoaderState(false);
      } catch (error) {
        setLoaderState(false);

        console.log(error);
      }
    })();
  }, []);

  /* Useffect to set product state for rendering */
  useEffect(() => {
    (async () => {
      setProducts(JSON.parse(await AsyncStorage.getItem('products')));
    })();
  }, []);

  /* Function to call api to fetch per product details , Note: we can directly use states as well to get data */
  const handlePerDetail = data => {
    perdata(data);

    /* If use direct states */
    // setPerProductData(data);
    // navigation.navigate('Product-Detail');
  };

  const perdata = async data => {
    setLoaderState(true);
    try {
      let response = await getPerProducts(data.id);
      console.log(response);
      setPerProductData(data);
      navigation.navigate('Product-Detail');
      setLoaderState(false);
    } catch (error) {
      setLoaderState(false);
      console.log(error);
    }
  };

  /* Function to handle carousel on scroll */
  const handleScroll = e => {
    setScroll(
      Math.round(
        e.nativeEvent.contentOffset.x / Dimensions.get('window').width +
          rw(0.1),
      ),
    );
  };

  /* Function to add product to cart using local storage */
  const handleAddCart = async (perProductData, type) => {
    let savedData = JSON.parse(await AsyncStorage.getItem('cart-items')) ?? [];
    let checkAlreadyExist = savedData.filter(
      (match, i) => match.id === perProductData.id,
    );
    /* Condition to handle same product add again in cart , if available it will alert otherwise add to cart*/
    if (checkAlreadyExist.length !== 0) {
      setTitle('Already added to cart');
      setOpen(true);
    } else {
      let addCount = [perProductData]?.map((data, i) => {
        data.count = 1;
        return data;
      });
      await AsyncStorage.setItem(
        'cart-items',
        JSON.stringify([...addCount, ...savedData]),
      );
      setAction(true);
      setTitle('Added to your cart');
      setOpen(true);
    }
  };

  /* Function to add products to favourites using local storage so state remain persist */
  const handleAddFav = async perProductData => {
    let savedData = JSON.parse(await AsyncStorage.getItem('products'));
    let index = savedData.findIndex(fIndex => fIndex.id === perProductData?.id);

    if (perProductData.favStatus === 0) {
      perProductData.favStatus = 1;
      savedData[index].favStatus = 1;
      setAction(false);
      setTitle('Added to favourites');
      setOpen(true);
    } else {
      perProductData.favStatus = 0;
      savedData[index].favStatus = 0;
      setAction(false);
      setTitle('Removed from favourites');
      setOpen(true);
    }

    await AsyncStorage.setItem('products', JSON.stringify(savedData));
    setProducts(savedData);
    setPerProductData({...perProductData});
  };

  return (
    <>
      {loaderState ? <GLobalLoader /> : <></>}
      <View style={styles.mainContainer}>
        <ScrollView>
          <View style={styles.scrollviewContainer}>
            <View style={styles.topTextContainer}>
              <Text style={styles.toptext}>Hey, Rahul</Text>
              <View style={styles.mainSearchContainer}>
                <View style={styles.searchbar}>
                  <IconSearch />
                  <TextInput
                    placeholder="Search Products or store"
                    placeholderTextColor={color.col_12}
                    style={{flex: 1, color: color.col_13}}
                  />
                </View>
              </View>
              <View style={styles.addressContainer}>
                <View style={{flex: 1}}>
                  <Text style={styles.deliveryText}>Delivery to</Text>
                  <View style={styles.flexContainerArrow}>
                    <Text style={styles.addressText}>
                      Green Way 3000, Sylhet{' '}
                    </Text>
                    <IconDownArrow />
                  </View>
                </View>
                <View>
                  <Text style={styles.deliveryText}>With In</Text>
                  <View style={styles.flexContainerArrow}>
                    <Text style={styles.addressText}>1 Hour </Text>
                    <IconDownArrow />
                  </View>
                </View>
              </View>
            </View>
            <View style={styles.scrollViewParentContainer}>
              <View style={{width: rw(100)}}>
                <ScrollView
                  disableIntervalMomentum
                  showsHorizontalScrollIndicator={false}
                  snapToInterval={rw(72)}
                  onScroll={e => handleScroll(e)}
                  horizontal
                  contentContainerStyle={styles.scrollView}>
                  {Array.from(Array(2).keys()).map((data, i) => {
                    return (
                      <View
                        key={i}
                        style={{
                          ...styles.suggestionCards,
                          opacity: scroll === i ? 1 : 0.4,
                        }}>
                        <View style={styles.cardLeftContainer}>
                          <CardSvg color={color.col_13} />
                        </View>
                        <View style={styles.cardRightContainer}>
                          <Text style={styles.rightContainerText_1}>Get</Text>
                          <Text style={styles.rightContainerText_2}>
                            50% OFF
                          </Text>
                          <Text style={styles.rightContainerText_3}>
                            On first 03 order
                          </Text>
                        </View>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            </View>
            <View
              style={{
                width: rw(90),
                justifyContent: 'center',
              }}>
              <Text style={styles.recommendText}>Recommended</Text>
              <View style={styles.productsRenderContainer}>
                {products?.map((data, i) => {
                  return (
                    <TouchableRipple
                      borderless
                      key={data?.id}
                      onPress={() => handlePerDetail(data)}
                      style={styles.product}>
                      <>
                        <Pressable
                          style={styles.iconHeartContainer}
                          onPress={() => handleAddFav(data)}>
                          {data.favStatus === 0 ? (
                            <IconHeartFade />
                          ) : (
                            <IconHeart />
                          )}
                        </Pressable>
                        <View style={styles.prodImageContainer}>
                          {/* <CardSvg color={color.col_16} /> */}
                          <Image
                            source={{uri: data?.thumbnail}}
                            style={styles.globalImageStyle}
                            resizeMode="cover"
                          />
                        </View>
                        <View style={styles.productDescripContainer}>
                          <View
                            style={{
                              width: '100%',
                              flexDirection: 'row',
                            }}>
                            <Text style={styles.priceText}>${data?.price}</Text>
                            <IconAdd onPress={() => handleAddCart(data)} />
                          </View>
                          <View
                            style={{
                              width: '100%',
                            }}>
                            <Text style={styles.brandText}>{data?.brand}</Text>
                          </View>
                        </View>
                      </>
                    </TouchableRipple>
                  );
                })}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>

      <GLobalSnackBar
        open={open}
        margin={rh(12)}
        setOpen={setOpen}
        action={action}
        title={title}
      />
    </>
  );
};
