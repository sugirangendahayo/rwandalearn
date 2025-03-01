/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import image from "../assets/images/happy-woman.png";
import image2 from "../assets/images/sneakers.png";
import image3 from "../assets/images/black_basket.png";
import image4 from "../assets/images/lotion.png";
import image5 from "../assets/images/gray-watch.png";
import image6 from "../assets/images/shoes.png";
import image7 from "../assets/images/dress.png";
import image8 from "../assets/images/cream.png";
import image9 from "../assets/images/lotion.png";
import image10 from "../assets/images/appliances.png";
import image11 from "../assets/images/house-decoration.png";
import image12 from "../assets/images/handbag.png";
import book from "../assets/images/book.png"
import google_trduction from "../assets/images/google-translate.png";
import aiboat from "../assets/images/aibot.png";
import badge from "../assets/images/badge.png";
import roboticon from "../assets/images/robot.png";
import traductionicon from "../assets/images/traduction.png";

// import roboticon from "../assets/images/robot.png";
// import roboticon from "../assets/images/robot.png";
// import image10 from "../assets/images/";
import TypewriterComponent from "../utils/TypewriterComponent";
import initializeAOS from "../utils/aosConfig";
import ScrollTop from "../utils/ScrollTop";
import { InfiniteMovingCards } from "../utils/Infinite-moving-card";

