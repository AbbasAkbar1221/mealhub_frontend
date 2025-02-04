import React from "react";
import {
  ArrowRight,
  TrendingUp,
  Star,
  Facebook,
  Twitter,
  Instagram,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import carousal1 from "../assets/carousal1.jpg";
import carousal2 from "../assets/carousal2.jpg";
import carousal3 from "../assets/carousal3.jpg";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const HomePage = () => {
  const navigate = useNavigate();
  const carouselImages = [carousal1, carousal2, carousal3];
  const user = useSelector((state) => state.auth.currentUser);
  const pizzaImg = "./pizzaImg.jpeg";
  const burgerImg = "./burgerImg.jpeg";
  const sushiImg = "./sushiImg.jpeg";
  const indianImg = "./indianImg.jpeg";
  const mexicanImg = "./mexicanImg.jpeg";
  const italianImg = "./italianImg.jpeg";
  const chineseImg = "./chineseImg.webp";
  const dessertImg = "./dessertImg.jpeg";

  const categories = [
    { title: "Pizza", image: pizzaImg },
    { title: "Burgers", image: burgerImg },
    { title: "Sushi", image: sushiImg },
    { title: "Indian", image: indianImg },
    { title: "Mexican", image: mexicanImg },
    { title: "Italian", image: italianImg },
    { title: "Chinese", image: chineseImg },
    { title: "Desserts", image: dessertImg },
  ];

  return (
    <div className="min-h-screen bg-white">
      <style>
        {`
      .swiper-button-next, .swiper-button-prev {
        color: white !important;
      }
      .swiper-pagination-bullet {
        background-color: white !important;
      }
      .swiper-pagination-bullet-active {
        background-color: white !important;
      }
    `}
      </style>
      <section className="relative h-screen">
        <Swiper
          modules={[Pagination, Navigation, Autoplay]}
          spaceBetween={0}
          slidesPerView={1}
          pagination={{ clickable: true }}
          navigation
          autoplay={{ delay: 4000 }}
          loop={true}
          className="w-full h-full"
        >
          {carouselImages.map((img, index) => (
            <SwiperSlide key={index} className="relative">
              <div className="absolute inset-0">
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${img})` }}
                ></div>
                <div className="absolute inset-0 bg-black/50"></div>
              </div>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white z-10">
                <motion.h2
                  className="text-amber-500 font-serif italic text-4xl mb-4"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                >
                  Welcome to
                </motion.h2>

                <motion.h1
                  className="text-7xl font-bold mb-6"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  FOODIE HEAVEN
                </motion.h1>

                <motion.p
                  className="text-xl mb-12"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  THE BEST MULTI CUISINE EXPERIENCE
                </motion.p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-20">
          <motion.button
            onClick={() => (user ? navigate("/counter") : navigate("/login"))}
            className="text-white bg-amber-600 hover:bg-amber-700 px-8 py-3 rounded-sm flex items-center gap-2 mx-auto transition-colors"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            GET STARTED <ArrowRight size={20} />
          </motion.button>
        </div>
      </section>

      <section className="py-24 bg-neutral-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h3 className="text-amber-500 font-serif italic text-2xl mb-2">
              Our story
            </h3>
            <h2 className="text-4xl font-bold text-white mb-8">ABOUT US</h2>
            <p className="max-w-2xl mx-auto text-neutral-400">
              Experience culinary excellence at its finest. Our passionate team
              crafts unforgettable dining experiences that blend tradition with
              innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FeatureCard
              icon="🚚"
              title="FREE DELIVERY"
              description="Complimentary delivery service for your convenience"
            />
            <FeatureCard
              icon="👨‍🍳"
              title="MASTER CHEFS"
              description="Culinary experts crafting exceptional dishes"
            />
            <FeatureCard
              icon="🌟"
              title="PREMIUM QUALITY"
              description="Only the finest ingredients make it to your plate"
            />
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-3xl font-bold text-white">
              Popular Categories
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
            {categories.map((category) => (
              <NavLink
                key={category.title}
                to={user ? "/counter" : "/login"}
                className="block transform hover:-translate-y-1 transition-transform duration-300"
              >
                <CategoryCard title={category.title} image={category.image} />
              </NavLink>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-neutral-900">
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-4 mb-12">
            <TrendingUp className="w-8 h-8 text-amber-500" />
            <h2 className="text-3xl font-bold text-white">Today's Specials</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <SpecialCard
              image="./special1.jpeg"
              title="Signature Pizza"
              discount="40% OFF"
              rating="4.8"
              cuisine="Italian"
            />
            <SpecialCard
              image="./special2.jpeg"
              title="Deluxe Burger"
              discount="30% OFF"
              rating="4.6"
              cuisine="American"
            />
            <SpecialCard
              image="./special3.jpeg"
              title="Premium Sushi"
              discount="25% OFF"
              rating="4.9"
              cuisine="Japanese"
            />
          </div>
        </div>
      </section>
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div>
            <h3 className="text-xl font-bold mb-4">Foodie Heaven</h3>
            <p className="text-gray-400">
              Delivering the best food experience to your doorstep.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <NavLink
                  to="/"
                  className="text-gray-400 hover:text-white transition"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to=""
                  className="text-gray-400 hover:text-white transition"
                >
                  About
                </NavLink>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Menu
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex justify-center md:justify-start gap-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Facebook size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Twitter size={24} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-black rounded-sm hover:bg-neutral-800 transition-colors">
    <div className="text-4xl mb-4">{icon}</div>
    <h3 className="text-xl font-bold mb-2 text-white">{title}</h3>
    <p className="text-neutral-400">{description}</p>
  </div>
);

const CategoryCard = ({ title, image }) => (
  <div className="relative group overflow-hidden rounded-lg">
    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-60 z-10" />

    <img
      src={image}
      alt={title}
      className="w-full h-64 object-cover transform group-hover:scale-105 transition-transform duration-500"
    />

    <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>

      <div className="flex items-center text-white/80 text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
        <span className="mr-2">Explore</span>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  </div>
);

const SpecialCard = ({ image, title, discount, rating, cuisine }) => (
  <div className="group relative overflow-hidden rounded-sm">
    <img
      src={image}
      alt={title}
      className="w-full h-64 object-cover transition-transform group-hover:scale-110 duration-700"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
      <div className="flex items-center gap-2 mb-2">
        <Star className="w-5 h-5 text-amber-500" />
        <span className="text-white">{rating}</span>
      </div>
      <h3 className="text-xl font-bold text-white mb-1">{title}</h3>
      <p className="text-neutral-300 text-sm mb-2">{cuisine}</p>
      <p className="text-amber-500 font-bold">{discount}</p>
    </div>
  </div>
);

export default HomePage;
