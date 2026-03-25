import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import company1 from "../../assets/Company-1.png";
import company2 from "../../assets/Company-2.png";
import company3 from "../../assets/Company-3.png";
import company4 from "../../assets/Company-4.png";
import company5 from "../../assets/Company-5.png";
import company6 from "../../assets/Company-6.png";

export default function CompanySlider() {
  const companies = [
    { id: 1, name: "company1", logo: company1 },
    { id: 2, name: "company2", logo: company2 },
    { id: 3, name: "company3", logo: company3 },
    { id: 4, name: "company4", logo: company4 },
    { id: 5, name: "company5", logo: company5 },
    { id: 6, name: "company6", logo: company6 },
  ];

  return (
    <section className="py-8 px-6 md:px-16">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={5}
        spaceBetween={40}
        loop={true}
        autoplay={{ delay: 0, disableOnInteraction: false }}
        speed={4000}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          1024: { slidesPerView: 5 },
        }}
      >
        {companies.map((company) => (
          <SwiperSlide
            key={company.id}
            className="flex items-center justify-center"
          >
            <img
              src={company.logo}
              alt={company.name}
              className="h-16 opacity-70 grayscale hover:opacity-100 hover:grayscale-0 transition duration-300"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
