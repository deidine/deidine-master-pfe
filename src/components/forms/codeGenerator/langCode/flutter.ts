export const generateComponentCodeFlutter = (
  elements: FormElement[],
  submitBtn: string,
  getFormStyles?: FormStyle,
  getInputStyles?: FormStyle,
  getButtonStyles?: FormStyle
) => {
  let firstSelectedOption:string[] =[];
  let firstSelectedRadioOption :string[] =[];
  let firstSelectedChecboxOption  :string[] =[];
  let checkboxLabels: string[] = [];
  let selectCount = 0;
  let radioCount = 0;
  let checkboxCount = 0;
  let dateCount=0;
  let timeCount=0;
  let dateControllers: string[] = [];
  let timeControllers: string[] = [];
  let dateState: string[] = [];
  let timeState: string[] = [];
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
  borderRadius: BorderRadius.circular(${getInputStyles?.borderRadius?.replace("px", ".0") || "4.0"
    }),
  borderSide: BorderSide(
    color: hexToColor('${getInputStyles?.color || "#BDBDBD"}'),
    width: ${getInputStyles?.paddingY?.replace("px", "") || "1.0"},
  ),
)
`;
  const checkBoxDecoration = `
 
  tileColor: hexToColor('${getInputStyles?.backgroundColor || "#FFFFFF"}'),
  activeColor: hexToColor('${getInputStyles?.color || "#FFFFFF"}'),
 controlAffinity: ListTileControlAffinity.leading,
  
 shape:  RoundedRectangleBorder(
  borderRadius: BorderRadius.circular( ${getInputStyles?.borderRadius?.replace("px", ".0") || "13.0"
    } ) ,
 
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
  const inputPadding = `
padding: EdgeInsets.only(
  left: ${getInputStyles?.paddingX?.replace("px", ".0") || "8.0"},
  right: ${getInputStyles?.paddingX?.replace("px", ".0") || "8.0"},
  top: ${getInputStyles?.paddingY?.replace("px", ".0") || "8.0"},
  bottom: ${getInputStyles?.paddingY?.replace("px", ".0") || "8.0"},
)
`;
  const buttonPadding = `
  EdgeInsets.only(
  left: ${getInputStyles?.paddingX?.replace("px", ".0") || "8.0"},
  right: ${getInputStyles?.paddingX?.replace("px", ".0") || "8.0"},
  top: ${getInputStyles?.paddingY?.replace("px", ".0") || "8.0"},
  bottom: ${getInputStyles?.paddingY?.replace("px", ".0") || "8.0"},
)
`;

  const checkboxPadding = `
                padding: EdgeInsets.symmetric(horizontal:${getInputStyles?.paddingX?.replace("px", ".0") || "26.0"
    },
  vertical:${getInputStyles?.paddingY?.replace("px", ".0") || " 7.0"} )
 

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
        borderRadius: BorderRadius.circular(${getButtonStyles?.borderRadius?.replace("px", ".0") || "4.0"
    }),
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
      let selectState = "";
      let checkboxState = "";
      let radioState = "";

      switch (input.elementType.type) {
        case "password":
        case "email":
        case "number":
        case "url":
        case "text":
          inputElement = `Padding(
            ${inputPadding},
            child: TextFormField(
              decoration: InputDecoration(
                labelText: '${input.elementType.label}',
                hintText: '${input.elementType.placeholder}',
                ${inputDecoration},
                errorMaxLines: 2
              ),
              keyboardType: ${input.elementType.type === "number"
              ? "TextInputType.number"
              : "TextInputType.text"
            },
              obscureText: ${input.elementType.type === "password"},
            ),
          )`;
          break;

        case "textarea":
          inputElement = `Padding(
            ${inputPadding},
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
            const dateControllerVar = `_dateController${dateCount}`;
            const dateStateVar = `_selectedDate${dateCount}`;
            dateControllers.push(
              `final TextEditingController ${dateControllerVar} = TextEditingController();`
            );
            dateState.push(`DateTime? ${dateStateVar};`);
            inputElement = `Padding(
              ${inputPadding},
              child: TextFormField(
                controller: ${dateControllerVar},
                decoration: InputDecoration(
                  labelText: '${input.elementType.label}',
                  hintText: ${dateStateVar} != null ? ${dateStateVar}!.toLocal().toString().split(' ')[0] : '${input.elementType.placeholder}',
                  ${inputDecoration},
                  errorMaxLines: 2,
                ),
                onTap: () async {
                  FocusScope.of(context).requestFocus(FocusNode());
                  DateTime? picked = await showDatePicker(
                    context: context,
                    initialDate: DateTime.now(),
                    firstDate: DateTime(2000),
                    lastDate: DateTime(2100),
                  );
                  if (picked != null) {
                    setState(() {
                      ${dateStateVar} = picked;
                      ${dateControllerVar}.text = ${dateStateVar}!.toLocal().toString().split(' ')[0];
                    });
                  }
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Date is required';
                  }
                  return null;
                },
              ),
            )`;
            dateCount++;
            break;
            
          case "time":
            const timeControllerVar = `_timeController${timeCount}`;
            const timeStateVar = `_selectedTime${timeCount}`;
            timeControllers.push(
              `final TextEditingController ${timeControllerVar} = TextEditingController();`
            );
            timeState.push(`TimeOfDay? ${timeStateVar};`);
            inputElement = `Padding(
              ${inputPadding},
              child: TextFormField(
                controller: ${timeControllerVar},
                decoration: InputDecoration(
                  labelText: '${input.elementType.label}',
                  hintText: ${timeStateVar} != null ? ${timeStateVar}!.format(context) : '${input.elementType.placeholder}',
                  ${inputDecoration},
                  errorMaxLines: 2,
                ),
                onTap: () async {
                  FocusScope.of(context).requestFocus(FocusNode());
                  TimeOfDay? picked = await showTimePicker(
                    context: context,
                    initialTime: TimeOfDay.now(),
                  );
                  if (picked != null) {
                    setState(() {
                      ${timeStateVar} = picked;
                      ${timeControllerVar}.text = ${timeStateVar}!.format(context);
                    });
                  }
                },
                validator: (value) {
                  if (value == null || value.isEmpty) {
                    return 'Time is required';
                  }
                  return null;
                },
              ),
            )`;
            timeCount++;
            break;

          case "select":
            selectCount++;
            const selectVar = `_selectedOption${selectCount}`;
            selectState  = `String ${selectVar} = "${input.elementType.options[0]}";`;
           firstSelectedOption.push(selectState);  
            inputElement = `
            Padding(
              padding: EdgeInsets.all(8.0),
              child: DropdownButtonFormField<String>(
                decoration: InputDecoration(
                  labelText: '${input.elementType.label}',
                  hintText: '${input.elementType.placeholder}',
                  ${inputDecoration},
                  errorMaxLines: 2
                ),
                value: ${selectVar},
                items: <String>[${input.elementType.options
                  .map((option: any) => `'${option}'`)
                  .join(", ")}]
                  .map((String value) {
                    return DropdownMenuItem<String>(
                      value: value,
                      child: Text(value),
                    );
                  }).toList(),
                onChanged: (newValue) {
                  setState(() {
                    ${selectVar} = newValue!;
                  });
                },
              ),
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
          checkboxCount++;
          const checkboxVar = `_checkboxStates${checkboxCount}`;
          checkboxState = `List<bool> ${checkboxVar} = List.filled(${input.elementType.options.length}, false);`;
          firstSelectedChecboxOption.push(checkboxState);
          checkboxLabels = input.elementType.options;
          inputElement = `Column(
            children: <Widget>[
              ${checkboxLabels
              .map(
                (label: any, index: number) => `
                Padding(
            ${checkboxPadding},
            child: CheckboxListTile(
                  title: Text('${label}'),
                  value:  ${checkboxVar}[${index}],
                  onChanged: (bool? value) {
                    setState(() {
                      ${checkboxVar}[${index}] = value ?? false;
                    });
                  },
             ${checkBoxDecoration} )),
              `
              )
              .join("\n")}
            ],
          )`;
          break;

        case "radio":
          radioCount++;
          const radioVar =  `_radioValue${radioCount}`;
          radioState = `String ${radioVar} = "";`;
          firstSelectedRadioOption.push(radioState); 
          inputElement = input.elementType.options
          .map(
            (option: string) => `Padding(
              padding: EdgeInsets.all(8.0),
              child: RadioListTile<String>(
                title: Text('${option}'),
                value: '${option}',
                groupValue: ${radioVar},
                onChanged: (value) {
                  setState(() {
                    ${radioVar} = value!;
                  });
                },
              ),
            )`
          )
            .join(",\n");
          break;
        case "file":
          inputElement = `Padding(
                ${inputPadding},
                child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                        ElevatedButton(
                            onPressed: () async {
                                FilePickerResult? result = await FilePicker.platform.pickFiles();
                                if (result != null) {
                                    String filePath = result.files.single.path!;
                                    // Update the state with the selected file name
                                    setState(() {
                                        _selectedFileName = result.files.single.name;
                                    });
                                } else {
                                    // User canceled the picker
                                }
                            },
                            child: Row(
                                mainAxisSize: MainAxisSize.min,
                                children: [
                                    Icon(Icons.attach_file, color: Colors.white),
                                    SizedBox(width: 8),
                                    Text('${input.elementType.label}'),
                                ],
                            ),
                            style: ButtonStyle(
                                padding: MaterialStateProperty.all(
                                   ${buttonPadding},
                                ),
                                backgroundColor: MaterialStateProperty.all(
                                    hexToColor('${getInputStyles?.backgroundColor ||
            "#6200EE"
            }')
                                ),
                                shape: MaterialStateProperty.all(
                                    RoundedRectangleBorder(
                                        borderRadius: BorderRadius.circular(8.0),
                                    ),
                                ),
                            ),
                        ),
                        SizedBox(height: 8),
                        if (_selectedFileName != null && _selectedFileName!.isNotEmpty)
                            Text(
                                'Selected File: $_selectedFileName',
                                style: TextStyle(
                                    color: Colors.black,
                                    fontSize: 14,
                                ),
                            ),
                    ],
                ),
            )`;
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
    import 'package:file_picker/file_picker.dart';
    import 'dart:io';
    
    Color hexToColor(String hexCode) {
        hexCode = hexCode.replaceAll('#', '');
        hexCode = 'FF\$hexCode';
        return Color(int.parse(hexCode, radix: 16));
    }
    
    class GeneratedForm extends StatefulWidget {
        @override
        _GeneratedFormState createState() => _GeneratedFormState();
    }
    
    class _GeneratedFormState extends State<GeneratedForm> {
        final _formKey = GlobalKey<FormState>();
        
         ${firstSelectedOption.map((value) => ` ${value} `).join("\n  ")} 
 
        ${firstSelectedChecboxOption.map((value) => ` ${value} `).join("\n  ")}
        ${firstSelectedRadioOption.map((value) => ` ${value} `).join("\n  ")} 
        String? _selectedFileName;
        String? _selectedImagePath;
    TimeOfDay? _selectedTime;
DateTime? _selectedDate;
      ${dateState.join("\n")}
        ${timeState.join("\n")}
        ${dateControllers.join("\n")}
        ${timeControllers.join("\n")}
        @override
        Widget build(BuildContext context) {
            return SingleChildScrollView(
                child: Padding(
                    padding: EdgeInsets.symmetric(horizontal: 10),
                    child: Form(
                        key: _formKey,
                        child: Column(
                            children: [
                                ${componentCode}
                                ElevatedButton(
                                    onPressed: () {
                                        if (_formKey.currentState!.validate()) {
                                            // Process data
                                        }
                                    },
                                    child: Text('${submitBtn}'),
                                    style: ButtonStyle(
                                        padding: MaterialStateProperty.all(
                                            EdgeInsets.symmetric(vertical: 12, horizontal: 16)
                                        ),
                                        backgroundColor: MaterialStateProperty.all(
                                            hexToColor('${getButtonStyles?.backgroundColor ||
    "#6200EE"
    }')
                                        ),
                                        shape: MaterialStateProperty.all(
                                            RoundedRectangleBorder(
                                                borderRadius: BorderRadius.circular(8.0),
                                            ),
                                        ),
                                    ),
                                ),
                            ],
                        ),
                    ),
                ),
            );
        }
    }
    `.trim();

  return exportCode;
};
