const { exec } = require("child_process");
const fs = require('fs');
const fileClasp = './app-script/.clasp.json';
const clasp = require(fileClasp);

const sheetFile = [
    {
        scriptId: "",
        parentId:[""]
    },
    {
        scriptId: "",
        parentId:[""]
    }
];

sheetFile.map(sheet => {
    clasp.scriptId = sheet.scriptId;
    clasp.parentId = sheet.parentId;
    fs.writeFileSync(fileClasp, JSON.stringify(clasp), function writeJSON(err) {
        if (err) return console.log(err);
        // console.log(JSON.stringify(clasp));
        console.log('writing to ' + fileClasp);
    });
      
      
    exec("cd app-script && clasp push", (error, stdout, stderr) => {
        console.log(sheet)
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
    });
})
    
