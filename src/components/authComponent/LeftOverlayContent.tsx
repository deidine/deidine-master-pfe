import { Button } from "antd";

const LeftOverlayContent = ({ isAnimated, setIsAnimated }: { isAnimated: boolean, setIsAnimated: Function }) => {
  return (
    <div className="p-8 text-center">
      <h1 className="text-4xl  font-title font-bold text-white mb-4">
      Vous avez déjà un compte ?
      </h1>
      <h5 className="text-lg  text-white">Connectez-vous avec votre adresse e-mail et votre mot de passe!</h5>
      <div className="mt-8 md:mt-16">
        <button 
          className="text-white bg-transparent border-white rounded-full p-2 px-4 border hover:bg-white hover:text-buttonColor transition ease-in-out"
          onClick={() => setIsAnimated(!isAnimated)}
        >
          Connexion
        </button>
      </div>
    </div>
  );
};

export default LeftOverlayContent;
