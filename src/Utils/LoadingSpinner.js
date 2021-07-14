import React from "react";
import Loader from "react-loader-spinner";

export const LoadingSpinner = (props) => {
  return <Loader type="TailSpin" color={props.color} height={80} width={80} />;
};
