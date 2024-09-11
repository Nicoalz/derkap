"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { EffectCards } from 'swiper/modules';
import { TPostDb } from '@/types';
import Post from './Post';

export const SwipeComponent: React.FC<{ posts: TPostDb[] }> = ({
  posts
}) => (
  <div className='flex justify-center items-center w-full no-scrollbar'>
    <Swiper
      effect={'cards'}
      loop={true}
      grabCursor={true}
      modules={[EffectCards]}
      className="swiper w-80 h-full no-scrollbar"
    >
      {
        posts.map((post, index) => (
          <SwiperSlide className='no-scrollbar' key={index}>
            <Post postData={post} />
          </SwiperSlide>
        ))
      }

    </Swiper>
  </div>
);
