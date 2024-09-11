"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-cards';

// import required modules
import { TPostDb } from '@/types';
import { Pagination } from 'swiper/modules';
import Post from './Post';

export const SwipeComponent: React.FC<{ posts: TPostDb[] }> = ({
  posts
}) => (
  <div className='flex justify-center items-center w-full no-scrollbar h-[32rem]'>
    <Swiper
      slidesPerView={1.2}
      centeredSlides={true}
      spaceBetween={20}
      grabCursor={true}
      pagination={{
        clickable: true,
      }}
      modules={[Pagination]}
      className="swiper w-full no-scrollbar "
    >
      {
        posts.map((post, index) => (
          <SwiperSlide className='no-scrollbar h-fit bg-card overflow-x-hidden' key={index}>
            <Post postData={post} />
          </SwiperSlide>
        ))
      }

    </Swiper>
  </div>
);
