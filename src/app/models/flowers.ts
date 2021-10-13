export class Flower{
   
    constructor(
        public id?:number,
        public name?:string, 
        public description?:string,
        public price:number=0,
        public qty:number = 1,
        public available?:boolean,
        ){

        }
}