import React, { useState } from 'react';
import { useStore } from '../context/StoreContext';
import Button from '../components/Button';
import { Trash2, ShieldCheck, ArrowRight, Ruler } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DELIVERY_FEE } from '../constants';

const Cart: React.FC = () => {
  const { cart, removeFromCart, clearCart } = useStore();
  const [isCheckedOut, setIsCheckedOut] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + (item.finalPrice * item.quantity), 0);
  const total = subtotal + (cart.length > 0 ? DELIVERY_FEE : 0);

  const handleCheckout = () => {
    // Mock Checkout
    setIsCheckedOut(true);
    setTimeout(() => {
        clearCart();
    }, 2000);
  };

  if (isCheckedOut) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
        <div className="rounded-full bg-green-100 p-6">
           <ShieldCheck className="h-16 w-16 text-green-600" />
        </div>
        <h2 className="mt-6 text-3xl font-serif font-bold text-stone-900">Order Confirmed!</h2>
        <p className="mt-2 text-stone-600 max-w-md">
           Thank you for your purchase. We are preparing your templates. You will receive an email with assembly instructions shortly.
        </p>
        <Link to="/">
          <Button className="mt-8">Back to Home</Button>
        </Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] px-4">
        <h2 className="text-2xl font-bold text-stone-900">Your cart is empty</h2>
        <p className="mt-2 text-stone-500">Looks like you haven't added any templates yet.</p>
        <Link to="/catalog">
          <Button className="mt-6">Browse Catalog</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-serif font-bold text-stone-900 mb-10">Shopping Cart</h1>

      <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
        <section className="lg:col-span-7">
          <ul className="divide-y divide-stone-200 border-t border-b border-stone-200">
            {cart.map((item, idx) => (
              <li key={`${item.productId}-${idx}`} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <img
                    src={item.imageUrl}
                    alt={item.productName}
                    className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link to={`/product/${item.productId}`} className="font-medium text-stone-700 hover:text-stone-800">
                            {item.productName}
                          </Link>
                        </h3>
                      </div>
                      <div className="mt-1 flex text-sm text-stone-500">
                        <p className="border-r border-stone-200 pr-2">{item.selectedColor}</p>
                        <p className="pl-2">{item.selectedMaterial}</p>
                      </div>
                      <div className="mt-1 flex items-center text-sm text-stone-500">
                         <Ruler className="h-3 w-3 mr-1" />
                         <span>{item.dimensions.width}W x {item.dimensions.height}H x {item.dimensions.depth}D cm</span>
                      </div>
                      {item.assemblyService && (
                          <span className="mt-2 inline-flex items-center rounded-full bg-primary-50 px-2 py-0.5 text-xs font-medium text-primary-700">
                            + Assembly
                          </span>
                      )}
                      <p className="mt-1 text-sm font-medium text-stone-900">₦{item.finalPrice.toLocaleString()}</p>
                    </div>

                    <div className="mt-4 sm:mt-0 sm:pr-9">
                      <div className="absolute top-0 right-0">
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.productId)}
                          className="-m-2 inline-flex p-2 text-stone-400 hover:text-stone-500"
                        >
                          <span className="sr-only">Remove</span>
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-sm text-stone-500">Qty {item.quantity}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* Order Summary */}
        <section className="mt-16 rounded-lg bg-stone-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8 border border-stone-200">
          <h2 className="text-lg font-medium text-stone-900">Order summary</h2>

          <dl className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <dt className="text-sm text-stone-600">Subtotal</dt>
              <dd className="text-sm font-medium text-stone-900">₦{subtotal.toLocaleString()}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-stone-200 pt-4">
              <dt className="flex items-center text-sm text-stone-600">
                <span>Shipping estimate</span>
              </dt>
              <dd className="text-sm font-medium text-stone-900">₦{DELIVERY_FEE.toLocaleString()}</dd>
            </div>
            <div className="flex items-center justify-between border-t border-stone-200 pt-4">
              <dt className="text-base font-medium text-stone-900">Order total</dt>
              <dd className="text-base font-medium text-stone-900">₦{total.toLocaleString()}</dd>
            </div>
          </dl>

          <div className="mt-6">
            <Button fullWidth size="lg" onClick={handleCheckout}>
               Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          
          <div className="mt-4 flex justify-center text-xs text-stone-500">
             <ShieldCheck className="mr-1.5 h-4 w-4 text-green-500" /> Secure transaction via Paystack
          </div>
        </section>
      </div>
    </div>
  );
};

export default Cart;