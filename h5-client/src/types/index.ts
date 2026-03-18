export interface SkuOption {
  id: string;
  name: string;
  price: number;
}

export interface SkuCategory {
  id: string;
  name: string;
  required: boolean;
  options: SkuOption[];
}

export interface FoodItem {
  id: number;
  name: string;
  desc: string;
  price: number;
  img: string;
  tags?: string[];
  skuCategories?: SkuCategory[];
}

export interface Store {
  id: string;
  name: string;
  address: string;
  distance: string;
  status: 'OPEN' | 'CLOSED';
}
