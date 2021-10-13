import { Flower } from "../models/flowers";

export class FlowerService{
    flowers:Flower[];
    orderedFlowers:Flower[];
    totallPrice:number=0;
    constructor(){
        this.flowers = [
            new Flower(101,"White rose","The best white roses",21,3,true),
            new Flower(102,"Red rose","The best red roses",37,5,true)
        ]
        this.orderedFlowers = [ ];
    }
    getFlowers(){
        
        return this.flowers;
    }
    getSummaryFlowers(){
        this.orderedFlowers.forEach(el=> {
            console.log("test" + el);
            
        })
        return this.orderedFlowers;
    }
    getFlower(id:number):Flower{
        var flower:Flower = new Flower( );
        this.flowers.forEach(element => {
            if(element.id == id)
            flower = element;

        });
        this.orderedFlowers.forEach(el=> {
            console.log("test" + el);
            
        })
        return flower;
    }
    addFlower(flower:any){
        this.flowers.forEach((element, index) => {
            if(element.id == flower.id){
                element.qty-=1;
                if (element.qty <1) {
                    element.available=false;
                }
            }
        });
        this.addFlowerToOrder(flower);
        return this.flowers;
    }
   

    addFlowerToOrder(flower:any){
        var element = this.orderedFlowers.find(el=> el.id==flower.id)
            if (element) {
                element.qty+=1;
                element.available=true;
                } else {
                    this.orderedFlowers.push(new Flower(flower.id,flower.name,flower.description,flower.price,1,true));
                }
                this.getTotallSum();
        return this.orderedFlowers;
    } 

    removeFlower(id:any){
        this.orderedFlowers.forEach((element, index) => {
            if(element.id == id){
                this.flowers.forEach(element1 => {
                    if(element1.id == id){
                        element1.qty+=1;
                        if (element1.qty >0) {
                            element1.available=true;
                        }
                    }
                });
                element.qty-=1; 
                this.totallPrice =this.totallPrice +  element.price*element.qty
                if (element.qty <1) {
                    this.orderedFlowers.splice(index,1)
                }
            }
        });
        return this.orderedFlowers;
    }
    getTotallSum(){
        this.totallPrice = 0;
        this.orderedFlowers.forEach(el=> {
        this.totallPrice += el.price*el.qty
        })
        return this.totallPrice;
    }
    
}