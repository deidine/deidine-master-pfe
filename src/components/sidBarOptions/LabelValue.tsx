export const LabelValue = ({ value }: { value: string }) => {
  return (
    <div className="my-2">
      {" "}
      <label className="text-xl   leading-none    peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal flex-1 text-zinc-600">
        {value}: {"   "}
      </label>
    </div>
  );
};
export const LabelValue2 = ({ value }: { value: string }) => {
  return (
    <div className="my-2">
      {" "}
      <label className="text-xl   leading-none    peer-disabled:cursor-not-allowed peer-disabled:opacity-70 font-normal flex-1 text-zinc-600">
        {value}  {"   "}
      </label>
    </div>
  );
};
