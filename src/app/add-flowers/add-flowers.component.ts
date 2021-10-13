import { Component, OnInit } from '@angular/core';
import { Flower } from '../models/flowers';
import { FlowerService } from '../services/avaliable-flowers.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-flowers',
  templateUrl: './add-flowers.component.html',
  styleUrls: ['./add-flowers.component.css']
})
export class AddFlowersComponent implements OnInit {
  flower:Flower
  flowers:Flower[];
  state:boolean=false;
  constructor(private flowerService:FlowerService, private modalService: NgbModal) {
    this.flower = new Flower();
    this.flowers = this.flowerService.getFlowers();
   }


  ngOnInit(): void {
  }
  addFlower(content:any){
    // console.log(this.checkId(this.flower));
    // console.log(!!this.flower);
    
    if (this.checkId(this.flower ) ) {
      this.flowers.push(new Flower( this.flower.id,this.flower.name,this.flower.description,this.flower.price,this.flower.qty,true));
      this.state = false;
    }  else {
      this.open(content);
      this.state = true;
    }
              
  }

  checkId(flower:any){
    var element = this.flowers.find(el=> el.id==flower.id)
    return element?false:true
    
} 

closeResult = '';


open(content:any) {
  this.modalService.open(content, {  centered: true, ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    this.closeResult = `Closed with: ${result}`;
  }, (reason) => {
    this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  });
}

private getDismissReason(reason: any): string {
  if (reason === ModalDismissReasons.ESC) {
    return 'by pressing ESC';
  } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    return 'by clicking on a backdrop';
  } else {
    return `with: ${reason}`;
  }
}
}


