const {RemoveInlineStyles,getStyleSheet,writeToCSSFile,readDir} = require("./lib/remove-style");
/**
 * 
 * @param {{htmlStrings:string[],filePaths:string[],dirPath:string,overWriteFiles:boolean,cssDestination:string}} input 
 */
module.exports = function InputTaker(input){
    var result = {
        htmlOutputs:[],
        styleSheet:""
    };
    //If HTML strings are provided, use that
    if(Array.isArray(input.htmlStrings)){
        var i;
        for(i=0;i<input.htmlStrings.length;i++){
            result.htmlOutputs.push(RemoveInlineStyles({
                value:input.htmlStrings[i]
            }));
        }
        result.styleSheet = getStyleSheet();
    }
    //If File names are provided, use that
    else if(Array.isArray(input.filePaths)){
        var i;
        //Will not overwrite files if only `overWriteFiles` is set to false
        //If files are not over written then, we return an array of parsed outputs
        if(typeof (input.overWriteFiles)=="boolean"&&!input.overWriteFiles){
            for(i=0;i<input.filePaths.length;i++){
                result.htmlOutputs.push(RemoveInlineStyles({
                    filePath:input.filePaths[i],
                    overWriteFile:input.overWriteFiles
                }));
            }
        }else{
            //If `overWriteFiles` is set to true or is undefined,
            //files will be over written
            for(i=0;i<input.filePaths.length;i++){
                RemoveInlineStyles({
                    filePath:input.filePaths[i],
                    overWriteFile:input.overWriteFiles
                });
            }
        }
        if(typeof (input.cssDestination)!="string"){
            result.styleSheet = getStyleSheet();
        }else{
            writeToCSSFile(input.cssDestination);
        }
    }
    //If a directory name was provided, use that
    else if(typeof (input.dirPath)=="string"){
        return InputTaker({
            filePaths:readDir(input.dirPath),
            overWriteFiles:input.overWriteFiles,
            cssDestination:input.cssDestination
        });
    }
    return result;
}
