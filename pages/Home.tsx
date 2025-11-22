import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/Button';
import { ArrowRight, Lightbulb, FileText, Hammer, MoveRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const { products } = useStore();
  const featuredProducts = products.slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-stone-900 leading-[1.1] font-sans">
              Craft Your <br/>
              Perfect Furniture, <br/>
              <span className="text-stone-900">Your Way.</span>
            </h1>
            <p className="text-lg text-stone-600 max-w-lg leading-relaxed">
              Your vision, our blueprints. AI-powered DIY furniture design.
              Create quality pieces that fit your space perfectly.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/catalog">
                 <button className="bg-primary-500 hover:bg-primary-600 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-primary-200 flex items-center gap-2">
                   Start Designing with AI <ArrowRight className="w-5 h-5" />
                 </button>
              </Link>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[600px] w-full rounded-3xl overflow-hidden bg-stone-100 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1592078615290-033ee584e267?auto=format&fit=crop&q=80&w=1000"
              alt="Minimalist wooden chair in sunlit room"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-stone-900 font-sans">Explore by Category</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
             {[
               { name: 'Chairs', img: 'https://images.unsplash.com/photo-1503602642458-232111445657', link: '/catalog?category=Living Room' },
               { name: 'Tables', img: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7', link: '/catalog?category=Living Room' },
               { name: 'Desks', img: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd', link: '/catalog?category=Office' },
               { name: 'Shelving', img: 'https://images.unsplash.com/photo-1594620302200-9a762244a156', link: '/catalog?category=Storage' },
             ].map((cat) => (
               <Link key={cat.name} to={cat.link} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-md">
                 <img
                   src={`${cat.img}?auto=format&fit=crop&w=600&q=80`}
                   alt={cat.name}
                   className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                 <div className="absolute bottom-5 left-5">
                   <h3 className="text-white font-bold text-xl tracking-wide">{cat.name}</h3>
                 </div>
               </Link>
             ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-white">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
               <h2 className="text-3xl font-bold text-stone-900 font-sans">How It Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               <div className="flex flex-col items-center text-center group">
                  <div className="mb-6 h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                     <Lightbulb className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">1. Describe Your Idea</h3>
                  <p className="text-stone-500 leading-relaxed px-4">
                     Tell our AI what you want to build. From a minimalist bookshelf to a rustic dining table.
                  </p>
               </div>
               <div className="flex flex-col items-center text-center group">
                  <div className="mb-6 h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                     <FileText className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">2. Get Your Custom Plans</h3>
                  <p className="text-stone-500 leading-relaxed px-4">
                     Receive detailed, easy-to-follow blueprints and a complete materials list generated just for you.
                  </p>
               </div>
               <div className="flex flex-col items-center text-center group">
                  <div className="mb-6 h-20 w-20 rounded-full bg-primary-100 flex items-center justify-center text-primary-600 transition-colors group-hover:bg-primary-600 group-hover:text-white">
                     <Hammer className="h-10 w-10" />
                  </div>
                  <h3 className="text-xl font-bold text-stone-900 mb-3">3. Build Your Masterpiece</h3>
                  <p className="text-stone-500 leading-relaxed px-4">
                     Gather your materials and bring your custom furniture to life. Enjoy the satisfaction of building.
                  </p>
               </div>
            </div>
         </div>
      </section>

      {/* Featured Templates */}
      <section className="py-20 bg-stone-50">
         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-end mb-10">
               <h2 className="text-3xl font-bold text-stone-900 font-sans">Featured Templates</h2>
               <Link to="/catalog" className="text-primary-600 font-semibold flex items-center gap-1 hover:text-primary-700 transition-colors">
                  View all <MoveRight className="w-4 h-4" />
               </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
               {featuredProducts.map(p => (
                  <ProductCard key={p.id} product={p} />
               ))}
            </div>
         </div>
      </section>
    </div>
  );
};

export default Home;