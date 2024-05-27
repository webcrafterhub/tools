import JSONFormatter from "@/components/tools/json-formatter/JSONFormatter";
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
