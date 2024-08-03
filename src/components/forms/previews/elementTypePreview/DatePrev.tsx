import React from "react";
import { Form, Input, TimePicker } from "antd";

export default function DatePrev({
  element,
  isTime,
}: {
  element: FormElement;
  isTime?: boolean;
}) {
  return (
    <div>
      {!isTime ? (
        <Form.Item
          label={element.elementType.label}
          name={element.elementType.name}
          style={{ marginBottom: "10px" }}
          rules={[
            {
              required: element.elementType.required,
              message: `${element.elementType.label} is required`,
            },
            {
              type: "date",
              message: `Please enter a valid date and time for ${element.elementType.label}`,
            },
          ]}
        >
          <Input
            style={{ padding: "8px" }}
            type={
              element.elementType.type === "datetime-local"
                ? "datetime-local"
                : "date"
            }
            placeholder={element.elementType.placeholder}
            min={element.elementType.startDate}
            max={element.elementType.endDate}
          />
        </Form.Item>
      ) : (
        <Form.Item
          label={element.elementType.label}
          name={element.elementType.name}
          style={{ marginBottom: "10px" }}
          rules={[
            {
              required: element.elementType.required,
              message: `${element.elementType.label} is required`,
            },
            {
              pattern: new RegExp("^(?:[01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$"),
              message: `Please enter a valid time (HH:mm:ss) for ${element.elementType.label}`,
            },
          ]}
        >
          <TimePicker
            placeholder={element.elementType.placeholder}
            style={{ width: "100%" }}
            format="HH:mm:ss"
            showHour
            showMinute
            showSecond
          />
        </Form.Item>
      )}
    </div>
  );
}
{
  /* {element.elementType.type === "date" && (
              <Form.Item
                label={element.elementType.label}
                name={element.elementType.name}
                style={{ marginBottom: "10px" }}
                rules={[
                  {
                    required: element.elementType.required,
                    message: `${element.elementType.label} is required`,
                  },
                  {
                    validator: (_, value) =>
                      value && moment(value).isBetween(element.elementType.startDate, element.elementType.endDate)
                        ? Promise.resolve()
                        : Promise.reject(
                            new Error(
                              "Date must be between"+element.elementType.startDate+" and "+element.elementType.endDate
                            )
                          ),
                  },
                ]}
              > 
                <DatePicker
                  placeholder={element.elementType.placeholder}
                  style={{ width: "100%" }}
                  format="YYYY-MM-DD HH:mm"
                  readOnly
                  disabledDate={(current) =>
                    current &&
                    (current < moment(element.elementType.startDate) ||
                      current > moment(element.elementType.endDate))
                  }
                />
              </Form.Item>
            )} */
}
