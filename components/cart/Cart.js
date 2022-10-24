import React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Store from '../../store/storeInitialize';
import { observer } from 'mobx-react-lite';
import { useRouter } from 'next/router';

const Cart = () => {
  const router = useRouter();
  
  return (
    <Badge color="secondary" badgeContent={Store.ItemList.length} onClick={()=>{ router.push('/mycart')}}>
      <ShoppingCartIcon />
    </Badge>
  );
};

export default observer(Cart);
