import React, { useState } from 'react';

// TUAN MarketPlace - Single-file React (TSX) prototype
// - Tailwind CSS utility classes assumed
// - Default export: TUANMarketPlacePage
// - Designed as a clean, responsive landing + company storefront sketch

type Company = {
  id: string;
  name: string;
  country: string;
  tagline?: string;
  logo?: string;
  rating?: number;
  categories?: string[];
};

type Product = {
  id: string;
  title: string;
  price?: string;
  company: string;
  excerpt?: string;
  image?: string;
};

const sampleCompanies: Company[] = [
  { id: '1', name: 'TUAN Creations', country: 'Uganda', tagline: 'Africa-inspired tech', rating: 4.8, categories: ['Software', 'AI'] },
  { id: '2', name: 'Nile Labs', country: 'Kenya', tagline: 'Cloud & DevOps', rating: 4.6, categories: ['Cloud', 'Infra'] },
  { id: '3', name: 'Atlas AI', country: 'Nigeria', tagline: 'AI for business', rating: 4.7, categories: ['AI', 'Data'] },
];

const sampleProducts: Product[] = [
  { id: 'p1', title: 'TUAN ERP Lite', price: 'USD 499', company: 'TUAN Creations', excerpt: 'Lightweight ERP for SMEs', image: '' },
  { id: 'p2', title: 'NileCloud Backup', price: 'USD 199/yr', company: 'Nile Labs', excerpt: 'Secure cloud backup for businesses', image: '' },
  { id: 'p3', title: 'AtlasVision AI', price: 'Contact for pricing', company: 'Atlas AI', excerpt: 'Computer vision as a service', image: '' },
];

function Header({ onHost }: { onHost: () => void }) {
  return (
    <header className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="bg-yellow-500 rounded-full w-10 h-10 flex items-center justify-center font-bold">TU</div>
          <div>
            <div className="font-bold">TUAN MarketPlace</div>
            <div className="text-sm text-gray-300">Africa’s Digital Hub for Technology</div>
          </div>
        </div>
        <nav className="flex items-center space-x-4">
          <input
            className="hidden md:block bg-gray-800 text-sm rounded px-3 py-2 w-80 placeholder-gray-400"
            placeholder="Search products, services, or companies..."
          />
          <button className="text-sm px-3 py-2 rounded hover:bg-gray-800">Categories</button>
          <button className="text-sm px-3 py-2 rounded hover:bg-gray-800">Companies</button>
          <button className="bg-yellow-500 text-black px-4 py-2 rounded font-semibold" onClick={onHost}>Host Your Store</button>
        </nav>
      </div>
    </header>
  );
}

function Hero({ onExplore }: { onExplore: () => void }) {
  return (
    <section className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-white">
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-center gap-8">
        <div className="md:w-1/2">
          <h1 className="text-4xl font-extrabold mb-4">Where Africa Trades Technology</h1>
          <p className="text-gray-700 mb-6">Discover pan-African tech products, hire trusted technology partners, and manage contracts — all in one unified marketplace powered by TUAN.</p>
          <div className="flex gap-3">
            <button onClick={onExplore} className="px-5 py-3 bg-black text-white rounded font-semibold">Explore Marketplace</button>
            <button className="px-5 py-3 border border-black rounded">How it works</button>
          </div>
        </div>
        <div className="md:w-1/2 bg-white rounded-lg shadow p-6">
          <div className="text-sm text-gray-500 mb-3">Featured Product</div>
          <div className="flex items-center gap-4">
            <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">Image</div>
            <div>
              <div className="font-semibold">TUAN ERP Lite</div>
              <div className="text-sm text-gray-600">Lightweight ERP for SMEs — USD 499</div>
              <div className="mt-3 flex gap-2">
                <button className="px-3 py-2 bg-yellow-500 rounded font-medium">Buy</button>
                <button className="px-3 py-2 border rounded">Request Demo</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CategoryPills() {
  const cats = ['Software', 'AI', 'Cloud', 'DevOps', 'Hardware', 'IoT', 'Security'];
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex flex-wrap gap-3">
        {cats.map((c) => (
          <div key={c} className="px-4 py-2 bg-gray-100 rounded-full text-sm">{c}</div>
        ))}
      </div>
    </div>
  );
}

function CompanyCard({ company }: { company: Company }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center">Logo</div>
        <div>
          <div className="font-semibold">{company.name}</div>
          <div className="text-sm text-gray-500">{company.tagline}</div>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-sm text-gray-600">
        <div>{company.country}</div>
        <div>⭐ {company.rating}</div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="px-3 py-2 bg-black text-white rounded text-sm">View Profile</button>
        <button className="px-3 py-2 border rounded text-sm">Send Proposal</button>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-sm flex flex-col">
      <div className="w-full h-40 bg-gray-50 rounded flex items-center justify-center">Product Image</div>
      <div className="mt-3 flex-1">
        <div className="font-semibold">{product.title}</div>
        <div className="text-sm text-gray-600">{product.excerpt}</div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div className="text-sm text-gray-700">{product.company}</div>
        <div className="text-sm font-semibold">{product.price}</div>
      </div>
      <div className="mt-3 flex gap-2">
        <button className="flex-1 px-3 py-2 bg-yellow-500 rounded">Buy / License</button>
        <button className="flex-1 px-3 py-2 border rounded">Request Demo</button>
      </div>
    </div>
  );
}

function CompaniesSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Top Companies</h2>
        <button className="text-sm border rounded px-3 py-2">View All</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleCompanies.map((c) => (
          <CompanyCard key={c.id} company={c} />
        ))}
      </div>
    </section>
  );
}

function ProductsSection() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12 bg-gray-50 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Trending Products</h2>
        <div className="text-sm text-gray-600">New listings daily</div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleProducts.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

function ContractFinder() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-12">
      <div className="bg-white border rounded-lg p-6 flex flex-col md:flex-row items-center justify-between">
        <div>
          <h3 className="text-xl font-semibold">Need a tech partner for a project?</h3>
          <p className="text-gray-600">Filter by expertise, budget and country to find the right company.</p>
        </div>
        <div className="mt-4 md:mt-0">
          <button className="px-5 py-3 bg-black text-white rounded">Find a Company</button>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-black text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <div className="font-bold">TUAN MarketPlace</div>
          <div className="text-sm text-gray-300 mt-2">A pan-African marketplace for technology, software and services.</div>
        </div>
        <div>
          <div className="font-semibold">Explore</div>
          <div className="text-sm text-gray-300 mt-2 space-y-1">
            <div>Companies</div>
            <div>Products</div>
            <div>Contracts</div>
          </div>
        </div>
        <div>
          <div className="font-semibold">Contact</div>
          <div className="text-sm text-gray-300 mt-2">hello@tuan.africa</div>
          <div className="text-sm text-gray-300"> Kampala, Uganda</div>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center text-sm py-4">© {new Date().getFullYear()} TUAN MarketPlace</div>
    </footer>
  );
}

export default function TUANMarketPlacePage() {
  const [showHostModal, setShowHostModal] = useState(false);

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header onHost={() => setShowHostModal(true)} />
      <main>
        <Hero onExplore={() => window.scrollTo({ top: 600, behavior: 'smooth' })} />
        <CategoryPills />

        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
          <CompaniesSection />
          <ProductsSection />
          <ContractFinder />
        </div>

      </main>

      <Footer />

      {/* Host modal - lightweight sketch */}
      {showHostModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h3 className="text-xl font-semibold">Host Your Store on TUAN MarketPlace</h3>
            <p className="text-gray-600 mt-2">Join as a verified tech company to list products, offer services and bid for contracts across Africa.</p>
            <div className="mt-4 space-y-3">
              <input className="w-full border rounded px-3 py-2" placeholder="Company name" />
              <input className="w-full border rounded px-3 py-2" placeholder="Country" />
              <textarea className="w-full border rounded px-3 py-2" placeholder="Short company bio" rows={3} />
            </div>
            <div className="mt-4 flex justify-end gap-3">
              <button className="px-4 py-2 border rounded" onClick={() => setShowHostModal(false)}>Cancel</button>
              <button className="px-4 py-2 bg-yellow-500 rounded" onClick={() => alert('Request submitted')}>Request to Host</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
