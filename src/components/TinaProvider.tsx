import React from "react";

export const TinaCMSProvider = ({ children }: { children: React.ReactNode }) => {
  // Once Tina build is successful with a valid token, 
  // you can wrap this with the actual TinaProvider
  return (
    <>
      {children}
    </>
  );
};
