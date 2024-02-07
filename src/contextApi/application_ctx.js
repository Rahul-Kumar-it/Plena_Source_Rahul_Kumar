import {createContext, useState} from 'react';
import React from 'react';
import {useRef} from 'react';

export const ApplicationContext = createContext();

export const ApplicationContextProvider = props => {
  /* API data */
  const [products, setProducts] = useState([]);

  const [perProductData, setPerProductData] = useState({});

  const values = {
    /* API Data */
    products,
    setProducts,
    perProductData,
    setPerProductData,
  };

  return (
    <ApplicationContext.Provider value={values}>
      {props.children}
    </ApplicationContext.Provider>
  );
};
