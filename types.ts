export enum Category {
  LIVING_ROOM = 'Living Room',
  BEDROOM = 'Bedroom',
  OFFICE = 'Office',
  STORAGE = 'Storage',
  DECOR = 'Decor'
}

export enum Material {
  PLYWOOD = 'Birch Plywood',
  MDF = 'High-Grade MDF',
  SOLID_PINE = 'Solid Pine',
  OAK_VENEER = 'Oak Veneer'
}

export enum FinishColor {
  NATURAL = 'Natural',
  WHITE = 'Matte White',
  BLACK = 'Matte Black',
  WALNUT = 'Walnut Stain',
  GREY = 'Slate Grey'
}

export interface Dimensions {
  width: number;
  height: number;
  depth: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: Category;
  basePrice: number;
  baseDimensions: Dimensions;
  imageUrl: string;
  availableMaterials: Material[];
  availableColors: FinishColor[];
}

export interface CartItem {
  productId: string;
  productName: string;
  quantity: number;
  selectedMaterial: Material;
  selectedColor: FinishColor;
  finalPrice: number;
  imageUrl: string;
  assemblyService: boolean;
  dimensions: Dimensions;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  recommendedProductIds?: string[];
  preferences?: {
    color?: string;
    material?: string;
  };
}