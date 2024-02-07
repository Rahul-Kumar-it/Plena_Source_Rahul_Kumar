import React, {useEffect, useState} from 'react';
import {
  Image,
  LayoutAnimation,
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
import {TouchableRipple} from 'react-native-paper';

export const Cart = ({navigation}) => {
  const [loaderState, setLoaderState] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [productList, setProductList] = useState([]);

  /* Backhandler */
  const handleBack = () => {
    navigation.goBack();
  };

  /* Useffect to load cart items from localstorage to save current states */
  useEffect(() => {
    (async () => {
      setLoaderState(true);
      console.log(
        JSON.parse(await AsyncStorage.getItem('cart-items')),
        'dfffff',
      );
      if (!(await AsyncStorage.getItem('cart-items'))) {
        setProductList([]);
        setLoaderState(false);
      } else {
        setProductList(JSON.parse(await AsyncStorage.getItem('cart-items')));
        setTimeout(() => {
          setLoaderState(false);
        }, 1000);
      }
    })();
  }, []);

  let deliveryCharges = productList?.length === 0 ? 0 : 2; // delivery charge

  let total = productList // total price
    ?.map(total => total.price)
    ?.reduce((a, b) => a + b, 0);

  let totalcount = productList // total count of items
    ?.map(total => total.count)
    ?.reduce((a, b) => a + b, 0);

  let totalDiscount = productList // total discount of each item
    ?.map(total => total.discountPercentage)
    ?.reduce((a, b) => a + b, 0);

  let subtotal = Math?.abs(
    Math.round(total - (total * totalDiscount) / 100) * totalcount, // subtotal of price
  );

  let grandTotal = Math?.abs(deliveryCharges + subtotal); // final grand total after adding all discount and count

  /* Function to proceed and checkout */
  const handleOrder = async () => {
    if (productList.length !== 0) {
      setOpen(true);
      setTimeout(async () => {
        navigation.navigate('Main-Home');
        await AsyncStorage.setItem('cart-items', JSON.stringify([]));
      }, 2000);
    }
  };

  /* Functions to handle decrement of item count */
  const handleDecre = data => {
    data.count <= 0 ? '' : (data.count -= 1);
    setProductList([...productList]);
    handleRemoveItem(data);
  };

  /* Functions to remove item when count is 0 */
  const handleRemoveItem = async data => {
    console.log(data, 'countdata');
    if (data.count === 0) {
      let removeItem = productList.splice(
        productList.findIndex((fIndex, i) => fIndex?.id === data?.id),
        1,
      );
      console.log(removeItem, 'itemRemoved');
      setProductList([...productList]);
      await AsyncStorage.setItem('cart-items', JSON.stringify(productList));
    }
  };

  /* Functions to handle increament of item count */
  const handleIncrea = data => {
    data.count += 1;
    setProductList([...productList]);
  };

  /* Functions to get item json for rendering through virtualized list */
  const getItem = (_data, index) => {
    console.log(_data, 'hshjvcn');
    return {
      id: Math.random().toString(12).substring(0),
      data: _data[index],
      index: index,
    };
  };

  /* Functions to get total items in virtualized list */
  const getItemCount = _data => {
    return _data.length;
  };

  /* Functional component to render data in virtualized list */
  const Item = ({data, index}) => {
    console.log(data, 'item');
    return (
      <View style={{...styles.mainCartItemContainer, opacity: edit ? 1 : 0.6}}>
        {/* <IconCartImg /> */}
        <View style={{width: 40, height: 40}}>
          <Image
            source={{uri: data?.thumbnail}}
            style={styles.globalImage}
            resizeMode="cover"
          />
        </View>
        <View style={{justifyContent: 'center', flex: 1}}>
          <Text style={styles.brandText}>
            {data?.brand} - {data?.title}
          </Text>
          <Text style={styles.priceWithDiscountText}>
            $
            {Math.round(
              data?.price - (data?.price * data?.discountPercentage) / 100,
            )}
          </Text>
        </View>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <IconDecre onPress={() => (edit ? handleDecre(data) : '')} />
          <TextInput
            inputMode="none"
            defaultValue={`${data?.count}`}
            value={`${data?.count}`}
            editable={true}
            style={{marginLeft: rw(3)}}
          />
          <IconIncre onPress={() => (edit ? handleIncrea(data) : '')} />
        </View>
      </View>
    );
  };

  return (
    <>
      {loaderState ? <GLobalLoader /> : <></>}

      <View style={styles.mainContainer}>
        <View style={styles.minHeightContainer}>
          <View style={styles.headerContainer}>
            <IconBack onPress={handleBack} />
            <Text style={styles.cartText}>
              Shopping Cart ({productList?.length ?? 0})
            </Text>
          </View>
          <View style={styles.cartItemContainer}>
            {productList?.length === 0 ? (
              <View style={styles.emptyCartContainer}>
                <Text style={styles.noItemText}>No items in cart</Text>
              </View>
            ) : (
              <>
                <VirtualizedList
                  data={productList}
                  initialNumToRender={15}
                  renderItem={({item}) => (
                    <Item data={item.data} index={item.index} />
                  )}
                  keyExtractor={item => item.id}
                  getItemCount={getItemCount}
                  getItem={getItem}
                />
              </>
            )}
          </View>
          {productList?.length !== 0 ? (
            <View style={{width: '81%', alignItems: 'flex-end'}}>
              <Text
                onPress={() => setEdit(true)}
                style={{
                  fontSize: font_size.fs_12,
                  color: color.col_1,
                  fontFamily: fontFamily.fm_5,
                }}>
                Edit
              </Text>
            </View>
          ) : (
            <></>
          )}
          <View style={styles.bottomContainer}>
            <View style={styles.priceContainer}>
              <Text style={styles.totalText}>Subtotal</Text>
              <View style={{flex: 1}}></View>
              <Text style={styles.totalValueText}>
                ${Number.isNaN(subtotal) ? 0 : subtotal}
              </Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.totalText}>Delivery</Text>
              <View style={{flex: 1}}></View>
              <Text style={styles.totalValueText}>${deliveryCharges}</Text>
            </View>
            <View style={styles.priceContainer}>
              <Text style={styles.totalText}>Total</Text>
              <View style={{flex: 1}}></View>
              <Text style={styles.totalValueText}>${grandTotal}</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableRipple
                borderless
                onPress={handleOrder}
                style={styles.proceedButton}>
                <Text style={styles.proceedText}>Proceed To checkout</Text>
              </TouchableRipple>
            </View>
          </View>
        </View>
        <GLobalSnackBar
          open={open}
          setOpen={setOpen}
          action={false}
          margin={rh(0)}
          title={'Order placed successfully'}
        />
      </View>
    </>
  );
};
