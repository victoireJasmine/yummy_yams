import { BadInitializationError } from '../../modules/Errors';

export interface Pastry {
  _id: string;  
  name: string;  
  image: string;
  stock: number;
  quantityWon: number;
  getImage: () => string;
}

abstract class AbstractPastry implements Pastry {
  readonly _id: string;  
  readonly name: string;  
  readonly image: string;
  readonly stock: number;
  readonly quantityWon: number;

  constructor(data: Pastry) {
    this._id = data._id;
    this.name = data.name;
    this.image = data.image;
    this.stock = data.stock; 
    this.quantityWon = data.quantityWon
  }
  getImage(): string {
    return import.meta.env.VITE_YUMMY_API +'/'+this.image;
    
  }
}

class PastryRead extends AbstractPastry {
  declare readonly _id: string;
  constructor(data: Pastry) {
    super(data);
    if (!this._id) {
      throw new BadInitializationError();
    }
  }
}

export class PastryFactory {
  static createPastry(data: Pastry): PastryRead {
    return new PastryRead(data);
  }
}
