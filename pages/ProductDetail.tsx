import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { MATERIALS_MULTIPLIER, ASSEMBLY_FEE } from '../constants';
import { FinishColor, Material, Dimensions } from '../types';
import Button from '../components/Button';
import { Check, Truck, Info, Wrench, Ruler, RefreshCw } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { getProductById, addToCart } = useStore();
  
  const product = getProductById(id || '');

  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [selectedColor, setSelectedColor] = useState<FinishColor | null>(null);
  const [dimensions, setDimensions] = useState<Dimensions | null>(null);
  const [assemblyService, setAssemblyService] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (product) {
      // Default selection
      let initialColor = product.availableColors[0];
      let initialMaterial = product.availableMaterials[0];

      // Check for pre-selected values passed from AI Chat
      if (location.state) {
        const { preselectedColor, preselectedMaterial } = location.state as { preselectedColor?: string; preselectedMaterial?: string };
        
        if (preselectedColor) {
           const matchedColor = product.availableColors.find(
             c => c.toLowerCase().includes(preselectedColor.toLowerCase())
           );
           if (matchedColor) initialColor = matchedColor;
        }

        if (preselectedMaterial) {
           const matchedMaterial = product.availableMaterials.find(
             m => m.toLowerCase().includes(preselectedMaterial.toLowerCase())
           );
           if (matchedMaterial) initialMaterial = matchedMaterial;
        }
      }

      setSelectedMaterial(initialMaterial);
      setSelectedColor(initialColor);
      setDimensions(product.baseDimensions);
    }
  }, [product, location.state]);

  if (!product || !selectedMaterial || !selectedColor || !dimensions) {
    return <div className="flex h-96 items-center justify-center">Loading...</div>;
  }

  // Price Calculation Logic
  const baseVolume = product.baseDimensions.width * product.baseDimensions.height * product.baseDimensions.depth;
  const currentVolume = dimensions.width * dimensions.height * dimensions.depth;
  const volumeRatio = currentVolume / baseVolume;
  
  // 40% fixed cost, 60% variable volume cost
  const sizeMultiplier = 0.4 + (0.6 * volumeRatio);

  const materialMultiplier = MATERIALS_MULTIPLIER[selectedMaterial];
  const baseItemPrice = product.basePrice * materialMultiplier * sizeMultiplier;
  
  const assemblyPrice = assemblyService ? ASSEMBLY_FEE : 0;
  const unitPrice = Math.round(baseItemPrice + assemblyPrice);
  const totalPrice = unitPrice * quantity;

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      productName: product.name,
      quantity,
      selectedMaterial,
      selectedColor,
      finalPrice: unitPrice,
      imageUrl: product.imageUrl,
      assemblyService,
      dimensions
    });
    navigate('/cart');
  };

  const handleDimensionChange = (key: keyof Dimensions, value: number) => {
    setDimensions(prev => prev ? ({ ...prev, [key]: value }) : null);
  };

  const resetDimensions = () => {
    setDimensions(product.baseDimensions);
  };

  // Mock Color Visualizer Styles
  const getColorFilter = (color: FinishColor) => {
    switch (color) {
      case FinishColor.BLACK: return 'grayscale(100%) brightness(50%)';
      case FinishColor.WHITE: return 'brightness(130%) sepia(10%)';
      case FinishColor.WALNUT: return 'sepia(50%) brightness(80%) saturate(150%)';
      case FinishColor.GREY: return 'grayscale(100%) brightness(90%)';
      case FinishColor.NATURAL: return 'none';
      default: return 'none';
    }
  };

  const renderDimensionInput = (label: string, key: keyof Dimensions, baseVal: number) => {
    const min = Math.round(baseVal * 0.8);
    const max = Math.round(baseVal * 1.5);
    const current = dimensions![key];
    const isChanged = current !== baseVal;

    return (
      <div className="space-y-3">
        <div className="flex justify-between items-end">
           <label className="text-sm font-medium text-stone-700">{label}</label>
           <div className="text-right">
              <div className={`text-lg font-bold transition-colors ${isChanged ? 'text-primary-700' : 'text-stone-900'}`}>
                {current} cm
              </div>
              <div className="text-xs text-stone-500">
                Standard: <span className="font-medium text-stone-700">{baseVal} cm</span>
              </div>
           </div>
        </div>
        <div className="relative">
          <input 
            type="range" 
            min={min} 
            max={max} 
            value={current}
            onChange={(e) => handleDimensionChange(key, parseInt(e.target.value))}
            className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
        <div className="flex justify-between text-xs text-stone-400 font-medium">
           <span>Min: {min} cm</span>
           <span>Max: {max} cm</span>
        </div>
      </div>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2 lg:gap-x-12">
        {/* Image Section */}
        <div className="relative">
           <div className="aspect-[4/3] w-full overflow-hidden rounded-2xl bg-stone-100 shadow-sm">
             <img
               src={product.imageUrl}
               alt={product.name}
               className="h-full w-full object-cover object-center transition-all duration-500"
               style={{ filter: getColorFilter(selectedColor) }}
             />
           </div>
           <div className="mt-4 flex items-start gap-3 rounded-lg bg-blue-50 p-4 text-blue-800">
              <Info className="mt-0.5 h-5 w-5 shrink-0" />
              <p className="text-sm">
                The image is simulated. Actual wood grain and finish may vary slightly depending on the material selected.
              </p>
           </div>
        </div>

        {/* Info Section */}
        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-serif font-bold tracking-tight text-stone-900">{product.name}</h1>
          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-stone-900">₦{totalPrice.toLocaleString()}</p>
            {dimensions.width !== product.baseDimensions.width && (
               <p className="text-sm text-stone-500 mt-1">
                 (Adjusted for custom size)
               </p>
            )}
          </div>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-stone-600">{product.description}</p>
          </div>
          
          <div className="mt-6 flex items-center text-sm text-stone-500">
             <div className="mr-6 flex items-center"><Truck className="mr-1.5 h-4 w-4" /> 3-5 Day Delivery</div>
             <div className="flex items-center"><Wrench className="mr-1.5 h-4 w-4" /> DIY Ready</div>
          </div>

          <form className="mt-8 border-t border-stone-200 pt-8">
            {/* Color Selection */}
            <div>
              <h3 className="text-sm font-medium text-stone-900">Finish / Color</h3>
              <div className="mt-4 flex items-center space-x-3">
                {product.availableColors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`relative flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none ring-offset-2 ${
                      selectedColor === color ? 'ring-2 ring-primary-600' : ''
                    }`}
                  >
                    <span className="sr-only">{color}</span>
                    <span
                      aria-hidden="true"
                      className="h-8 w-8 rounded-full border border-black border-opacity-10"
                      style={{ backgroundColor: color === FinishColor.NATURAL ? '#e3d2a5' : color === FinishColor.WALNUT ? '#5e412a' : color.toLowerCase().replace('matte ', '').replace(' stain', '') }}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-stone-600 font-medium">{selectedColor}</span>
              </div>
            </div>

            {/* Material Selection */}
            <div className="mt-8">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-stone-900">Material</h3>
                <span className="text-sm text-primary-700 hover:text-primary-800 cursor-pointer">Material Guide</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                {product.availableMaterials.map((material) => (
                  <div
                    key={material}
                    className={`relative flex cursor-pointer rounded-lg border p-4 shadow-sm focus:outline-none ${
                      selectedMaterial === material
                        ? 'border-primary-600 ring-1 ring-primary-600'
                        : 'border-stone-300'
                    }`}
                    onClick={() => setSelectedMaterial(material)}
                  >
                    <div className="flex flex-1">
                      <div className="flex flex-col">
                        <span className="block text-sm font-medium text-stone-900">{material}</span>
                        <span className="mt-1 flex items-center text-sm text-stone-500">
                          {material === Material.MDF ? 'Budget Friendly' : material === Material.OAK_VENEER ? 'Premium Finish' : 'Standard'}
                        </span>
                      </div>
                    </div>
                    {selectedMaterial === material ? (
                      <Check className="h-5 w-5 text-primary-600" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            {/* Dimensions Section */}
            <div className="mt-8">
               <div className="flex items-center justify-between mb-4">
                 <h3 className="text-sm font-medium text-stone-900 flex items-center gap-2">
                    <Ruler className="h-4 w-4" /> 
                    Dimensions (cm)
                 </h3>
                 <button 
                    type="button" 
                    onClick={resetDimensions}
                    className="text-xs text-primary-700 flex items-center gap-1 hover:underline"
                 >
                    <RefreshCw className="h-3 w-3" /> Reset to standard
                 </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 bg-stone-50 rounded-lg border border-stone-200">
                  {renderDimensionInput("Width", "width", product.baseDimensions.width)}
                  {renderDimensionInput("Height", "height", product.baseDimensions.height)}
                  {renderDimensionInput("Depth", "depth", product.baseDimensions.depth)}
               </div>
               <p className="text-xs text-stone-500 mt-3 px-1">
                  *Dimensions can be adjusted between 80% and 150% of standard size. Price updates automatically based on volume.
               </p>
            </div>

            {/* Assembly Toggle */}
             <div className="mt-8 flex items-center justify-between rounded-lg border border-stone-200 bg-stone-50 p-4">
                <div className="flex flex-col">
                   <span className="text-sm font-medium text-stone-900">Expert Assembly Service</span>
                   <span className="text-xs text-stone-500">+ ₦{ASSEMBLY_FEE.toLocaleString()}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setAssemblyService(!assemblyService)}
                  className={`${
                    assemblyService ? 'bg-primary-600' : 'bg-stone-200'
                  } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
                >
                   <span
                     className={`${
                       assemblyService ? 'translate-x-5' : 'translate-x-0'
                     } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                   />
                </button>
             </div>

            {/* Actions */}
            <div className="mt-10 flex gap-4">
               <div className="flex items-center border border-stone-300 rounded-lg">
                  <button type="button" className="px-3 py-2 text-stone-600 hover:bg-stone-100" onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
                  <span className="px-3 py-2 font-medium min-w-[3rem] text-center">{quantity}</span>
                  <button type="button" className="px-3 py-2 text-stone-600 hover:bg-stone-100" onClick={() => setQuantity(quantity + 1)}>+</button>
               </div>
               <Button onClick={handleAddToCart} fullWidth size="lg">
                 Add to Cart
               </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;