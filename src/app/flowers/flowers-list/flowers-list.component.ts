import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { FlowerOrder } from 'src/app/models/flowerOrder';
import { Order } from 'src/app/models/order';
import { OrderPost } from 'src/app/models/orderPost';
import { FlowerOrderService } from 'src/app/services/flowerOrder/flower-order.service';
import { OrderService } from 'src/app/services/order/order.service';
import { Flower } from '../../models/flowers';
import { FlowerService } from '../../services/flower/flower.service';

@Component({
  selector: 'app-flowers-list',
  templateUrl: './flowers-list.component.html',
  styleUrls: ['./flowers-list.component.css'],
})
export class FlowersListComponent implements OnInit {
  orders: Order[] = [];
  order: Order;
  orderPost: OrderPost;
  flowers: Flower[] = [];
  name?: string = '';
  myForm: FormGroup;
  flower: Flower;
  flowerOrder: FlowerOrder;
  customerNameObj: Customer;
  constructor(
    private orderService: OrderService,
    private flowerOrderService: FlowerOrderService,
    private flowerService: FlowerService,
    private router: Router,
    private modalService: NgbModal
  ) {
    this.order = new Order();
    this.orderPost = new OrderPost();
    this.customerNameObj = new Customer();
    this.flowerOrder = new FlowerOrder();
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
      this.flowers = flowerData as Flower[];
    });
  }
 
  addFlowerToOrder(flower: any) {
    this.flowerOrder = new FlowerOrder();
    if (this.localStorageItem('status') === 'processing') {
      
      this.orderService.getOrder().subscribe((data) => {
        this.orders = data as Order[];
        this.order = this.orders
        .filter((o) => o.status === 'processing')
        .filter((o) => o.customerId === localStorage.getItem('userName'))[0];
        console.log(this.order.customerId);
        let tmpFlowerOrder = this.order.flowerOrders;
        this.flowerOrder.fId = flower.fId;
        this.flowerOrder.orderId = this.order.orderId;
        this.flowerOrder.flowerPerOrederPrice = flower.fPrice;
        let tempUrlArr: any = [];
        tmpFlowerOrder.forEach((element) => {
          let tmp = element as FlowerOrder;
          tempUrlArr.push(`${tmp.fId}_${tmp.orderId}`);
        });
        if (
          tmpFlowerOrder.length === 0 ||
          !tempUrlArr.some(
            (e: any) =>
              e === `${this.flowerOrder.fId}_${this.flowerOrder.orderId}`
          )
        ) {
          this.flowerOrder.flowerPerOrederQty = 1;
          this.flowerOrderService.postFlowerOrder(this.flowerOrder);
        } else {
          let tmpFlowrOrderId = this.flowerOrderService.getFlowerOrderID(
            this.order.orderId,
            flower.fId
          );
          setTimeout(() => {
            tmpFlowrOrderId.subscribe((data) => {
              let tempObj = data as FlowerOrder;
              if (tempObj.fId == flower.fId) {
                if (tempObj.flowerPerOrederQty < flower.fQty) {
                  this.flowerOrder.flowerPerOrederQty =
                    tempObj.flowerPerOrederQty + 1;
                  this.flowerOrderService.putFlowerOrder(
                    this.flowerOrder,
                    this.order.orderId,
                    flower.fId
                  );
                }
              }
            });
          }, 1);
        }
      });
    } else {
      this.orderPost.customerId = localStorage.getItem('userName') as string;
      this.orderPost.status = 'processing';
      console.log(this.orderPost);
      this.orderService.postOrder(this.orderPost);
      localStorage.setItem('status','processing')

    }
  }

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

  editFlower(content: any, id: any) {
    this.open(content, id);
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

  public localStorageItem(storage: string) {
    return localStorage.getItem(storage);
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
