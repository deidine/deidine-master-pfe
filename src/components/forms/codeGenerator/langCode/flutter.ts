
export const generateComponentCodeFlutter = (
  elements: FormElement[],
  submitBtn: string,
  getFormStyles?: FormStyle,
  getInputStyles?: FormStyle,
  getButtonStyles?: FormStyle
) => {
  let imports = new Set([`import 'package:flutter/material.dart';`,`import 'package:file_picker/file_picker.dart';`]);
  let stateVariables: string[] = [];
  let initState: string[] = [];
  let disposeState: string[] = [];
  let widgetCode: string[] = [];

  const hexToColorFunction = `
Color hexToColor(String hexCode) {
  hexCode = hexCode.replaceAll('#', '');
  return Color(int.parse('FF\${hexCode}', radix: 16));
}
`;

  const inputDecoration = `
  labelStyle: TextStyle(color: hexToColor('${getInputStyles?.color || "#000000"}')),
hintStyle: TextStyle(color: hexToColor('${getInputStyles?.color || "#000000"}')), 
    contentPadding: EdgeInsets.symmetric(
      horizontal: ${getInputStyles?.paddingX?.replace("px", ".0") || "16.0"},
      vertical: ${getInputStyles?.paddingY?.replace("px", ".0") || "12.0"},
    ),
    filled: true,
    fillColor: hexToColor('${getInputStyles?.backgroundColor ||"#FFFFFF"}'),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${getInputStyles?.borderRadius?.replace("px", ".0") || "8.0"}),
      borderSide: BorderSide(
        color: hexToColor('${getInputStyles?.borderColor ||"#FFFFFF"}'),
        width: ${getInputStyles?.borderWidth?.replace("px", "") || "1.0"},
      ),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${getInputStyles?.borderRadius?.replace("px", ".0") || "8.0"}),
      borderSide: BorderSide(
        color: hexToColor('${getInputStyles?.borderColor ||"#BDBDBD"}'),
        width: ${getInputStyles?.borderWidth?.replace("px", "") || "1.0"},
      ),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(${getInputStyles?.borderRadius?.replace("px", ".0") || "8.0"}),
      borderSide: BorderSide(
        color: hexToColor('${getInputStyles?.focusBorderColor || "#2196F3"}'),
        width: ${getInputStyles?.borderWidth?.replace("px", "") || "2.0"},
      ),
    ),
`;

  elements.forEach((element, index) => {
    let inputElement = "";
    const elementName = `_${element.elementType.type}${index}`;
    if (element.elementType.type === "logo") {
      imports.add(`import 'package:flutter_svg/flutter_svg.dart';`);
      widgetCode.unshift(`
        Padding(
          padding: EdgeInsets.only(bottom: 16),
          child: '${element.elementType.imgLogoLink}'.toLowerCase().endsWith('.svg')
            ? SvgPicture.network(
                '${element.elementType.imgLogoLink}',
                width: 160,
                height: 160,
              )
            : Image.network(
                '${element.elementType.imgLogoLink}',
                width: 160,
                height: 160,
              ),
        )
      `);
    } else if (element.elementType.type === "headingTitle") {
      widgetCode.unshift(`
        Padding(
          padding: EdgeInsets.only(bottom: 16),
          child: Text(
            '${element.elementType.headingTitle}',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
            ),
          ),
        )
      `);
    }
    switch (element.elementType.type) {
      case "text":
      case "email":
      case "password":
      case "number":
      case "url":
        stateVariables.push(`final TextEditingController ${elementName}Controller = TextEditingController();`);
        disposeState.push(`${elementName}Controller.dispose();`);
        inputElement = `
          TextFormField(
            controller: ${elementName}Controller,
            decoration: InputDecoration(
              labelText: '${element.elementType.label}',
              hintText: '${element.elementType.placeholder}',
              ${inputDecoration}
            ),
            keyboardType: ${element.elementType.type === "number" ? "TextInputType.number" : 
                           element.elementType.type === "email" ? "TextInputType.emailAddress" :
                           element.elementType.type === "url" ? "TextInputType.url" : "TextInputType.text"},
            obscureText: ${element.elementType.type === "password"},
            validator: (value) {
              if (value == null || value.isEmpty) {
                return '${element.elementType.label} is required';
              }
              return null;
            },
          )
        `;
        break;

      case "textarea":
        stateVariables.push(`final TextEditingController ${elementName}Controller = TextEditingController();`);
        disposeState.push(`${elementName}Controller.dispose();`);
        inputElement = `
          TextFormField(
            controller: ${elementName}Controller,
            decoration: InputDecoration(
              labelText: '${element.elementType.label}',
              hintText: '${element.elementType.placeholder}',
              ${inputDecoration}
            ),
            maxLines: null,
            keyboardType: TextInputType.multiline,
            validator: (value) {
              if (value == null || value.isEmpty) {
                return '${element.elementType.label} is required';
              }
              return null;
            },
          )
        `;
        break;

      case "date":
        imports.add(`import 'package:intl/intl.dart';`);
        stateVariables.push(`DateTime? ${elementName}Value;`);
        inputElement = `
          TextFormField(
            decoration: InputDecoration(
              labelText: '${element.elementType.label}',
              hintText: '${element.elementType.placeholder}',
              ${inputDecoration}
              suffixIcon: Icon(Icons.calendar_today),
            ),
            readOnly: true,
            onTap: () async {
              final picked = await showDatePicker(
                context: context,
                initialDate: ${elementName}Value ?? DateTime.now(),
                firstDate: DateTime(2000),
                lastDate: DateTime(2100),
              );
              if (picked != null && picked != ${elementName}Value) {
                setState(() {
                  ${elementName}Value = picked;
                });
              }
            },
            controller: TextEditingController(
              text: ${elementName}Value != null
                ? DateFormat('yyyy-MM-dd').format(${elementName}Value!)
                : '',
            ),
            validator: (value) {
              if (${elementName}Value == null) {
                return '${element.elementType.label} is required';
              }
              return null;
            },
          )
        `;
        break;

      case "time":
        stateVariables.push(`TimeOfDay? ${elementName}Value;`);
        inputElement = `
          TextFormField(
            decoration: InputDecoration(
              labelText: '${element.elementType.label}',
              hintText: '${element.elementType.placeholder}',
              ${inputDecoration}
              suffixIcon: Icon(Icons.access_time),
            ),
            readOnly: true,
            onTap: () async {
              final picked = await showTimePicker(
                context: context,
                initialTime: ${elementName}Value ?? TimeOfDay.now(),
              );
              if (picked != null && picked != ${elementName}Value) {
                setState(() {
                  ${elementName}Value = picked;
                });
              }
            },
            controller: TextEditingController(
              text: ${elementName}Value != null
                ? ${elementName}Value!.format(context)
                : '',
            ),
            validator: (value) {
              if (${elementName}Value == null) {
                return '${element.elementType.label} is required';
              }
              return null;
            },
          )
        `;
        break;

      case "select":
        stateVariables.push(`String? ${elementName}Value;`);
        inputElement = `
          DropdownButtonFormField<String>(
            decoration: InputDecoration(
              labelText: '${element.elementType.label}',
              ${inputDecoration}
            ),
            value: ${elementName}Value,
            items: <String>[${element.elementType.options!.map(option => `'${option}'`).join(", ")}]
              .map((String value) {
                return DropdownMenuItem<String>(
                  value: value,
                  child: Text(value),
                );
              }).toList(),
            onChanged: (newValue) {
              setState(() {
                ${elementName}Value = newValue;
              });
            },
            validator: (value) {
              if (value == null || value.isEmpty) {
                return '${element.elementType.label} is required';
              }
              return null;
            },
          )
        `;
        break;

      case "checkbox":
        stateVariables.push(`List<bool> ${elementName}Values = List.filled(${element.elementType.options!.length}, false);`);
        inputElement = `
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
        Text('${element.elementType.label}', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
        ...${JSON.stringify(element.elementType.options)}.asMap().entries.map((entry) {
          int idx = entry.key;
          String option = entry.value;
          return CheckboxListTile(
            title: Text(option),
            value: ${elementName}Values[idx],
            onChanged: (bool? value) {
              setState(() {
                ${elementName}Values[idx] = value ?? false;
              });
            },
            controlAffinity: ListTileControlAffinity.leading,
          );
        }).toList(),
      ],
          )
        `;
        break;

      case "radio":
        stateVariables.push(`String? ${elementName}Value;`);
        inputElement = `
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('${element.elementType.label}', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              ...${JSON.stringify(element.elementType.options)}.map((String option) {
                return RadioListTile<String>(
                  title: Text(option),
                  value: option,
                  groupValue: ${elementName}Value,
                  onChanged: (String? value) {
                    setState(() {
                      ${elementName}Value = value;
                    });
                  },
                );
              }).toList(),
            ],
          )
        `;
        break;

      case "file":
        imports.add(`import 'dart:io';`);
        stateVariables.push(`File? ${elementName}Value;`);
        inputElement = `
          Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text('${element.elementType.label}', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
              SizedBox(height: 8),
              ElevatedButton(
                onPressed: () async {
                  FilePickerResult? result = await FilePicker.platform.pickFiles();
                  if (result != null) {
                    setState(() {
                      ${elementName}Value = File(result.files.single.path!);
                    });
                  }
                },
                child: Text('Choose File'),
              ),
              if (${elementName}Value != null)
                Padding(
                  padding: EdgeInsets.only(top: 8),
                  child: Text('Selected file: \${${elementName}Value?.path.split('/').last}'),
                ),
            ],
          )
        `;
        break;

      case "paragraph":
        inputElement = `
          Padding(
            padding: EdgeInsets.symmetric(vertical: 8),
            child: Text(
              '${element.elementType.label}',
              style: TextStyle(fontSize: 14),
            ),
          )
        `;
        break;

      case "divider":
        inputElement = `
          Divider(
            color: hexToColor('${getInputStyles?.borderColor ||"#FFFFFF"}'),
            thickness: 1,
          )
        `;
        break;

      default:
        break;
    }

    
    if (inputElement) {
      
      widgetCode.push(`
        Padding(
          padding: EdgeInsets.only(bottom: 16),
          child: ${inputElement},
        )
      `);
    }

    
  });

  const formCode = `
 ${Array.from(imports).map(imp => imp).join('\n')}

class GeneratedForm extends StatefulWidget {
  @override
  _GeneratedFormState createState() => _GeneratedFormState();
}

class _GeneratedFormState extends State<GeneratedForm> {
  final _formKey = GlobalKey<FormState>();
  ${stateVariables.join('\n  ')}

  @override
  void initState() {
    super.initState();
    ${initState.join('\n    ')}
  }

  @override
  void dispose() {
    ${disposeState.join('\n    ')}
    super.dispose();
  }

  ${hexToColorFunction}

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
        child: Padding(
          padding: EdgeInsets.all(16),
          child: Form(
            key: _formKey,
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                ${widgetCode.join(',\n')},
                SizedBox(height: 20),
                Container(
                  width: double.infinity,
                  child: ElevatedButton(
                    onPressed: () {
                      if (_formKey.currentState!.validate()) {
                        // Process form data
                        ScaffoldMessenger.of(context).showSnackBar(
                          SnackBar(content: Text('Processing Data')),
                        );
                      }
                    },
                    child: Text(
                      '${submitBtn}',
                      style: TextStyle(
                        fontSize: 16,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                    style: ElevatedButton.styleFrom(
                      backgroundColor: hexToColor('${getButtonStyles?.backgroundColor || "#2196F3"}'),
                      padding: EdgeInsets.symmetric(vertical: 16),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(${getButtonStyles?.borderRadius?.replace("px", ".0") || "8.0"}),
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
`;

  return formCode.trim();
};

