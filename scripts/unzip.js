//using this npm package to extract zip files
const extract = require('extract-zip')
const path = require('path')

async function main() {
    //path of the zip file
    const zipPath = path.join(__dirname, '..', 'data', 'personal-and-spam.zip');
    // destination where zip files will be extracted
    const outDir = path.join(__dirname, '..', 'data', 'personal-and-spam');
    try {
        await extract(zipPath, { dir: outDir });
        console.log('Extraction complete');
    } catch (err) {
        console.error("error during extraction", err);
    }
}
// calling main
main();