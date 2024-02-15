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

function writecat(content, out){
    fs.writeFile(out, content, 'utf8', function(err){
        if (err) {
            console.error(err);

            process.exit(1)
        }

    })


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

async function writewebcat(url, out){
    try {
        let response = await axios.get(url)

        fs.writeFile(out, response.data, 'utf8', function(err){
            if (err) {
                console.error(err);
    
                process.exit(1)
            }
    
        })    
       
    } catch(err){
        console.error(err)
    }
        
}


if (process.argv[2] = '--out'){
    let out = process.argv[3]
    let path = process.argv[4]
    let pathType = url.parse(path).protocol ? 'url' : 'file';

    writePath(pathType, path, out)

} else {
    let path = process.argv[2]
    let pathType = url.parse(path).protocol ? 'url' : 'file';

    readPath(pathType, path)

}



function readPath(pathType, path) {
    if (pathType === 'url') {
        webcat(path);
    } else if (pathType === 'file') {
        cat(path);
    } else {
    console.error('Invalid path or URL.');
    process.exit(1);
    }
    }


function writePath(pathType, path, out) {
    if (pathType === 'url') {
        writewebcat(path, out);
    } else if (pathType === 'file') {
        writecat(path, out);
    } else {
    console.error('Invalid path or URL.');
    process.exit(1);
    }
    }