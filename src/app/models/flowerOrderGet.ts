import { Flower } from "./flowers";
import { Order } from "./order";

export class FlowerOrderGet {
    orderId: number = 0;
    fId: number = 0;
  flowerPerOrederQty: number = 0;
  flowerPerOrederPrice: number = 0;
  fidNavigation = new Flower();
  order = new Order()
}

// : object = {   
//   orderId:  0,
//  customerId:  '',
//  status:'',
//  customer:  {},
//  flowerOrders:[]=[]
// };