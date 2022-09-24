const ExtendedBases = require("./xbase");
const xBase = new ExtendedBases();
var CSSOBJECT = {},STYLETRACE={},STYLESHEET="",CSSCONSTANT="rs-";
/**
 * 
 * @param {string} styles 
 */
function cssBuilder(styles){
    styles = styles.replace('"','').replace(/.$/,'').split(";");
    var i,traceValue,classNames=[];
    for(i=0;i<styles.length;i++){
        styles[i]=styles[i].split(":");//Must be in form: [style-atribute:value]
        if(styles[i].length==2){//well formed style value
            traceValue = `${styles[i][0]}:${styles[i][1]}`.replace(/\s+/g,' ');
            if(!STYLETRACE[traceValue]){
                STYLETRACE[traceValue]={
                    cssVariable : getCssVar()
                };
                CSSOBJECT[STYLETRACE[traceValue].cssVariable]=`.${STYLETRACE[traceValue].cssVariable}{${traceValue}}`;
                STYLESHEET+=`.${STYLETRACE[traceValue].cssVariable}{${traceValue}}`;
            }
            if(classNames.indexOf(STYLETRACE[traceValue].cssVariable)<0){//ignore duplicate class names
                classNames.push(STYLETRACE[traceValue].cssVariable);
            }
        }
    }
    return classNames;
}
function getCssVar(){
    return `${CSSCONSTANT}${xBase.getUniqueVar()}`;
};
//Returns the css string for all inline styles
function getStyleSheet(){
    return STYLESHEET;
};
//Returns an object with all class names as properties with their 
//respective values
function getCSSObject(){
    return CSSOBJECT;
};

module.exports = {cssBuilder,getStyleSheet,getCSSObject};