import { Component, OnInit } from '@angular/core';
import { Flower } from '../../models/flowers';
import { AvaliableFlowerService } from '../../services/avaliable-flowers.service';

@Component({
  selector: 'app-summury',
  templateUrl: './summury.component.html',
  styleUrls: ['./summury.component.css']
})
export class SummuryComponent implements OnInit {

   
  flower:Flower
  selectedFlower:Flower
  flowers:Flower[];
  tmpFlower:Flower;

  constructor(private flowerService:AvaliableFlowerService) {
    this.tmpFlower=new Flower();
    this.flower = new Flower();
    this.flowers = this.flowerService.getSummaryFlowers();
    this.selectedFlower = new Flower();
   }


  ngOnInit(): void {
  }
  getPrice(){
   //return  this.flowerService.getTotallSum()
      var total:number = 0;
      this.flowers.forEach(element => {
      total +=element.fPrice*element.fQty;
     
   });
   return total;
  }
  removeFlower(id:any){
    this.flowerService.removeFlower(id);
}
}