const Home = () => {
    const items = [
      { name: "John Doe", title: "Engineer", quote: "This is a test quote." },
      { name: "Jane Smith", title: "Designer", quote: "Another test quote." },
    ];

  useEffect(() => {
    initializeAOS();
  });
  return (
    <>
      <section className="overflow-hidden">
        <ScrollTop />
        <div className="grid  lg:grid-cols-2  max-w-wrap-width  pb-2 shadow-inner">
          <div
            className="pr-3 pl-3 order-2 sm:order-2 md:order-2 lg:order-1"
            data-aos="fade-right"
          >
            <h1 className="text-4xl px-4 text-center sm:text-center md:text-center lg:text-left text-black md:mt-0 sm:mt-0 lg:mt-20">
              <TypewriterComponent
                strings={[
                  "Learn Kinyarwanda effortlessly , speak it with confidence!",
                  "Join now and master Kinyarwanda with AI-powered lessons and quizzes!",
                ]}
              />
            </h1>
            <p className="text-center px-4 mt-[8%] pb-5 sm:text-center md:text-center lg:text-left">
              {" "}
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. In et
              incidunt iusto deleniti. Maiores non reiciendis suscipit sequi,
              repellendus praesentium minima ratione eos culpa sint itaque iste
              quod repellat! Similique?{" "}
            </p>{" "}
            <button className="p-2 ml-4 rounded text-white bg-cyan-900 ">
              Join now
            </button>
          </div>
          <div className=" m-auto order-1" data-aos="fade-left">
            <img src={image} alt="Person shopping" className="object-cover" />
          </div>
        </div>
        <div className="parent-badges" data-aos="fade-down">
          <div className="badges">
            <div className="bg-gray-300 px-5 py-5 text-white rounded-full">
              <span>
                <svg
                  data-slot="icon"
                  fill="none"
                  className="w-7"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
                  ></path>
                </svg>
              </span>
            </div>
            <div>
              <span>Prize badget </span>
              <span>Get awards a badget</span>
            </div>
          </div>
          <div className="badges">
            <div className="bg-gray-300 px-5 py-5 text-white rounded-full">
              <span>
                <svg
                  data-slot="icon"
                  fill="none"
                  className="w-7"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.182 15.182a4.5 4.5 0 0 1-6.364 0M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75Zm-.375 0h.008v.015h-.008V9.75Z"
                  ></path>
                </svg>
              </span>
            </div>
            <div>
              <span>Social interaction</span>
              <span>Be able to interact with others</span>
            </div>
          </div>
          <div className="badges">
            <div className="bg-gray-300 px-5 py-5 text-white rounded-full">
              <span>
                <svg
                  data-slot="icon"
                  fill="none"
                  className="w-7"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                  ></path>
                </svg>
              </span>
            </div>
            <div>
              <span>Free knowledge</span>
              <span>Get a free knowledge</span>
            </div>
          </div>
          <div className="badges">
            <div className="bg-gray-300 px-5 py-5 text-white rounded-full">
              <span>
                <svg
                  data-slot="icon"
                  className="w-6"
                  fill="none"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  ></path>
                </svg>
              </span>
            </div>
            <div>
              <span>24h/6 support</span>
              <span>Contact us anytime want</span>
            </div>
          </div>
        </div>
      </section>
      <section className="mt-5 px-2">
        <div className="grid md:grid-cols-3 grid-cols-1 gap-4">
          <div
            className="bg-cyan-900 p-4 relative rounded-[20px]"
            data-aos="fade-right"
          >
            <div className="absolute top-[20%] left-[10%] ">
              <span className="text-white text-[19px]">
                <span>50% OFF </span> <br />{" "}
                <span className="font-semibold">Sneakers</span>
              </span>
            </div>
            <div className="p-2">
              <span>
                <img src={book} alt="" className="max-w-48 float-end" />
              </span>
            </div>
          </div>
          <div
            className="bg-green-900 p-4 relative rounded-[20px]"
            data-aos="fade-up"
          >
            <div className="absolute top-[20%] right-[10%] ">
              <span className="text-white text-[19px]">
                <span>100% OFF </span> <br />{" "}
                <span className="font-semibold">Acurate translation</span>
              </span>
            </div>
            <div>
              <span>
                <img
                  src={google_trduction}
                  alt=""
                  className="max-w-48 float-start"
                />
              </span>
            </div>
          </div>
          <div
            className="bg-black p-4 md:row-span-2 relative rounded-[20px]"
            data-aos="fade-left"
          >
            <div className="absolute top-[10%] left-[10%] bg-black/50 sm:bg-transparent p-2 rounded-sm">
              <span className="text-white text-[23px]">
                <span>100% ACCESS </span> <br />{" "}
                <span className="font-semibold">
                  of Ai <br /> for assistance
                </span>
              </span>
            </div>
            <div className="md:absolute bottom-0 right-0">
              <img src={aiboat} alt="" className="max-w-56 float-end" />
            </div>
          </div>
          <div
            className="bg-gray-400 p-4 relative rounded-[20px] md:col-span-2 col-span-1"
            data-aos="fade-up"
          >
            <div className="absolute top-[20%] left-[10%] bg-black/50 sm:bg-transparent p-2 rounded-sm">
              <span className="text-white text-[23px]">
                <span>50% OFF </span> <br />{" "}
                <span className="font-semibold">
                  Sale 58% off <br /> All watches products
                </span>
              </span>
            </div>
            <div>
              <span>
                <img
                  src={badge}
                  alt=""
                  className="float-end object-cover max-w-48"
                />
              </span>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div>
          <h1 className="font-semibold px-3 py-5 text-[25px] text-center">
            Discover Sytem
            <span className="text-cyan-700"> functionnalities</span>
          </h1>
          <div className="grid sm:grid-cols-2 md:grid-cols-6 gap-4 px-3">
            <div className="category-badges">
              <span className="flex justify-center py-4">
                {" "}
                <img src={roboticon} alt="" className="max-w-20 " />
              </span>
              <span className="text-category">Ai chat and assistance</span>
            </div>
            <div className="category-badges">
              <span className="flex justify-center py-4">
                {" "}
                <img src={traductionicon} alt="" className="max-w-20 " />
              </span>
              <span className="text-category">Clothing and accessories</span>
            </div>
            <div className="category-badges">
              <span className="flex justify-center py-4">
                {" "}
                <img src={roboticon} alt="" className="max-w-20 " />
              </span>
              <span className="text-category">Ai chat and assistance</span>
            </div>
            <div className="category-badges">
              <span className="flex justify-center py-4">
                {" "}
                <img src={traductionicon} alt="" className="max-w-20 " />
              </span>
              <span className="text-category">Clothing and accessories</span>
            </div>
            <div className="category-badges">
              <span className="flex justify-center py-4">
                {" "}
                <img src={roboticon} alt="" className="max-w-20 " />
              </span>
              <span className="text-category">Ai chat and assistance</span>
            </div>
            <div className="category-badges">
              <span className="flex justify-center py-4">
                {" "}
                <img src={traductionicon} alt="" className="max-w-20 " />
              </span>
              <span className="text-category">Clothing and accessories</span>
            </div>
          </div>
        </div>
        <div>
          <InfiniteMovingCards items={items} />
        </div>
      </section>
    </>
    // Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident quae iste, labore molestiae quam optio molestias deserunt ad harum ab at porro pariatur expedita, repellendus nostrum eos. Impedit, laborum fugiat.
  );
};

export default Home;
