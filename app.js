/*jshint esversion: 6*/

(() => {
    "use strict";

    let fs = require("fs");
    let path = require("path");

    let params = {
        minChars : 1500,
        maxChars : 9500,
        numOfFiles : 30,
        pathForFiles : "./test_files"
    };

    function getRandomRange(min, max){
        return Math.floor(Math.random() * (max - min) + min);
    }

    function generateStr(strLength){
        let text = "";
        let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for(let i=0; i < strLength; i++){
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        }

        return text;
    }

    function formatText(text, nChar) {
        let ret = [], i;

        for(i = 0; i < text.length; i += nChar){
            ret.push(text.substr(i, nChar));
        }

        return ret;
    }

    if(fs.existsSync(params.pathForFiles)) {
        fs.readdir(params.pathForFiles, (err, files) => {
            if(err) {
                throw err;
            }

            files.forEach((file,key) => {
                fs.unlink(path.join(params.pathForFiles, file), (err) => {
                    if(err) {
                        throw err;
                    }
                });
            });
        });
    } else {
        fs.mkdir(params.pathForFiles, (err) => {
            if(err) {
                throw err;
            }
        });
    }

    for(let i = 1; i <= params.numOfFiles; i++) {
        var text = generateStr(getRandomRange(params.minChars, params.maxChars));
        fs.writeFileSync(params.pathForFiles + "/test_file_" + i + ".txt", formatText(text, 120).join("\r\n"));

        if(i === params.numOfFiles) {
            console.log(params.numOfFiles + " files were generated");
            process.exit();
        }
    }
})();