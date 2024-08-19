export const generateComponentCodeFlutter = (
  elements: FormElement[],
  submitBtn: string,
  getFormStyles?: FormStyle,
  getInputStyles?: FormStyle,
  getButtonStyles?: FormStyle
) => {
  let firstSelectedOption = "";
  let firstSelectedRadioOption = "";
  let checkboxLabels: string[] = [];

  const hexToColorFunction = `
Color hexToColor(String hexCode) {
  hexCode = hexCode.replaceAll('#', '');
  hexCode = 'FF\$hexCode';
  return Color(int.parse(hexCode, radix: 16));
}
`;

  const inputDecoration = `
    contentPadding: EdgeInsets.only(
      left: ${getInputStyles?.paddingX?.replace("px", ".0") || "8.0"},
      right: ${getInputStyles?.paddingX?.replace("px", ".0") || "8.0"},
      top: ${getInputStyles?.paddingY?.replace("px", ".0") || "8.0"},
      bottom: ${getInputStyles?.paddingY?.replace("px", ".0") || "8.0"},
    ),
    hintStyle: TextStyle(
      color: hexToColor('${getInputStyles?.backgroundColor || "#FFFFFF"}'),
      fontSize: 16.0,
    ),
    errorStyle: TextStyle(
      color: hexToColor('${getInputStyles?.backgroundColor || "#FFFFFF"}'),
      fontSize: 15.0
    ),
    fillColor: hexToColor('${getInputStyles?.backgroundColor || "#FFFFFF"}'),
    filled: true,
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${getInputStyles?.borderRadius?.replace("px", ".0") || "4.0"}),
      borderSide: BorderSide(
        color: hexToColor('${getInputStyles?.color || "#BDBDBD"}'),
        width: ${getInputStyles?.paddingY?.replace("px", "") || "1.0"},
      ),
    )
  `;

  const formPadding = `
    padding: EdgeInsets.only(
      left: ${getFormStyles?.paddingX?.replace("px", ".0") || "8.0"},
      right: ${getFormStyles?.paddingX?.replace("px", ".0") || "8.0"},
      top: ${getFormStyles?.paddingY?.replace("px", ".0") || "8.0"},
      bottom: ${getFormStyles?.paddingY?.replace("px", ".0") || "8.0"},
    )
  `;

  const buttonStyles = `
    padding: MaterialStateProperty.all<EdgeInsetsGeometry>(
      EdgeInsets.only(
        left: ${getButtonStyles?.paddingX?.replace("px", ".0") || "8.0"},
        right: ${getButtonStyles?.paddingX?.replace("px", ".0") || "8.0"},
        top: ${getButtonStyles?.paddingY?.replace("px", ".0") || "8.0"},
        bottom: ${getButtonStyles?.paddingY?.replace("px", ".0") || "8.0"},
      ),
    ),
    backgroundColor: MaterialStateProperty.all<Color>(
      hexToColor('${getButtonStyles?.backgroundColor || "#6200EE"}')
    ),
    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
      RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(${getButtonStyles?.borderRadius?.replace("px", ".0") || "4.0"}),
      ),
    ),
  `;

  const componentCode = elements
    .filter(
      (element) =>
        element.elementType.type !== "logo" &&
        element.elementType.type !== "headingTitle"
    )
    .map((input: any) => {
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
                errorMaxLines: 2
              ),
              keyboardType: ${
                input.elementType.type === "number"
                  ? "TextInputType.number"
                  : "TextInputType.text"
              },
              obscureText: ${input.elementType.type === "password"},
            ),
          )`;
          break;

        case "textarea":
          inputElement = `Padding(
            ${formPadding},
            child: TextFormField(
              decoration: InputDecoration(
                labelText: '${input.elementType.label}',
                hintText: '${input.elementType.placeholder}',
                ${inputDecoration},
                errorMaxLines: 2
              ),
              keyboardType:   TextInputType.multiline,
            
              maxLines: null,
            ),
          )`;
break;
        case "date":
          inputElement = `Padding(
            ${formPadding},
            child: TextFormField(
              decoration: InputDecoration(
                labelText: '${input.elementType.label}',
                hintText: '${input.elementType.placeholder}',
                ${inputDecoration},
                errorMaxLines: 2
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
            ))`;
          break;

        case "time":
          inputElement = `Padding(
            ${formPadding},
            child: TextFormField(
              decoration: InputDecoration(
                labelText: '${input.elementType.label}',
                hintText: '${input.elementType.placeholder}',
                ${inputDecoration},
                errorMaxLines: 2
              ),
            onTap: () async {
              FocusScope.of(context).requestFocus(FocusNode());
              TimeOfDay? picked = await showTimePicker(
                context: context,
                initialTime: TimeOfDay.now(),
              );
            },
            ))`;
          break;

        case "select":
          firstSelectedOption = input.elementType.options[0];
          inputElement = `DropdownButtonFormField<String>(
            decoration: InputDecoration(
              labelText: '${input.elementType.label}',
              hintText: '${input.elementType.placeholder}',
              ${inputDecoration},
              errorMaxLines: 2
            ),
            value: _selectedOption,
            items: <String>[${input.elementType.options
              .map((option: any) => `'${option}'`)
              .join(",")}]
              .map((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
            onChanged: (newValue) {
              setState(() {
                _selectedOption = newValue!;
                print(_selectedOption);
              });
            },
          )`;
          break;

        case "select_multiple":
          inputElement = `MultiSelectFormField(
            title: Text('${input.elementType.label}'),
            dataSource: [${input.elementType.options
              .map((option: any) => `{'display': '${option}', 'value': '${option}'}`)
              .join(", ")}],
            textField: 'display',
            valueField: 'value',
            onSaved: (value) {},
          )`;
          break;

        case "checkbox":
          checkboxLabels = input.elementType.options;
          inputElement = `Column(
            children: <Widget>[
              ${checkboxLabels.map((label: any, index: number) => `
                CheckboxListTile(
                  title: Text('${label}'),
                  value: _checkboxStates[${index}],
                  onChanged: (bool? value) {
                    setState(() {
                      _checkboxStates[${index}] = value ?? false;
                    });
                  },
                ),
              `).join("\n")}
            ],
          )`;
          break;

        case "radio":
          firstSelectedRadioOption = input.elementType.options[0];
          inputElement = input.elementType.options
            .map(
              (option: any) => `RadioListTile<String>(
                title: Text('${option}'),
                value: '${option}',
                groupValue: _radioValue,
                onChanged: (value) {
                  setState(() {
                    _radioValue = value!;
                    _selectedRadioOption = value!;
                    print(_selectedRadioOption);
                  });
                },
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

${hexToColorFunction}

class GeneratedForm extends StatefulWidget {
  @override
  _GeneratedFormState createState() => _GeneratedFormState();
}

class _GeneratedFormState extends State<GeneratedForm> {
  final _formKey = GlobalKey<FormState>();
  List<bool> _checkboxStates = [${checkboxLabels.map(() => `false`).join(", ")}];
  List<String> _checkboxLabels = [${checkboxLabels.map((label) => `'${label}'`).join(", ")}];
  String _selectedOption = "${firstSelectedOption}";
  String _radioValue = "value";
  String _selectedRadioOption = "${firstSelectedRadioOption}";

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
        ),
      ),
    );
  }
}
  `.trim();

  return exportCode;
};
