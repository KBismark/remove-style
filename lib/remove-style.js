
const fs = require("fs");
const {cssBuilder,getCSSObject,getStyleSheet} = require("./css-builder");
var markupPattern = /<!--[\s\S]*?-->|<(\/|\s?)\s*([a-zA-Z][-.:0-9_a-zA-Z]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*)\s*(\/?)>/g,
attributePattern = /([a-zA-Z()[\]#][a-zA-Z0-9-_:()[\]#]*)(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+))?/gi;

/**
 * 
 * @param {string} html 
 */
function getHtml(html){
    return html.match(markupPattern);
}
/**
 * 
 * @param {string} html 
 */
 function getAttributes(html){
    return html.match(attributePattern);
}
/**
 * 
 * @param {{value:string|undefined,filePath:string|undefined,overWriteFile:boolean}} input 
 * @returns 
 */
function RemoveInlineStyles(input){
    if(typeof (input.overWriteFile)!=="boolean"){
        input.overWriteFile = true;
    }
    if(typeof (input.value)!="undefined"){
        var fileContent = input.value;
        input.overWriteFile = false;
    }else if(typeof (input.filePath)=="string"){
        //Read file contents as string
        var fileContent = fs.readFileSync(input.filePath,"utf8");
    }else{
        return "";
    }
    var count = 0;
    var replacers = [];
    var cursor;
    //Get all HTML tags (Opening, Closing, Self-closing)
    var HTMLTags = getHtml(fileContent);
    if(HTMLTags){
        var i,j,attributes="",giveSpace;
        var attributesObject = {},key="",value="";
        var styles,classNames,styleCount,classCount;
        for(i=0;i<HTMLTags.length;i++){
            cursor = replacers.length;
            replacers.push({
                replace:`${Math.random()}-${count}`,
                value:""
            });
            count++;
            fileContent = fileContent.replace(HTMLTags[i],replacers[cursor].replace);
            attributes = getAttributes(HTMLTags[i]);
            attributesObject = {},key="",value="";
            if(attributes&&attributes.length>1){
                //Tag has attributes
                styleCount = 0;
                classCount = 0;
                styles=[];
                classNames=[];
                //Starts from index 1 to ignore the tag name itself
                for(j=1;j<attributes.length;j++){
                    [key,value] = attributes[j].split("=");
                    key = key.trim();
                    //We only need class and style attributes
                    switch (key) {
                        case "style":
                            attributesObject.style = value;
                            styles.push({
                                replace:`${Math.random()}_${styleCount}`,
                                //value:attributes[j]
                            });
                            HTMLTags[i] = HTMLTags[i].replace(attributes[j],styles[styleCount].replace);
                            styleCount++;
                            break;
                        case "class":
                            attributesObject.class = value;
                            classNames.push(
                                {
                                    replace:`${Math.random()}__${classCount}`,
                                    value:attributes[j]
                                }
                            );
                            HTMLTags[i] = HTMLTags[i].replace(attributes[j],classNames[classCount].replace);
                            classCount++;
                            break;
                        default:
                            break;
                    }
                }
                //If inline styles were found
                if(typeof (attributesObject.style)!="undefined"){
                    if(typeof (attributesObject.class)=="undefined"){
                        attributesObject.class='""'
                    }else{
                        //Remove all class attributes
                        //The last style attribute will be replaced
                        //with the final class attribute
                        for(j=0;j<classNames.length;j++){
                            HTMLTags[i] = HTMLTags[i].replace(classNames[j].replace,"");
                        }
                    }
                    //Remove all style attributes.
                    //Only the last style attribute on the tag
                    //will be used as the style of the tag
                    for(j=0;j<styles.length-1;j++){
                        HTMLTags[i] = HTMLTags[i].replace(styles[j].replace,"");
                    }
                    giveSpace = attributesObject.class.length<3?'':' ';
                     attributesObject.class = `${attributesObject.class.replace(/.$/,'')}${giveSpace}${cssBuilder(attributesObject.style).join(" ")}`;
                     HTMLTags[i] = HTMLTags[i].replace(styles[styles.length-1].replace,`class=${attributesObject.class}"`);
                }else{
                    if(typeof (attributesObject.class)=="string"){
                        //Remove excess class attributes
                        for(j=0;j<classNames.length-1;j++){
                            HTMLTags[i] = HTMLTags[i].replace(classNames[j].replace,"");
                        }
                        //Insert class attribute
                        j=classNames.length-1;
                        HTMLTags[i] = HTMLTags[i].replace(classNames[j].replace,classNames[j].value);
                    }
                }
                replacers[cursor].value = HTMLTags[i];
            }else{
                //Tag has no attributes
                replacers[cursor].value = HTMLTags[i];
            }
        }
        //Final work file content
        for(i=0;i<replacers.length;i++){
            fileContent = fileContent.replace(replacers[i].replace,replacers[i].value);
        }
    }
    if(!input.overWriteFile){
        return fileContent;
    }
    fs.writeFileSync(input.filePath,fileContent);
}
//"C:/Users/Public/NES/Festjs/TOAZAN/html.html"
//C:/Users/Public/NES/Festjs/TOAZAN/scripts/actions.jsx
// fs.writeFileSync("./here.html",RemoveInlineStyles({
//     //value:s,
//     filePath:"C:/Users/Public/NES/Festjs/TOAZAN/html.html",
//     overWriteFile:false
// }));
function writeToCSSFile(cssFilePath){
    fs.writeFileSync(cssFilePath,getStyleSheet());
}
module.exports = {RemoveInlineStyles,getStyleSheet,writeToCSSFile};