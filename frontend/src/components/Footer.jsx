import React from "react";

const Footer = () => {
  return (
    <>
      <footer className="mt-8 w-full bg-black px-8 md:px-[300px] flex justify-between text-sm md:text-md py-8">
        <div className="flex flex-col text-white">
          <p>Featured Blogs</p>
          <p>Most Viewed</p>
        </div>

        <div className="flex flex-col text-white">
          <p>Forum</p>
          <p>Support</p>
          <p>Recent Posts</p>
        </div>

        <div className="flex flex-col text-white">
          <p>Privacy Policy</p>
          <p>About Us</p>
          <p>Terms and Conditions</p>
          <p>Terms of Service</p>
        </div>
      </footer>
      <p className="bg-black pb-6 py-2 text-white text-center text-sm">
        All rights reserved @Blog It 2024
      </p>
    </>
  );
};

export default Footer;
