import {   DatePicker } from "antd";
import moment from "moment";
import {  useState } from "react";
import { LabelValue } from "./LabelValue";

export  function DateChoicePeriodInput({ element }: { element: any }) { 
    const [dates, setDates] = useState<{ [key: string]: string }>({
      start: "",
      end: "",
      current: "",
    });
  
   
    const handleDateChange = (
      date: moment.Moment | null,
      dateString: string,
      key: string
    ) => {
      setDates({ ...dates, [key]: dateString });
      updateElementPattern(key, dateString);
    };
  
    const updateElementPattern = (key: string, dateString: string) => {
      if (key === "start") {
        element.startDate = `${dateString}`;
      } else if (key === "end") {
        element.endDate = `${dateString}`;
      }  
    };
  
    return (
      <div>
          <LabelValue value="Minimum Date" />
   
            <DatePicker
              placeholder="Select min date"
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              onChange={(date: moment.Moment, dateString: any) =>
                handleDateChange(date, dateString, "start")
              }
            />
          <LabelValue value="Maximum Date" />
         
            <DatePicker
              placeholder="Select max date"
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              onChange={(date: moment.Moment, dateString: any) =>
                handleDateChange(date, dateString, "end")
              }
            /> 
      </div>
    );
  }
  