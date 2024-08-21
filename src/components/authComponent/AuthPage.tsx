"use client";
import { useState } from "react";
import SigninForm from "./SigninForm";
import SignupForm from "./SignupForm";
import LeftOverlayContent from "./LeftOverlayContent";

import RightOverlayContent from "./RightOverlayContent";

const AuthPage = () => {
  const [isAnimated, setIsAnimated] = useState(false);
  const overlayBg = "bg-buttonColor ";

  return (
    
      <div className="h-full w-full bg-white relative overflow-hidden rounded-lg shadow-lg">
        <div
          id="signin"
          className={`absolute top-0 left-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out ${
            isAnimated ? "translate-x-full opacity-0 z-0" : "z-20"
          }`}
        >
          <SigninForm />
        </div>

        <div
          id="signup"
          className={`absolute top-0 left-0 h-full w-1/2 flex justify-center items-center transition-all duration-700 ease-in-out ${
            isAnimated ? "translate-x-full opacity-100 z-20" : "opacity-0 z-0"
          }`}
        >
          <SignupForm />
        </div>

        <div
          id="overlay-container"
          className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-transform duration-700 ease-in-out z-30 ${
            isAnimated ? "-translate-x-full" : ""
          }`}
        >
          <div
            id="overlay"
            className={`${overlayBg} relative -left-full h-full w-[200%] transform transition-transform duration-700 ease-in-out ${
              isAnimated ? "translate-x-1/2" : "translate-x-0"
            }`}
          >
            <div
              id="overlay-left"
              className={`w-1/2 h-full absolute flex justify-center items-center top-0 transform transition-transform duration-700 ease-in-out ${
                isAnimated ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <LeftOverlayContent isAnimated={isAnimated} setIsAnimated={setIsAnimated} />
            </div>
            <div
              id="overlay-right"
              className={`w-1/2 h-full absolute flex justify-center items-center top-0 right-0 transform transition-transform duration-700 ease-in-out ${
                isAnimated ? "translate-x-[20%]" : "translate-x-0"
              }`}
            >
              <RightOverlayContent isAnimated={isAnimated} setIsAnimated={setIsAnimated} />
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default AuthPage;
