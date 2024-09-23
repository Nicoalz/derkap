'use client';
import type { NextPage } from 'next';

import Head from 'next/head';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';

const Profile: NextPage = () => (
  <>
    <Head>
      <title>Swipe</title>
      <meta name="description" content="Profile" />
    </Head>
    <div className="flex justify-center items-center">
      <Swiper
        effect={'cards'}
        loop={true}
        grabCursor={true}
        modules={[EffectCards]}
        className="swiper"
      >
        <SwiperSli de>Slide 1</SwiperSli>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </div>
  </>
);

export default Profile;
