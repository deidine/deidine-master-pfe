export const generateComponentCodeFlutter = (elements:FormElement[],submitBtn:string) => {
 
    const componentCode = elements.map((input:any, index) => {
      let inputElement = "";

      switch (input.elementType.type) {
        case "text":
        case "number":
        case "email":
        case "password":
          inputElement = `TextFormField(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              hintText: '${input.elementType.placeholder}',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            keyboardType: ${input.elementType.type === 'number' ? 'TextInputType.number' : 'TextInputType.text'},
            obscureText: ${input.elementType.type === 'password'},
          )`;
          break;
        case "textarea":
          inputElement = `TextFormField(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              hintText: '${input.elementType.placeholder}',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            maxLines: null,
          )`;
          break;
        case "date":
          inputElement = `DatePickerFormField(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          )`;
          break;
        case "time":
          inputElement = `TimePickerFormField(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          )`;
          break;
        case "select":
          inputElement = `DropdownButtonFormField<String>(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            items: ${input.elementType.options.map(
              (option:any) => `DropdownMenuItem<String>(
              value: '${option}',
              child: Text('${option}'),
            )`
            ).join(', ')},
          )`;
          break;
        case "select_multiple":
          inputElement = `MultiSelectFormField(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              border: OutlineInputBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
            items: ${input.elementType.options.map(
              (option:any) => `MultiSelectItem('${option}', '${option}')`
            ).join(', ')},
          )`;
          break;
        case "checkbox":
          inputElement = input.elementType.options.map((option:any, idx:number) => `
            CheckboxListTile(
              title: Text('${option}'),
              value: false,
              onChanged: (bool value) {},
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          `).join('\n');
          break;
        case "radio":
          inputElement = input.elementType.options.map((option:any, idx:number) => `
            RadioListTile(
              title: Text('${option}'),
              value: '${option}',
              groupValue: null,
              onChanged: (value) {},
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.circular(10),
              ),
            ),
          `).join('\n');
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
                ${inputElement}
                state.hasError ? Text(
                  state.errorText,
                  style: TextStyle(
                    color: Colors.red,
                  ),
                ) : Container(),
              ],
            );
          },
          validator: (value) {
            if (value == null || value.isEmpty) {
              return '${input.elementType.label} is required';
            }
            return null;
          },
        ),
      `;
    }).join('\n');

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
                borderRadius: BorderRadius.circular(10),
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

 