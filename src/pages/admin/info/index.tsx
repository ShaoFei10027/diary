import React, { useEffect } from 'react';
import { getUser } from '@/api';

export default function Info() {
  useEffect(() => {
    console.log('info');
    getUser();
  }, []);
  return <>info</>;
}
