/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Add your form submission logic here (e.g., API call)
    setFormData({ name: "", email: "", message: "" }); // Reset form
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-cyan-900">Contact Us</h1>
          <p className="mt-2 text-lg text-base-content/70">
            We'd love to hear from you! Fill out the form below or reach us
            directly.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Form */}
          <div className="bg-base-100 p-6 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-base-content"
                >
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-1"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-base-content"
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input input-bordered w-full mt-1"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-base-content"
                >
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="textarea textarea-bordered w-full mt-1"
                  placeholder="Your Message"
                  rows="4"
                  required
                ></textarea>
              </div>
              <button type="submit" className="btn bg-cyan-900 text-white w-full">
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Info */}
          <div className="bg-base-100 p-6 rounded-lg shadow-lg flex flex-col space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-cyan-900">
                Get in Touch
              </h3>
              <p className="mt-2 text-base-content/70">
                Have questions or suggestions? We're here to help!
              </p>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>+250 123 456 789</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span>support@kinyalearn.com</span>
              </div>
              <div className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 text-cyan-900"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span>Kigali, Rwanda</span>
              </div>
            </div>
            <div className="flex gap-4 justify-center">
              <a href="#" className="btn btn-circle btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c5.523 0 10 4.477 10 10 0 5.523-4.477 10-10 10-1.148 0-2.24-.194-3.26-.546-.37-.123-.74-.247-1.11-.37-.37-.124-.74-.247-1.11-.37-.57-.186-1.14-.37-1.71-.556-.57-.185-1.14-.37-1.71-.555-1.14-.37-2.28-.74-3.42-1.11-.57-.186-1.14-.37-1.71-.556-.37-.123-.74-.247-1.11-.37-.37-.123-.74-.247-1.11-.37-.52-.173-1.04-.346-1.56-.52C2.163 16.66 2 15.523 2 14.163c0-5.523 4.477-10 10-10zm-1.84 15.55c-.07-.023-.14-.046-.21-.07-.07-.023-.14-.046-.21-.07-.21-.07-.42-.14-.63-.21-.21-.07-.42-.14-.63-.21-.42-.14-.84-.28-1.26-.42-.42-.14-.84-.28-1.26-.42-.84-.28-1.68-.56-2.52-.84-.42-.14-.84-.28-1.26-.42-.28-.09-.56-.18-.84-.27v-2.58c.28.09.56.18.84.27.42.14.84.28 1.26.42.84.28 1.68.56 2.52.84.42.14.84.28 1.26.42.42.14.84.28 1.26.42.21.07.42.14.63.21.21.07.42.14.63.21.07.023.14.046.21.07.07.023.14.046.21.07.14.046.28.09.42.14.14.046.28.09.42.14.28.09.56.18.84.27.28.09.56.18.84.27.56.18 1.12.36 1.68.54.56.18 1.12.36 1.68.54.28.09.56.18.84.27.28.09.56.18.84.27v2.58c-.28-.09-.56-.18-.84-.27-.28-.09-.56-.18-.84-.27-.56-.18-1.12-.36-1.68-.54-.56-.18-1.12-.36-1.68-.54-.28-.09-.56-.18-.84-.27-.28-.09-.56-.18-.84-.27-.14-.046-.28-.09-.42-.14-.14-.046-.28-.09-.42-.14zM12 5.5c-3.584 0-6.5 2.916-6.5 6.5s2.916 6.5 6.5 6.5 6.5-2.916 6.5-6.5-2.916-6.5-6.5-6.5zm0 11c-2.485 0-4.5-2.015-4.5-4.5s2.015-4.5 4.5-4.5 4.5 2.015 4.5 4.5-2.015 4.5-4.5 4.5z" />
                </svg>
              </a>
              <a href="#" className="btn btn-circle btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11 1-3.55-.18-6.71-1.88-8.82-4.47-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.27 0-.53-.03-.78-.08.53 1.64 2.06 2.83 3.88 2.87-1.42 1.11-3.21 1.77-5.15 1.77-.33 0-.66-.02-1-.06 1.84 1.18 4.02 1.87 6.37 1.87 7.65 0 11.84-6.33 11.84-11.84v-.54c.81-.59 1.51-1.33 2.06-2.18z" />
                </svg>
              </a>
              <a href="#" className="btn btn-circle btn-ghost">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1.14-1.39-2.07-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
