export const generateComponentCodeFlutter = (
  elements: FormElement[],
  submitBtn: string,
  getFormStyles?: FormStyle,
  getInputStyles?: FormStyle,
  getButtonStyles?: FormStyle
) => {
  const hexToColorFunction = `
Color hexToColor(String hexCode) {
  hexCode = hexCode.replaceAll('#', '');
  hexCode = 'FF\$hexCode';
  return Color(int.parse(hexCode, radix: 16));
}
`;

  const inputDecoration = `
    contentPadding: EdgeInsets.only(
      left: ${getInputStyles?.paddingX?.replace("px",".0") || '8.0'},
      right: ${getInputStyles?.paddingX?.replace("px",".0") || '8.0'},
      top: ${getInputStyles?.paddingY?.replace("px",".0") || '8.0'},
      bottom: ${getInputStyles?.paddingY?.replace("px",".0") || '8.0'},
    ),
    fillColor: hexToColor('${getInputStyles?.backgroundColor || '#FFFFFF'}'),
    filled: true,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${getInputStyles?.borderRadius?.replace("px",".0")  || '4.0'}),
      borderSide: BorderSide(
        color: hexToColor('${getInputStyles?.color || '#BDBDBD'}'),
        width: ${getInputStyles?.paddingY?.replace("px","") || '1.0'},
      ),
    ) 
  `;

  const formPadding = `
    padding: EdgeInsets.only(
      left: ${getFormStyles?.paddingX?.replace("px",".0") || '8.0'},
      right: ${getFormStyles?.paddingX?.replace("px",".0") || '8.0'},
      top: ${getFormStyles?.paddingY?.replace("px",".0") || '8.0'},
      bottom: ${getFormStyles?.paddingY?.replace("px",".0") || '8.0'},
    ) 
  `;

  const buttonStyles = `
    padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
     EdgeInsets.only(
      left: ${getButtonStyles?.paddingX?.replace("px",".0") || '8.0'},
      right: ${getButtonStyles?.paddinX?.replace("px",".0") || '8.0'},
      top: ${getButtonStyles?.paddingY?.replace("px",".0") || '8.0'},
      bottom: ${getButtonStyles?.paddingY?.replace("px",".0") || '8.0'},
    ),),
    backgroundColor: MaterialStateProperty.all<Color>(
      hexToColor('${getButtonStyles?.backgroundColor || '#6200EE'}')
    ),
     shape: MaterialStateProperty.all<RoundedRectangleBorder>(
      RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(${getButtonStyles?.borderRadius?.replace("px",".0")  || '4.0'}),
)),
  `;

  const componentCode = elements.filter((element) => element.elementType.type !== "logo" &&
  element.elementType.type !== "headingTitle").map((input: any) => {
    let inputElement = "";

    switch (input.elementType.type) {
      case "password":
      case "email":
      case "number":
      case "url":
      case "text":
        inputElement = `Padding(
          ${formPadding},
          child: TextFormField(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              hintText: '${input.elementType.placeholder}',
              ${inputDecoration},
            ),
            keyboardType: ${input.elementType.type === "number" ? "TextInputType.number" : "TextInputType.text"},
            obscureText: ${input.elementType.type === "password"},
          ),
        )`;
        break;

      // Handle other input types (textarea, date, time, etc.)

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
  }).join("\n");

  const exportCode = `
import 'package:flutter/material.dart';

${hexToColorFunction}

class GeneratedForm extends StatelessWidget {
final _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.symmetric(horizontal: 10),
          child: Form(
      key: _formKey,
      child: Padding(
        ${formPadding},
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
              style: ButtonStyle(
                ${buttonStyles}
              ),
            ),
          ],
        ),
      ),
)));
  }
}
  `.trim();

  return exportCode;
};
