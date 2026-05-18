import React from "react";

export const TinaCMSProvider = ({ children }: { children: React.ReactNode }) => {
  // In production with a valid token, you would wrap this with:
  // import { TinaProvider } from "tinacms";
  // import client from "../../tina/__generated__/client";
  // <TinaProvider client={client}>{children}</TinaProvider>
  
  return (
    <>
      {children}
    </>
  );
};
