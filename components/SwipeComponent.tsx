"use client"
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
// import required modules
import { TPostDb } from '@/types';
import { Pagination } from 'swiper/modules';
import Post from './Post';

import { useEffect, useState } from 'react';
import { Swiper as TSwiper } from 'swiper/types';
import Loader from './Loader';


interface SlidersData {
  posts: TPostDb[];
  index: number;
}

export const SwipeComponent: React.FC<{ posts: TPostDb[] }> = ({
  posts
}) => {
  const POSTS_PER_SLIDER = 10;
  const [allSliders, setAllSliders] = useState<SlidersData[]>([]);
  const [activeSlider, setActiveSlider] = useState<SlidersData | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let sliders: SlidersData[] = [];
    for (let i = 0; i < posts.length; i += POSTS_PER_SLIDER) {
      const fakePost = {
        id: 0,
        user: {
          created_at: new Date().toISOString(),
          id: '0',
          avatar_url: '/mrderka.png',
          name: 'fake-user',
          username: 'fake-username'
        },
        description: 'fake-description',
        created_at: new Date().toISOString(),
        is_photo: true,
        file_name: 'fake-file-name',
        file_url: '/fake-file-url',
        feed: ''
      }
      const postsToAdd = posts.slice(i, i + POSTS_PER_SLIDER)
      postsToAdd.push(fakePost)
      sliders.push({
        posts: postsToAdd,
        index: sliders.length
      });

    }
    console.log('sliders', sliders);
    setAllSliders(sliders);
    setActiveSlider(sliders[0]);
  }, [])


  const handleActiveIndexChange = async (swiper: TSwiper) => {
    const activeIndex = swiper.activeIndex;
    const isLastSlide = activeIndex === POSTS_PER_SLIDER
    console.log({ isLastSlide });
    if (isLastSlide && activeSlider) {
      setIsLoading(true)
      changeSlider(activeSlider)
      swiper.slideTo(0, 0, false)
      await new Promise(resolve => setTimeout(resolve, 500))
      setIsLoading(false)
    }
  }

  const changeSlider = (activeSlider: SlidersData) => {
    const nextIndex = activeSlider.index + 1 > allSliders.length - 1 ? 0 : activeSlider.index + 1;
    console.log({ nextIndex });
    console.log({ allSliders });
    const nextSlider = allSliders.find(slider => slider.index === nextIndex);
    console.log({ nextSlider });
    setActiveSlider(nextSlider);
  }

  return (
    <>
      {
        isLoading ? (
          <Loader />
        ) : (
          activeSlider && activeSlider.posts ? (
            <Swiper
              slidesPerView={1.2}
              centeredSlides={true}
              spaceBetween={20}
              grabCursor={true}
              pagination={{
                clickable: true,
              }}
              modules={[Pagination]}
              className="swiper w-full no-scrollbar"
              onActiveIndexChange={handleActiveIndexChange}
            >
              {
                activeSlider.posts.map((post, index) => (
                  <SwiperSlide className='no-scrollbar h-fit bg-card overflow-x-hidden' key={index}>
                    <Post postData={post} />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          ) : (
            <p>No posts available</p>
          )
        )
      }
    </>

  );
}
