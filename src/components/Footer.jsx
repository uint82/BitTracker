import React from "react";

const Footer = () => {
  return (
    <div className="text-white text-center py-4 border-t border-gray-600">
      <p className="text-sm">
        {new Date().getFullYear()} Hilmi Abroor All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
