import React from "react";
import { Form, Input, TimePicker } from "antd";

export default function DatePrev({
  element,
  isTime,
    styleForm,
}: {
  element: FormElement;
  isTime?: boolean;
    styleForm?: FormStyle;
}) {
  const getLabelStyles = () => {
    return {
     
      color: styleForm?.color, 
         fontSize:  '16px', 
      fontWeight: 'bold',
      fontFamily: 'sans-serif',
      fontStyle: 'bold',
 
    };
  };

 
  const getInputStyles = () => {
    return {
      paddingLeft: styleForm?.paddingX  || '8px',
      paddingRight: styleForm?.paddingX  || '8px',
      paddingTop: styleForm?.paddingY  || '8px',
      paddingBottom: styleForm?.paddingY || '8px',
      color: styleForm?.color, 
      border: styleForm?.border ,
      borderRadius: styleForm?.borderRadius ,
      backgroundColor: styleForm?.backgroundColor,width: "100%"
    };
  };
   return (
    <div>
      {!isTime ? (
        <Form.Item
        label={<span  style={getLabelStyles()} >{element.elementType.label}</span>}
        labelCol={{ span: 24 }} // Adjust label width, or remove for default
                 name={element.elementType.name}
          style={{
            marginBottom:  '10px',
           
          }}
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
              style={getInputStyles()}
 
            type={
              element.elementType.type === "datetime-local"
                ? "datetime-local"
                : "date"
            }
            placeholder={element.elementType.placeholder}
            min={element.elementType.startDate!}
            max={element.elementType.endDate!}
          />
        </Form.Item>
      ) : (
        <Form.Item
        label={<span  style={getLabelStyles()} >{element.elementType.label}</span>}
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
            style={getInputStyles()}
 
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
