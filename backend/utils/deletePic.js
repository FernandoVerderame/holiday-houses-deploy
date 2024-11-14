// Importo il path ed il file sistem
const path = require('path');
const fs = require('fs');

const deletePic = (picFolder, filename) => {
    try {
        const filePath = path.join(__dirname, `../public/${picFolder}/` + filename);
        fs.unlinkSync(filePath);
    }
    catch (err) {
        console.log(`Non sono riuscito ad eliminare la profile pic ${filename}.`);
    }
}

module.exports = deletePic;