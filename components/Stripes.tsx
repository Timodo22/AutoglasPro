import React from 'react';

interface StripesProps {
  className?: string;
  vertical?: boolean;
}

export const Stripes: React.FC<StripesProps> = ({ className = "", vertical = false }) => {
  if (vertical) {
    return (
      <div className={`flex flex-row h-full w-4 ${className}`}>
        <div className="w-1/3 bg-agp-red h-full"></div>
        <div className="w-1/3 bg-agp-white h-full"></div>
        <div className="w-1/3 bg-agp-blue h-full"></div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col w-full h-3 ${className}`}>
      <div className="h-1/3 w-full bg-agp-red"></div>
      <div className="h-1/3 w-full bg-agp-white"></div>
      <div className="h-1/3 w-full bg-agp-blue"></div>
    </div>
  );
};

export const AngledStripes: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`flex transform -skew-x-12 ${className}`}>
      <div className="w-4 h-full bg-agp-red mx-1"></div>
      <div className="w-4 h-full bg-white mx-1"></div>
      <div className="w-4 h-full bg-agp-blue mx-1"></div>
    </div>
  );
};