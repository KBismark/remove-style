module.exports = class ExtendedBases{
    
    CSSVARCHARS = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    CSSCURSOR1;
    CSSCURSOR2;
    CSSCURSOR3;
    CSSCURSOR4;
    CSSCURSOR5;
    VARLENGTH;
    TOTAL;
    constructor(){
        this.CSSCURSOR1=-1;
        this.CSSCURSOR2=0;
        this.CSSCURSOR3=-1;
        this.CSSCURSOR4=-1;
        this.CSSCURSOR5=-1;
        this.VARLENGTH = 0;
        this.TOTAL=0;
    }
   getUniqueVar(){
       switch (this.VARLENGTH) {
           case 0:
               if(this.CSSCURSOR1==61){
                   this.VARLENGTH++;
               }
               return this.CSSCURSOR1++,`${this.CSSVARCHARS[this.CSSCURSOR1]}`;
           case 1:
               if(this.CSSCURSOR2==61&&this.CSSCURSOR3==61){
                   this.VARLENGTH++;
                   this.CSSCURSOR2=0;this.CSSCURSOR3=0;
                   this.CSSCURSOR4=-1;
               }else if(this.CSSCURSOR3==61){
                   this.CSSCURSOR2++;
                   this.CSSCURSOR3=-1;
               }
               break;
           case 2:
               if(this.CSSCURSOR2==61&&this.CSSCURSOR3==61&&this.CSSCURSOR4==61){
                   this.VARLENGTH++;
                   this.CSSCURSOR2=0;this.CSSCURSOR3=0;
                   this.CSSCURSOR4=0;this.CSSCURSOR5=-1;
               }else if(this.CSSCURSOR3==61&&this.CSSCURSOR4==61){
                   this.CSSCURSOR2++;
                   this.CSSCURSOR3=0;
                   this.CSSCURSOR4=-1;
               }else if(this.CSSCURSOR4==61){
                   this.CSSCURSOR3++;
                   this.CSSCURSOR4=-1;
               }
               break;
           case 3:
               if(this.CSSCURSOR2==61&&this.CSSCURSOR3==61&&this.CSSCURSOR4==61&&this.CSSCURSOR5==61){
                   this.VARLENGTH++;
                   this.CSSCURSOR2=-1;this.CSSCURSOR3=-1;
                   this.CSSCURSOR4=-1;this.CSSCURSOR5=-1;//add sixth variable
               }else if(this.CSSCURSOR3==61&&this.CSSCURSOR4==61&&this.CSSCURSOR5==61){
                   this.CSSCURSOR2++;
                   this.CSSCURSOR3=0;
                   this.CSSCURSOR4=0;
                   this.CSSCURSOR5=-1;
               }else if(this.CSSCURSOR4==61&&this.CSSCURSOR5==61){
                   this.CSSCURSOR3++;
                   this.CSSCURSOR4=0;
                   this.CSSCURSOR5=-1;
               }else if(this.CSSCURSOR5==61){
                   this.CSSCURSOR4++;
                   this.CSSCURSOR5=-1;
               }
               break;
           default:
               break;
       }
       switch (this.VARLENGTH) {
           case 1://return two chars. Total Length: (3906-62)
               return this.CSSCURSOR3++,`${this.CSSVARCHARS[this.CSSCURSOR2]}${this.CSSVARCHARS[this.CSSCURSOR3]}`;
           case 2://return three chars. Total Length: (242234-3906)
               return this.CSSCURSOR4++,`${this.CSSVARCHARS[this.CSSCURSOR2]}${this.CSSVARCHARS[this.CSSCURSOR3]}${this.CSSVARCHARS[CSSCURSOR4]}`;
           case 3://return four chars. Total Length: (Over 13 million)
               return this.CSSCURSOR5++,`${this.CSSVARCHARS[this.CSSCURSOR2]}${this.CSSVARCHARS[this.CSSCURSOR3]}${this.CSSVARCHARS[CSSCURSOR4]}${this.CSSVARCHARS[CSSCURSOR5]}`;
           default:
               //We wouldn't need up to this point.
               //Crash if only we are here--> That's too much geek;
               throw new Error(
                "You have more than 14 million distinct css rules."+
                "Try to break your css file into two or more by parsing some of your HTML files separately."
                );
       }
       this.TOTAL++;
   }
};