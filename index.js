const { exec } = require("child_process");
const fs = require('fs');
const fileClasp = './app-script/.clasp.json';
const clasp = require(fileClasp);
const sheet = require('./sheets');
const fileScript = require('./file-script');

const pushClasp = async() => {
    const sheetFile = await sheet.read();
    let sheetFileFormated = [];
    let sheetNames = [];
    for (let i = 0; i < sheetFile.length; i++) {
        const data = {
            scriptId: sheetFile[i].scriptId,
            parentId: [sheetFile[i].parentId]
        }
        sheetFileFormated = [...sheetFileFormated, data];
        sheetNames[i] = sheetFile[i].sheetName;
    }
    
    console.log('processing push to app script');
    for (let x = 0; x < sheetFileFormated.length; x++) {
        console.log('change sheet name');
        fileScript.changeSheet(sheetNames[x]);

        clasp.scriptId = sheetFileFormated[x].scriptId;
        clasp.parentId = sheetFileFormated[x].parentId;
        fs.writeFileSync(fileClasp, JSON.stringify(clasp), function writeJSON(err) {
            if (err) return console.log(err);
            // console.log(JSON.stringify(clasp));
            console.log('writing to ' + fileClasp);
        });

        const result = await new Promise((resolve, reject) => {
            exec("cd app-script && clasp push",  (error, stdout, stderr) => {
                console.log(sheetFileFormated[x])
                if (error) {
                    reject(error);
                    return;
                } else {
                    resolve(stdout); 
                }
            });
        });

        console.log(result);
    }

}

    
pushClasp();