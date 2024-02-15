const fs = require('fs');
const axios = require('axios');
const url = require('url');

function cat(path) {
    fs.readFile(path, 'utf8', function(err, data) {
        if (err) {
            // handle error
            console.error(err);
            // kill the process
            process.exit(1);
        }
  
            console.log(data);
});
}

async function webcat(url){
    try {
        let response = await axios.get(url)

        console.log(response.data)
            
        process.exit(1);
    } catch(err){
        console.error(err)
    }
        
}


let path = process.argv[2];

const pathType = url.parse(path).protocol ? 'url' : 'file';

if (pathType === 'url') {
    webcat(path);
} else if (pathType === 'file') {
    cat(path);
} else {
    console.error('Invalid path or URL.');
    process.exit(1);
}