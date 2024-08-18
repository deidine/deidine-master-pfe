export const generateComponentCodeFlutter = (
  elements: FormElement[],
  submitBtn: string
) => {
  const componentCode = elements.filter((element) => element.elementType.type !== "logo" &&
  element.elementType.type !== "headingTitle").map((input: any) => {
      let inputElement = "";

      switch (input.elementType.type) {
        case "password":
        case "email":
        case "number":
          case "url":
        case "text":
          inputElement = `TextFormField(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              hintText: '${input.elementType.placeholder}',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(4), 
              ),
            ),
            keyboardType: ${
              input.elementType.type === "number"
                ? "TextInputType.number"
                : "TextInputType.text"
            },
            obscureText: ${input.elementType.type === "password"},
          )`;
          break;

        case "textarea":
          inputElement = `TextFormField(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              hintText: '${input.elementType.placeholder}',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(4),
              ),
            ),
            maxLines: null,
          )`;
          break;

        case "date":
          inputElement = `TextFormField(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(4),
              ),
            ),
            onTap: () async {
              FocusScope.of(context).requestFocus(FocusNode());
              DateTime? picked = await showDatePicker(
                context: context,
                initialDate: DateTime.now(),
                firstDate: DateTime(2000),
                lastDate: DateTime(2100),
              );
            },
          )`;
          break;

        case "time":
          inputElement = `TextFormField(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(4),
              ),
            ),
            onTap: () async {
              FocusScope.of(context).requestFocus(FocusNode());
              TimeOfDay? picked = await showTimePicker(
                context: context,
                initialTime: TimeOfDay.now(),
              );
            },
          )`;
          break;

        case "select":
          inputElement = `DropdownButtonFormField<String>(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(4),
              ),
            ),
            items: ${input.elementType.options
              .map(
                (option: any) => `DropdownMenuItem<String>(
              value: '${option}',
              child: Text('${option}'),
            )`
              )
              .join(", ")},
            onChanged: (value) {},
          )`;
          break;

        case "select_multiple":
          inputElement = `MultiSelectFormField(
            title: Text('${input.elementType.label}'),
            dataSource: [${input.elementType.options
              .map(
                (option: any) =>
                  `{'display': '${option}', 'value': '${option}'}`
              )
              .join(", ")}],
            textField: 'display',
            valueField: 'value',
            onSaved: (value) {},
          )`;
          break;

        case "checkbox":
          inputElement = input.elementType.options
            .map(
              (option: any) => `CheckboxListTile(
            title: Text('${option}'),
            value: false,
            onChanged: (bool? value) {},
          )`
            )
            .join("\n");
          break;

        case "radio":
          inputElement = input.elementType.options
            .map(
              (option: any) => `RadioListTile<String>(
            title: Text('${option}'),
            value: '${option}',
            groupValue: null,
            onChanged: (value) {},
          )`
            )
            .join("\n");
          break;

        default:
          break;
      }

      return `
      FormField(
        builder: (FormFieldState state) {
          return Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              ${inputElement},
              state.hasError
                  ? Text(
                      state.errorText ?? '',
                      style: TextStyle(
                        color: Colors.red,
                      ),
                    )
                  : SizedBox.shrink(),
            ],
          );
        },
        validator: (value) {
          if (value == null || (value is String && value.isEmpty)) {
            return '${input.elementType.label} is required';
          }
          return null;
        },
      ),`;
    })
    .join("\n");

  const exportCode = `
import 'package:flutter/material.dart';

class GeneratedForm extends StatelessWidget {
final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: <Widget>[
          ${componentCode}
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                // Form is valid, process data
              }
            },
            child: Text('${submitBtn}'),
            style: ElevatedButton.styleFrom(
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(4), 
              ),
            ),
          ),
        ],
      ),
    );
  }
}
  `.trim();

  return exportCode;
};
