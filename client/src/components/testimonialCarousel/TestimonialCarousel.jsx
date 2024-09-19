import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { testimony } from "../../data";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// Import Custom Styles
import "./testimonialCarousel.css";

function TestimonialCarousel() {
  return (
    <div className="innerWrapper bg-gradient-to-r from-blue-50 to-indigo-50 pt-2 pb-20">
      <div className="testimonialTitle mt-20 mb-20 w-full flex justify-center">
        <div className="titleContent flex-col text-center">
          <h1 className="font-extrabold text-4xl lg:text-6xl md:text-5xl">
            Public Cheer for us
          </h1>
          <p className="lead text-lg md:text-2xl lg:text-2xl mt-2">
            What Investors are saying about us...
          </p>
        </div>
      </div>
      <div className="carouselContent max-w-4xl mx-auto px-10">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          autoplay={{
            delay: 5000, // 5 seconds delay between slides
            disableOnInteraction: false, // Continue autoplay after use interaction
          }}
          className="w-full"
        >
          {testimony.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="testimonywrapper relative overflow-hidden rounded-lg shadow-lg min-h-[200px]">
                <div className="absolute inset-0 bg-secondary-light bg-opacity-50 backdrop-blur-sm"></div>
                <div className="relative z-10 p-6 md:ml-10 md:mr-10 lg:ml-10 lg:mr-10 ">
                  <div className="top flex justify-between items-start mb-4">
                    <div className="left flex items-center">
                      <div className="testifier mr-4">
                        <img
                          className="w-16 h-16 rounded-full object-cover border-2 border-white"
                          src={item.image}
                          alt={item.name}
                        />
                      </div>
                      <div className="name">
                        <h3 className="font-bold text-lg text-primary">
                          {item.name}
                        </h3>
                        <h5 className="text-sm text-gray-600">
                          {item.Designation}
                        </h5>
                      </div>
                    </div>
                    <div className="right text-3xl text-primary">
                      {typeof item.icon === "function"
                        ? item.icon()
                        : item.icon}
                    </div>
                  </div>
                  <div className="bottom py-5">
                    <p className="text-gray-700 italic">{item.testimony}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

export default TestimonialCarousel;
