const fs = require('fs').promises;
const path = require('path');

const colors = [
    '#9400d3',
    '#4b0082',
    '#0000ff',
    '#00ff00',
    '#ffff00',
    '#ff7f00',
    '#ff0000',
    '#ff7f00',
    '#ffff00',
    '#00ff00',
    '#0000ff',
    '#4b0082'
];
// let baseDir = __dirname;
let baseDir = path.join(__dirname, "..", "Users", "jack","AppData","Local","Packages","Microsoft.WindowsTerminal_8wekyb3d8bbwe","LocalState");
// let baseDir = "C:\Users\jack\AppData\Local\Packages\Microsoft.WindowsTerminal_8wekyb3d8bbwe\LocalState";

let index = 0;
loop = function () {
    try {
        setInterval( async () => {
            const jsonData = await read();
            console.log("jsonData gave", jsonData.profiles[3].background);
            jsonData.profiles[3].background = colors[index];
            index = (index + 1) % colors.length;
            await update(jsonData);
            console.log("Looping...");
        }, 1000);
        
    } catch (err) {
        console.log("You done messed up: ", err)
    }
}

read = async function(){
    // console.log(`${baseDir}/profiles.json`);
    let userStr = await fs.readFile(`${baseDir}/profiles.json`, 'utf-8');
    // console.log('userStr: ', userStr);
    return await JSON.parse(userStr);
};

update = async function(data){
    let strData = JSON.stringify(data);
    let fd = await fs.open(`${baseDir}/profiles.json`, 'r+');
    await fs.truncate(`${baseDir}/profiles.json`);
    await fs.writeFile(fd, strData);
    // return await fs.close(fd);
};

loop();