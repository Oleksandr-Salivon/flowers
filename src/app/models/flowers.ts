export class Flower{
   
    constructor(
        public fId:number = 0,
        public fName?:string, 
        public fDescription?:string,
        public fPrice:number=0,
        public fQty:number = 1,
        public fPic:string = "",
        public FlowerOrders:[]=[]
        ){

        }
}