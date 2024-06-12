import React from "react";

function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="p-52 m-3 shadow-[0 4px 8px 0 rgba(0,0,0,0.2)] border border-red flex justify-center items-center">
      {children}
    </div>
  );
}

export default Card;
