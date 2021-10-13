import { Component, OnInit } from '@angular/core';
import { Flower } from '../models/flowers';
import { FlowerService } from '../services/avaliable-flowers.service';

@Component({
  selector: 'app-available-flowers',
  templateUrl: './available-flowers.component.html',
  styleUrls: ['./available-flowers.component.css']
})
export class AvailableFlowersComponent implements OnInit {
  
  
  flower:Flower
  selectedFlower:Flower
  flowers:Flower[];
  tmpFlower:Flower;
  constructor(private flowerService:FlowerService) {
    this.tmpFlower=new Flower();
    this.flower = new Flower();
    this.flowers = this.flowerService.getFlowers();
    this.selectedFlower = new Flower();
   }

  ngOnInit(): void {
  }
  addFlower(id:any){
      this.flowerService.addFlower(id);
  }
  
 
    
  
}
