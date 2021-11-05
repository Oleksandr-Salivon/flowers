import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from '../../user/login/login.component';
import { Flower } from '../../models/flowers';
import { FlowerService } from '../../services/flower/flower.service';

@Component({
  selector: 'app-flower',
  templateUrl: './flower.component.html',
  styleUrls: ['./flower.component.css'],
})
export class FlowerComponent implements OnInit {
  flowers: Flower[] = [];
  name?: string = '';
  myForm: FormGroup;
  flower: Flower;
  constructor(
    private flowerService: FlowerService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.flower = new Flower();
    this.myForm = new FormGroup({
      fname: new FormControl(null, [
        Validators.required,
        Validators.minLength(5),
      ]),
      fdescr: new FormControl(null, [
        Validators.required,
        Validators.minLength(4),
      ]),
      fprice: new FormControl(null, [Validators.required]),
      fqty: new FormControl(null, [Validators.required, Validators.min(1)]),
    });

    this.flowerService.getFlower().subscribe((flowerData) => {
      console.log(flowerData)
      this.flowers = flowerData as Flower[];
     
       
    });
  }

  addFlower(id: any) {}
  putFlower(
    flowerId: any,
    flowerName: any,
    flowerDescription: any,
    flowerPrice: any,
    flowerQty: any
  ) {
    this.flower.fId = flowerId;
    this.flower.fName = flowerName;
    this.flower.fDescription = flowerDescription;
    this.flower.fPrice = flowerPrice;
    this.flower.fQty = flowerQty;
    this.flowerService.putFlower(this.flower, this.flower.fId);
    this.modalService.dismissAll();
    this.reloadCurrentRoute();
  }
  getFlowers() {
    return this.flowers;
  }
cancel(){
  this.modalService.dismissAll();
}
  editFlower(content: any, id: any) {
    this.open(content, id);
  }

  test(id: any) {
    console.log(id);
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  deleteFlower(id: any) {
    this.flowerService.DelFlower(id);
    this.reloadCurrentRoute();
  }

  public localStorageItem() {
    return localStorage.getItem('token');
  }
  closeResult = '';
  flowerId = 0;
  flowerName = '';
  flowerDescription = '';
  flowerPrice = 0;
  flowerQty = 0;

  open(content: any, flower: any) {
    this.flowerId = flower.fId;
    this.flowerName = flower.fName;
    this.flowerDescription = flower.fDescription;
    this.flowerPrice = flower.fPrice;
    this.flowerQty = flower.fQty;
    this.modalService
      .open(content, {
        centered: true,
        ariaLabelledBy: 'modal-basic-title',
      })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
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

  ngOnInit(): void {
    if (localStorage.getItem('userName')) {
      this.name = localStorage.getItem('userName')?.toString();
    }
  }
}
