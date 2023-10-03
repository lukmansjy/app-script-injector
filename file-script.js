var fs = require('fs');

exports.changeSheet = (sheetName) => {
    const regex = /(var ws = )+["A-Za-z0-9\_\-\;]+/g;
    const path = './app-script/Code.js'
    const varSheetName = `var ws = "${sheetName}";`;
    
    const fileContent = fs.readFileSync(path, 'utf8');
    const newFileContent = fileContent.replace(regex, varSheetName);

    fs.writeFileSync(path, newFileContent);
}