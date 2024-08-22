import { Button } from "antd";

const LeftOverlayContent = ({ isAnimated, setIsAnimated }: { isAnimated: boolean, setIsAnimated: Function }) => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Don  t have an account?
      </h1>
      <h5 className="text-lg md:text-xl text-white">Start your journey in one click</h5>
      <div className="mt-8 md:mt-16">
      
        <button 
          className="text-white bg-transparent border-white rounded-full p-2 px-4 border hover:bg-white hover:text-blue-800 transition ease-in-out"
          onClick={() => setIsAnimated(!isAnimated)}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
