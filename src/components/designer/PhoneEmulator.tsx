"use client";
import React from "react";
import { DeviceFrameset, DeviceFramesetProps, DeviceSelector } from "react-device-frameset";
import 'react-device-frameset/styles/marvel-devices.min.css';
import 'react-device-frameset/styles/device-selector.min.css';

type DeviceName = "iPhone X" | "iPhone 8" | "iPhone 8 Plus" | "iPhone 5s" | "iPhone 5c" | "iPhone 4s" | "Galaxy Note 8" | "Nexus 5" | "Lumia 920" | "Samsung Galaxy S5" | "HTC One" | "iPad Mini" | "MacBook Pro";
type colorDevice = "black" | "blue" | "gold" | "silver" | "red" | "white" | "yellow";

type DeviceEmulatorProps = {
  banDevices?: DeviceName[];
  children: (props: DeviceFramesetProps) => React.ReactNode;
  value?: DeviceFramesetProps;
  onChange?: (deviceConfig: DeviceFramesetProps) => void;
  color: colorDevice;
};

const PhoneEmulator = ({ value, onChange, banDevices, children, color }: DeviceEmulatorProps) => {
  return (
    <div className="flex flex-row justify-center items-center py-10">
      <DeviceSelector  banDevices={banDevices} value={value?.device} onChange={onChange}>
        {(props:DeviceFramesetProps) => (
          <DeviceFrameset  {...props}  color={color}>
            {children(props)}
          </DeviceFrameset>
        )}
      </DeviceSelector>
    </div>
  );
};

export default PhoneEmulator;



// import React from "react";
// import { DeviceFrameset, DeviceFramesetProps } from "react-device-frameset";

// import 'react-device-frameset/styles/marvel-devices.min.css';
// import 'react-device-frameset/styles/device-selector.min.css';

// type DeviceName = "iPhone X" | "iPhone 8" | "iPhone 8 Plus" | "iPhone 5s" | "iPhone 5c" | "iPhone 4s" | "Galaxy Note 8" | "Nexus 5" | "Lumia 920" | "Samsung Galaxy S5" | "HTC One" | "iPad Mini" | "MacBook Pro";
// type colorDevice="black"|"blue"| "gold"|"silver" |"red"|"white"| "yellow"
// type DeviceEmulatorProps = {
//   banDevices : DeviceName ;
//   children: (props: DeviceFramesetProps) => React.ReactNode;
//   value?: DeviceFramesetProps;
//   onChange?: (deviceConfig: DeviceFramesetProps) => void;
//   color : colorDevice;
// };

// const PhoneEmulator = ({ value, onChange, banDevices  , children,color }: DeviceEmulatorProps) => {
//   return (
//     <div className="flex justify-center items-center py-10">
//       <DeviceFrameset device={banDevices } color={color}>
//         {children(value!)}
//       </DeviceFrameset>
//     </div>
//   );
// };

// export default PhoneEmulator;