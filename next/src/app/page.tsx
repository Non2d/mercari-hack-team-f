"use client";

import MobileHeader from '../components/MobileHeader';
import DanshariHome from '../components/DanshariHome';
import MobileFooter from '../components/MobileFooter';

export default function Home() {

  return (
    <>
      <MobileHeader title="断捨離" />
      <DanshariHome />
      <MobileFooter />
    </>
  );
}