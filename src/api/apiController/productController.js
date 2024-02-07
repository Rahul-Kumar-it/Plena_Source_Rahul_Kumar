import React from 'react';
import axios from 'react-native-axios';
import {BASE_URL, HOST_URL,} from '../apiVars/constants';

export const getProducts = async body => {
  try {
    let response = await axios({
      method: 'GET',
      url: HOST_URL.url + BASE_URL.url,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};

export const getPerProducts = async id => {
  try {
    let response = await axios({
      method: 'GET',
      url: HOST_URL.url + BASE_URL.url + `/${id}`,
    });
    return response;
  } catch (error) {
    return error.response;
  }
};


