import JSONFormatter from "@/components/JSONFormatter";
import React, { FC } from "react";

interface pageProps {}

const page: FC<pageProps> = ({}) => {
  return (
    <div className="">
      <JSONFormatter />
    </div>
  );
};

export default page;
