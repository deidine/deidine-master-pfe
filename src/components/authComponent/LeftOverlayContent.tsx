import { Button } from "antd";

const LeftOverlayContent = ({ isAnimated, setIsAnimated }: { isAnimated: boolean, setIsAnimated: Function }) => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Already have an account ?
      </h1>
      <h5 className="text-lg md:text-xl text-white">Sign in with your email & password</h5>
      <div className="mt-8 md:mt-16">
        <Button
          type="primary"
          shape="round"
          size="large"
          className="text-white bg-transparent border-white hover:bg-white hover:text-blue-800 transition ease-in-out"
          onClick={() => setIsAnimated(!isAnimated)}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
