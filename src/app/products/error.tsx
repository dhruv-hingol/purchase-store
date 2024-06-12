"use client";

import React from "react";

function error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div>
      {error?.message}{" "}
      <button className="p-2 text-white bg-black border" onClick={reset}>
        retry
      </button>
    </div>
  );
}

export default error;
