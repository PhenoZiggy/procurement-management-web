import Link from 'next/link';
import React, { useEffect } from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Store from '../../store/storeInitialize';
import { observer } from 'mobx-react-lite';

const Cart = () => {
  return (
    <Link href="/cart/cart">
      <Badge color="secondary" badgeContent={Store.ItemList.length}>
        <ShoppingCartIcon />
      </Badge>
    </Link>
  );
};

export default observer(Cart);
