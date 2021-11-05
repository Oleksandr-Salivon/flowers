import { Component, OnInit } from '@angular/core';
import { Flower } from '../../models/flowers';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FlowerService } from '../../services/flower/flower.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-flowers',
  templateUrl: './add-flowers.component.html',
  styleUrls: ['./add-flowers.component.css'],
})
export class AddFlowersComponent implements OnInit {
  flower: Flower;
  flowers: Flower[] = [];
  state: boolean = false;
  myForm: FormGroup;
  errorMes: string = '';
  constructor(
    private flowerService: FlowerService,
    private modalService: NgbModal,
    private router: Router
  ) {
    this.flower = new Flower();
    this.flowerService.getFlower().subscribe((flowerData) => {
      this.flowers = flowerData as Flower[];
    });
    this.myForm = new FormGroup({
      // "fid": new FormControl(null, [Validators.required]),
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
  }
 
  public get fid(): any {
    return this.myForm.get('fid');
  }
  public get fname(): any {
    return this.myForm.get('fname');
  }
  public get fdescr(): any {
    return this.myForm.get('fdescr');
  }
  public get fprice(): any {
    return this.myForm.get('fprice');
  }
  public get fqty(): any {
    return this.myForm.get('fqty');
  }
  addFlower(id: any) {
    console.log(this.flowers);
    this.flower.fId = 0;
    this.flower.fName = this.fname.value;
    this.flower.fDescription = this.fdescr.value;
    this.flower.fPrice = this.fprice.value;
    this.flower.fQty = this.fqty.value;
    if (this.myForm.valid) {
      this.flowerService.postFlower(this.flower);
    } else {
      this.fname.touched = true;
      this.fdescr.touched = true;
      this.fprice.touched = true;
      this.fqty.touched = true;
      this.open(id);
      this.state = true;
      this.errorMes = 'Fill in all fields';
    }

    this.reloadCurrentRoute();
  }


  
  checkId(flower: any) {
    var element = this.flowers.find((el) => el.fId == flower.id);
    return element ? false : true;
  }
  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }
  ngOnInit(): void {}
  closeResult = '';

  open(content: any) {
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
}
