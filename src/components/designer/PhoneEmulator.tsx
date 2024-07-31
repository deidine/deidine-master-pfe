import React from "react";
import { DeviceFrameset, DeviceFramesetProps } from "react-device-frameset";

import 'react-device-frameset/styles/marvel-devices.min.css';
import 'react-device-frameset/styles/device-selector.min.css';

type DeviceName = "iPhone X" | "iPhone 8" | "iPhone 8 Plus" | "iPhone 5s" | "iPhone 5c" | "iPhone 4s" | "Galaxy Note 8" | "Nexus 5" | "Lumia 920" | "Samsung Galaxy S5" | "HTC One" | "iPad Mini" | "MacBook Pro";

type DeviceEmulatorProps = {
  banDevices?: DeviceName[];
  children: (props: DeviceFramesetProps) => React.ReactNode;
  value?: DeviceFramesetProps;
  onChange?: (deviceConfig: DeviceFramesetProps) => void;
};

const PhoneEmulator = ({ value, onChange, banDevices = [], children }: DeviceEmulatorProps) => {
  return (
    <div className="flex justify-center items-center py-10">
      <DeviceFrameset device="iPhone 8" color="gold" landscape>
        {children(value!)}
      </DeviceFrameset>
    </div>
  );
};

export default PhoneEmulator;