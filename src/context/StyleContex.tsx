"use client";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

type StyleContextType = {
  formStyle?: FormStyle;
  setFormStyle: Dispatch<SetStateAction<FormStyle>>;

  elementStyle?: FormStyle;
  setElementStyle: Dispatch<SetStateAction<FormStyle>>;
  buttonStyle?: FormStyle;
  setButtonStyle: Dispatch<SetStateAction<FormStyle>>;
};

export const StyleContext = createContext<StyleContextType | null>(null);

export default function StyleContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [formStyle, setFormStyle] = useState<FormStyle>({});
  const [elementStyle, setElementStyle] = useState<FormStyle>({});
  const [buttonStyle, setButtonStyle] = useState<FormStyle>({});
  return (
    <StyleContext.Provider
      value={{
        formStyle,
        setFormStyle, 
        elementStyle,
        setElementStyle,
        buttonStyle,
        setButtonStyle,
      }}
    >
      {children}
    </StyleContext.Provider>
  );
}
