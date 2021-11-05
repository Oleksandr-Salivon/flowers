import { Flower } from '../models/flowers';

export class AvaliableFlowerService {
  flowers: Flower[];
  orderedFlowers: Flower[];
  totallPrice: number = 0;
  constructor() {
    this.flowers = [
      new Flower(101, 'White rose', 'The best white roses', 21, 3, ''),
      new Flower(102, 'Red rose', 'The best red roses', 37, 5, ''),
    ];
    this.orderedFlowers = [];
  }
  getFlowers() {
    return this.flowers;
  }
  getSummaryFlowers() {
    // this.orderedFlowers.forEach(el=> {
    //     console.log("test" + el);

    // })
    return this.orderedFlowers;
  }
  getFlower(id: number): Flower {
    var flower: Flower = new Flower();
    this.flowers.forEach((element) => {
      if (element.fId == id) flower = element;
    });
    this.orderedFlowers.forEach((el) => {
      console.log('test' + el);
    });
    return flower;
  }
  addFlower(flower: any) {
    this.flowers.forEach((element, index) => {
      if (element.fId == flower.id) {
        element.fQty -= 1;
        if (element.fQty < 1) {
          // element.available=false;
        }
      }
    });
    this.addFlowerToOrder(flower);
    return this.flowers;
  }

  addFlowerToOrder(flower: any) {
    var element = this.orderedFlowers.find((el) => el.fId == flower.id);
    if (element) {
      element.fQty += 1;
      // element.available=true;
    } else {
      this.orderedFlowers.push(
        new Flower(
          flower.fid,
          flower.fname,
          flower.fdescription,
          flower.fprice,
          1,
          ''
        )
      );
    }
    this.getTotallSum();
    return this.orderedFlowers;
  }

  removeFlower(id: any) {
    this.orderedFlowers.forEach((element, index) => {
      if (element.fId == id) {
        this.flowers.forEach((element1) => {
          if (element1.fId == id) {
            element1.fQty += 1;
            if (element1.fQty > 0) {
              // element1.available=true;
            }
          }
        });
        element.fQty -= 1;
        // this.totallPrice =this.totallPrice +  element.price*element.qty
        if (element.fQty < 1) {
          this.orderedFlowers.splice(index, 1);
        }
      }
    });
    return this.orderedFlowers;
  }
  getTotallSum() {
    this.totallPrice = 0;
    this.orderedFlowers.forEach((el) => {
      this.totallPrice += el.fPrice * el.fQty;
    });
    return this.totallPrice;
  }
}
