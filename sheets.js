const {google} = require('googleapis');

const auth = new google.auth.GoogleAuth({
    keyFile: "private/credentials.json",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
});


exports.read = async () => {
    console.log('read data google sheets');
    const authClientObject = await auth.getClient();
    const spreadsheetId = "";

    const googleSheetsInstance = google.sheets({
        version: "v4",
        auth: authClientObject,
    })

    const res = await googleSheetsInstance.spreadsheets.values.get({
        auth,
        spreadsheetId,
        range: "list!A:B",
    });

    const rows = res.data.values;
    if (!rows || rows.length === 0) {
        console.log('No data found.');
        return;
    }

    let datas = [];
    let keys = [];

    // restructur json
    for (let i = 0; i < rows.length; i++) {
        if (i == 0) {
           keys = rows[i];
        }
        if (i != 0) {
            let data = {};
            for (let x = 0; x < rows[i].length; x++) {
                for (let y = 0; y < keys.length; y++) {
                    if (x == y) {
                        data[keys[y]] = rows[i][x];
                    }
                }
            }
            datas = [...datas, data];
        }
    }
    return datas;
};


exports.write = async () => {
    const authClientObject = await auth.getClient();
    const spreadsheetId = "";

    const googleSheetsInstance = google.sheets({
        version: "v4",
        auth: authClientObject,
    })

    await googleSheetsInstance.spreadsheets.values.update({
        auth,
        spreadsheetId,
        range: "list!D:E",
        valueInputOption: "USER_ENTERED",
        resource: {
            values:[['lukman', 'sanjaya']]
        }
    })
};

