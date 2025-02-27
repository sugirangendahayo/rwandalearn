import Aos from "aos";
import "aos/dist/aos.css";

// Initialize AOS
const initializeAOS = () => {
  Aos.init({
    duration: 1200, // Animation duration (1 second)
    // easing: "ease-in-out", // Animation easing
    // once: true, // Animation runs only once
    // mirror: false, // Elements do not animate on scroll back
  });
};
export default initializeAOS;
