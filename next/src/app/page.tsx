"use client";

import Header from '../components/Header';

export default function Home() {
  const products = [
    { id: 1, name: 'Product 1', price: '$10' },
    { id: 2, name: 'Product 2', price: '$20' },
    { id: 3, name: 'Product 3', price: '$30' },
  ];

  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold mb-4">商品リスト</h1>
      <ul className="list-disc pl-5">
        {products.map(product => (
          <li key={product.id} className="mb-2">
            {product.name} - {product.price}
          </li>
        ))}
      </ul>
    </>
  );
}