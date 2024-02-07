import {useState} from 'react';
import {Dimensions, Pressable, StyleSheet, Text, View} from 'react-native';
import {
  responsiveScreenWidth as rw,
  responsiveScreenHeight as rh,
  responsiveFontSize as rf,
} from 'react-native-responsive-dimensions';
import {color} from '../../styles/color';
import {font_size} from '../../styles/font';
import {
  IconCategories,
  IconCategoriesBG,
  IconFav,
  IconHome,
  IconHomeBG,
  IconThreeDots,
} from '../../svgIcons';

export const NavigationDock = ({navigation}) => {
  const [activeTab, setActiveTab] = useState(0);
  
  /* Function to handle bottom tab routes */
  const handleTab = i => {
    setActiveTab(i);
    switch (i) {
      case 0:
        return navigation.navigate('Main-Home');
      case 1:
        return navigation.navigate('Dummy-Tab');
      case 2:
        return navigation.navigate('Dummy-Tab');
      case 3:
        return navigation.navigate('Dummy-Tab');
      default:
        return navigation.navigate('Main-Home');
    }
  };

  /* Json-array to render icons and text */
  const Icons = [
    {
      text: 'Home',
      iconModule: <IconHome />,
      iconModuleSelected: <IconHomeBG />,
    },
    {
      text: 'Categories',
      iconModule: <IconCategories />,
      iconModuleSelected: <IconCategoriesBG />,
    },
    {
      text: 'Favourite',
      iconModule: <IconFav />,
      iconModuleSelected: <IconFav />,
    },
    {
      text: 'More',
      iconModule: <IconThreeDots />,
      iconModuleSelected: <IconThreeDots />,
    },
  ];

  return (
    <>
      <View style={styles.NavigationBox}>
        {Icons.map((icon, i) => {
          return (
            <Pressable
              underlayColor={'none'}
              onPress={() => handleTab(i)}
              key={i}
              style={{
                ...styles.NavigationIconBox,
                marginTop: activeTab === i ? '-5%' : rh(1.4),
              }}>
              <>
                {activeTab === i ? (
                  <View style={styles.iconContainer}>
                    {icon.iconModuleSelected}
                  </View>
                ) : (
                  icon.iconModule
                )}
                {activeTab === i ? (
                  <></>
                ) : (
                  <Text style={styles.iconText}>{icon.text}</Text>
                )}
              </>
            </Pressable>
          );
        })}
      </View>
    </>
  );
};

export const styles = StyleSheet.create({

  /*Navigation bar styling */
  NavigationBox: {
    width: Dimensions.get('window').width,
    height: rh(9.7),
    backgroundColor: color.col_11,
    borderRadius: 30,
    position: 'absolute',
    bottom: '0%',
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopColor: '#707070',
  },
  NavigationIconBox: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: rw(4.6),
    fontSize: font_size.fs_15,
    fontWeight: 'bold',
    marginTop: rh(1.4),
  },
  iconContainer: {
    width: 70,
    height: 70,
    borderRadius: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.col_13,
  },
  iconText: {
    fontSize: font_size.fs_12,
    fontWeight: '400',
    marginTop: '7%',
    color: color.col_12,
  },
});
