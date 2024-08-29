import { Button, Checkbox } from "antd";
import React, { useState } from "react";

export default function RequiredComponent({
  toggleRequired,
  required,
  isSwitchButton,
}: {
  required: boolean;
  isSwitchButton: boolean;
  toggleRequired: (required: boolean) => void;
}) {
  const [isRequired, setIsRequired] = useState(required);

  return (
    <>
      {isSwitchButton ? (
        <div
        onClick={(e) => {
          e.stopPropagation();
          toggleRequired(isRequired!);
          setIsRequired(!isRequired);
        }}
        className="flex flex-col items-start gap-2 cursor-pointer justify-between hover:bg-zinc-100 rounded-lg px-1 py-1">
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleRequired(isRequired!);
              setIsRequired(!isRequired);
            }}
            type="button"
            role="switch"
            aria-checked={isRequired}
            data-state={isRequired ? "checked" : "unchecked"}
            value="on"
            className="peer inline-flex shrink-0 cursor-pointer items-center 
            rounded-full border-2 border-transparent transition-colors focus-visible:outline-none 
            focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2
             focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50
              data-[state=checked]:bg-buttonColor
               data-[state=unchecked]:bg-zinc-200 dark:focus-visible:ring-zinc-300
                dark:focus-visible:ring-offset-zinc-950 dark:data-[state=checked]:bg-buttonColor
                 dark:data-[state=unchecked]:bg-white h-5 w-10"
            id="required"
          >
            <span
              data-state={isRequired ? "checked" : "unchecked"}
              className="pointer-events-none block rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 dark:bg-zinc-950 h-4 w-4"
            ></span>
          </button>
        </div>
      ) : (
        <Button
          size="small"
          onClick={(e) => {
          e.stopPropagation();

            toggleRequired(isRequired!);
            setIsRequired(!isRequired);
          }}
          className=" w-1/2 hover:bg-zinc-100 rounded-lg px-1 py-1"
        >
          <Checkbox
            checked={isRequired}
            onClick={(e) => {
          e.stopPropagation();

              toggleRequired(isRequired!);
              setIsRequired(!isRequired);
            }}
          >
          
          </Checkbox>
        </Button>
      )}
    </>
  );
}


 