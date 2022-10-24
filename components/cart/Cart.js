import Link from 'next/link';
import React from 'react';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const Cart = () => {
  return (
    <Link href="/cart/cart">
      <Badge color="secondary" badgeContent={5}>
        <ShoppingCartIcon />
      </Badge>
    </Link>
  );
};

export default Cart;
