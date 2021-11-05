import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Customer } from 'src/app/models/customer';
import { FlowerOrder } from 'src/app/models/flowerOrder';
import { FlowerOrderGet } from 'src/app/models/flowerOrderGet';
import { Flower } from 'src/app/models/flowers';
import { OrderPost } from 'src/app/models/orderPost';
import { FlowerService } from 'src/app/services/flower/flower.service';
import { FlowerOrderService } from 'src/app/services/flowerOrder/flower-order.service';
import { Order } from '../../models/order';
import { OrderService } from '../../services/order/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  customerNameObj: Customer;
  orders: Order[] = [];
  orderPost: OrderPost;
  flowerOrders: FlowerOrder[] = [];
  name?: string = '';
  myForm: FormGroup;
  order: Order;
  flowerOrder: FlowerOrder;
  flowerOrderGet: FlowerOrderGet;
  totalSumm: number;
  flower: Flower;
  flowers: Flower[] = [];
  constructor(
    private orderService: OrderService,
    private flowerOrderService: FlowerOrderService,
    private router: Router,
    private modalService: NgbModal,
    private flowerService: FlowerService
  ) {
    this.totalSumm = 0;
    this.flower = new Flower();
    this.customerNameObj = new Customer();
    this.order = new Order();
    this.orderPost = new OrderPost();
    this.flowerOrder = new FlowerOrder();
    this.flowerOrderGet = new FlowerOrderGet();
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

    this.orderService.getOrder().subscribe((orderData) => {
      this.orders = orderData as Order[];
    });
    this.flowerOrderService
      .getFlowerOrder()
      .toPromise()
      .then((rez) => {
        this.flowerOrders = rez as FlowerOrder[];

        console.log('tttt');

        console.log(this.flowerOrders);

        this.flowerOrderGet = this.flowerOrders[0] as FlowerOrderGet;
        console.log(this.flowerOrderGet.fidNavigation.fName);
        
      });

    this.flowerService.getFlower().subscribe((flowerData) => {
      this.flowers = flowerData as Flower[];
    });
  }
  getter() {
    this.flowerOrderService
      .getFlowerOrder()
      .toPromise()
      .then((rez) => console.log(rez));
  }

  totalPrice(input: any) {

    this.totalSumm = 0;
    for (let i = 0; i < input.length; i++) {
      this.totalSumm +=
        input[i].flowerPerOrederPrice * input[i].flowerPerOrederQty;
    }
    return this.totalSumm;
  }
  changeQTY(event: any) {
    this.flowerOrder.fId = event.fId;
    this.flowerOrder.orderId = event.orderId;
    this.flowerOrder.flowerPerOrederQty = event.flowerPerOrederQty;
    this.flowerOrder.flowerPerOrederPrice = event.flowerPerOrederPrice;
    this.flowerOrderService.putFlowerOrder(
      this.flowerOrder,
      this.flowerOrder.orderId,
      this.flowerOrder.fId
    );

    this.totalPrice(this.flowerOrders);
  }

  putOrder(
    customer: any,
    customerId: any,
    flowerOrders: any,
    orderId: any,
    status: any
  ) {
    this.order.customer = customer;
    this.order.customerId = customerId;
    this.order.flowerOrders = flowerOrders;
    this.order.orderId = orderId;
    this.order.status = 'success';
    this.orderService.putOrder(this.order, this.order.customer);
    this.modalService.dismissAll();
    this.reloadCurrentRoute();
  }
  getOrders(status: string) {
    let tmpOrder = this.orders
      .filter((o) => o.status === status)
      .filter((o) => o.customerId === localStorage.getItem('userName'));
    if (
      tmpOrder.length === 1 &&
      tmpOrder[0].status === 'processing' &&
      tmpOrder[0].customerId === localStorage.getItem('userName')
    ) {
      localStorage.setItem('status', tmpOrder[0].status);
      localStorage.setItem('OrderId', tmpOrder[0].orderId.toString());
      this.customerNameObj = tmpOrder[0].customer as Customer;
    }

    return tmpOrder;
  }

  newOrder(id: any) {
    console.log(this.orders);
    this.order.customerId = '';
    this.order.customer = {};
    this.order.flowerOrders = [];
    this.order.orderId = 0;
    this.order.status = 'new';
    this.orderService.postOrder(this.order);
    this.reloadCurrentRoute();
  }
  getName(id: any) {
    let name = this.flowers.find((o) => o.fId === id)?.fName;
    return name;
  }
  getMaxQty(id: any) {
    let qty = this.flowers.find((o) => o.fId === id)?.fQty as number;

    return qty;
  }
  
  getFlowerOrders(id: number) {
    let test = this.flowerOrders.filter((fo) => fo.orderId === id);
    this.totalPrice(test);

    return test;
  }

  editOrder(content: any, id: any) {
    this.open(content, id);
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });
  }

  public localStorageItem(storage: string) {
    return localStorage.getItem(storage);
  }
  addFlowerToOrder(id: any) {
    if (this.localStorageItem('status')) {
      console.log('pass');
    }
    console.log('fall');
  }

  deleteFlowerOrder(fId: any, oId: any) {
    this.flowerOrderService.DelFlowerOrder(fId, oId);
    this.reloadCurrentRoute();
  }

  confirmOrder(id: any) {
    this.orderPost.customerId = localStorage.getItem('userName') as string;
    this.orderPost.orderId = id;
    this.orderPost.status = 'Successfull';

    console.log(id);
    let fo = this.flowerOrders.filter((or) => or.orderId == id);
    fo.forEach((e) => {
      console.log(e.fId);
      let flOrQty = this.flowerOrders
        .filter((o) => o.orderId == id)
        .find((f) => f.fId == e.fId)?.flowerPerOrederQty as number;
      console.log(
        this.flowerOrders
          .filter((o) => o.orderId == id)
          .find((f) => f.fId == e.fId)
      );
      this.flowerOrders
        .filter((o) => o.orderId == id)
        .find((f) => f.fId == e.fId);
      let tmpFlower = this.flowers.find((el) => el.fId == e.fId);
      let tmpfloQty = tmpFlower?.fQty as number;
      this.flower.fId = tmpFlower?.fId as number;
      this.flower.fName = tmpFlower?.fName as string;
      this.flower.fPic = tmpFlower?.fPic as string;
      this.flower.fPrice = tmpFlower?.fPrice as number;
      this.flower.fQty = (tmpfloQty - flOrQty) as number;
      this.flowerService.putFlower(this.flower, e.fId);
      console.log(tmpFlower);
      console.log(this.flower);
    });
    console.log(this.flowerOrders.filter((or) => or.orderId == id));
    this.orderService.putOrder(this.orderPost, id);
    //  console.log(this.flowers);

    localStorage.removeItem('status');
    this.reloadCurrentRoute();
  }
  deleteOrder(id: any) {
    this.orderPost.customerId = localStorage.getItem('userName') as string;
    this.orderPost.orderId = id;
    this.orderPost.status = 'Canceled';
    this.orderService.putOrder(this.orderPost, id);
    localStorage.removeItem('status');
    this.reloadCurrentRoute();
  }

  closeResult = '';
  flowerId = 0;
  flowerName = '';
  flowerDescription = '';
  flowerPrice = 0;
  flowerQty = 0;

  open(content: any, order: any) {
    this.flowerId = order.fId;
    this.flowerName = order.fName;
    this.flowerDescription = order.fDescription;
    this.flowerPrice = order.fPrice;
    this.flowerQty = order.fQty;
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
var qwer = 1;
