import { Category, FinishColor, Material, Product } from './types';

export const MATERIALS_MULTIPLIER: Record<Material, number> = {
  [Material.MDF]: 1.0,
  [Material.PLYWOOD]: 1.2,
  [Material.SOLID_PINE]: 1.5,
  [Material.OAK_VENEER]: 1.8,
};

export const ASSEMBLY_FEE = 15000; // Naira
export const DELIVERY_FEE = 5000; // Naira

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Nordic TV Console',
    description: 'Minimalist floating TV console with sliding doors. Perfect for modern apartments.',
    category: Category.LIVING_ROOM,
    basePrice: 45000,
    baseDimensions: { width: 150, height: 30, depth: 35 },
    imageUrl: 'https://picsum.photos/id/1080/600/400',
    availableMaterials: [Material.MDF, Material.PLYWOOD, Material.OAK_VENEER],
    availableColors: [FinishColor.WHITE, FinishColor.NATURAL, FinishColor.WALNUT],
  },
  {
    id: 'p2',
    name: 'Lagos Bookshelf',
    description: 'Open-back bookshelf with geometric compartments. Sturdy and stylish.',
    category: Category.STORAGE,
    basePrice: 35000,
    baseDimensions: { width: 80, height: 180, depth: 30 },
    imageUrl: 'https://picsum.photos/id/1070/600/400',
    availableMaterials: [Material.MDF, Material.SOLID_PINE],
    availableColors: [FinishColor.WHITE, FinishColor.BLACK, FinishColor.NATURAL],
  },
  {
    id: 'p3',
    name: 'Zen Coffee Table',
    description: 'Low profile coffee table with hidden storage compartment.',
    category: Category.LIVING_ROOM,
    basePrice: 28000,
    baseDimensions: { width: 90, height: 40, depth: 60 },
    imageUrl: 'https://picsum.photos/id/1078/600/400',
    availableMaterials: [Material.PLYWOOD, Material.OAK_VENEER],
    availableColors: [FinishColor.NATURAL, FinishColor.WALNUT],
  },
  {
    id: 'p4',
    name: 'Tech Desk Alpha',
    description: 'Simple, sturdy desk optimized for small home offices with cable management.',
    category: Category.OFFICE,
    basePrice: 42000,
    baseDimensions: { width: 120, height: 75, depth: 60 },
    imageUrl: 'https://picsum.photos/id/1072/600/400',
    availableMaterials: [Material.MDF, Material.PLYWOOD],
    availableColors: [FinishColor.WHITE, FinishColor.GREY, FinishColor.BLACK],
  },
  {
    id: 'p5',
    name: 'Bedside Cube',
    description: 'Compact bedside table with a single drawer and open shelf.',
    category: Category.BEDROOM,
    basePrice: 15000,
    baseDimensions: { width: 40, height: 50, depth: 40 },
    imageUrl: 'https://picsum.photos/id/1069/600/400',
    availableMaterials: [Material.MDF, Material.SOLID_PINE],
    availableColors: [FinishColor.WHITE, FinishColor.NATURAL, FinishColor.GREY],
  },
  {
    id: 'p6',
    name: 'Hexagon Wall Shelf',
    description: 'Set of 3 hexagonal floating shelves for decorative display.',
    category: Category.DECOR,
    basePrice: 12000,
    baseDimensions: { width: 30, height: 26, depth: 10 },
    imageUrl: 'https://picsum.photos/id/1068/600/400',
    availableMaterials: [Material.SOLID_PINE, Material.PLYWOOD],
    availableColors: [FinishColor.NATURAL, FinishColor.WALNUT, FinishColor.BLACK],
  },
];
