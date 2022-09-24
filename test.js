var removeStyles = require("./index");

var testString1 = `
<div style="margin-top: 30px;margin-bottom: 25px;">
    <span class="sign-buttons cursor" style="padding: 8px 15px;border-radius: 15px;margin-right: 10px;">Sign in</span>
    <span class="sign-buttons cursor" style="padding: 8px 15px;border-radius: 15px;margin-left: 10px;">Sign up</span>
</div>
`;
var testString2 = `
<div style="margin-top: 30px;margin-bottom: 25px;">
    <span class="sign-buttons cursor" style="margin-right: 10px;">Sign in</span>
    <span class="sign-buttons cursor" style="padding: 8px 15px;border-radius: 15px;">Sign up</span>
</div>
`;


var result = removeStyles({
    htmlStrings:[testString1,testString2]
});

console.log(JSON.stringify(result,undefined,2));

