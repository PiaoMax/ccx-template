
import React, { useState } from 'react';
import global from './GlobalModel'

const models = {
  global
}

export const useStore = () => {
  const [m] = useState(() => models);
  return m;
};

export default models;