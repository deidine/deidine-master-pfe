import { Button, Checkbox, DatePicker, Form, Input } from "antd";
import moment from "moment";
import {  useState } from "react";

export  function DateChoicePeriodInput({ element }: { element: any }) {
    const [selectedPeriods, setSelectedPeriods] = useState<string[]>([]);
    const [dates, setDates] = useState<{ [key: string]: string }>({
      start: "",
      end: "",
      current: "",
    });
  
    const handlePeriodChange = (checkedValues: string[]) => {
      setSelectedPeriods(checkedValues);
    };
  
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
      } else if (key === "current") {
        // element.pattern = `${dateString}`;
      }
    };
  
    return (
      <div>
        {element.pattern }
        <div className="flex flex-col space-y-2">
          <Checkbox.Group onChange={handlePeriodChange}>
            <Checkbox value="start">Start</Checkbox>
            <Checkbox value="end">End</Checkbox>
            <Checkbox value="current">Current</Checkbox>
          </Checkbox.Group>
        </div>
  
        {selectedPeriods.includes("start") && (
          <Form.Item
            label="Start Date"
            name="startDate"
            style={{ marginTop: "10px" }}
            rules={[
              {
                required: true,
                message: "Start date is required",
              },
            ]}
          >
            <DatePicker
              placeholder="Select start date"
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              onChange={(date: moment.Moment, dateString: any) =>
                handleDateChange(date, dateString, "start")
              }
            />
          </Form.Item>
        )}
  
        {selectedPeriods.includes("end") && (
          <Form.Item
            label="End Date"
            name="endDate"
            style={{ marginTop: "10px" }}
            rules={[
              {
                required: true,
                message: "End date is required",
              },
            ]}
          >
            <DatePicker
              placeholder="Select end date"
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              onChange={(date: moment.Moment, dateString: any) =>
                handleDateChange(date, dateString, "end")
              }
            />
          </Form.Item>
        )}
  
        {selectedPeriods.includes("current") && (
          <Form.Item
            label="Current Date"
            name="currentDate"
            style={{ marginTop: "10px" }}
            rules={[
              {
                required: true,
                message: "Current date is required",
              },
            ]}
          >
            <DatePicker
              placeholder="Select current date"
              style={{ width: "100%" }}
              format="YYYY-MM-DD"
              onChange={(date: moment.Moment, dateString: any) =>
                handleDateChange(date, dateString, "current")
              }
            />
          </Form.Item>
        )}
      </div>
    );
  }
  