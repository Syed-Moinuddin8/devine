import React, { useState } from 'react';
import { Order, Product, Coupon } from '../types';
import { DollarSign, ShoppingBag, Percent, TrendingUp, RefreshCw, Plus, CheckCircle, Package } from 'lucide-react';
import { motion } from 'motion/react';

interface AdminDashboardProps {
  orders: Order[];
  products: Product[];
  onUpdateOrderStatus: (orderId: string, newStatus: string) => void;
  onReplenishStock: (productId: string, newStock: number) => void;
}

export default function AdminDashboard({
  orders,
  products,
  onUpdateOrderStatus,
  onReplenishStock
}: AdminDashboardProps) {
  
  // Local coupons list
  const [coupons, setCoupons] = useState<Coupon[]>([
    { code: 'DEVINE10', discount: 10, type: 'percent', description: '10% OFF on all streetwear' },
    { code: 'GOLDVIP', discount: 500, type: 'fixed', minSpend: 3000, description: 'Flat 500 off on orders above 3000' },
    { code: 'STREETFIRST', discount: 15, type: 'percent', description: '15% OFF first order' }
  ]);

  // Create Coupon states
  const [newCode, setNewCode] = useState('');
  const [newDiscount, setNewDiscount] = useState(10);
  const [newType, setNewType] = useState<'percent' | 'fixed'>('percent');
  const [newMinSpend, setNewMinSpend] = useState('');
  const [newDesc, setNewDesc] = useState('');

  // Local inventory replenishment state
  const [editProductStock, setEditProductStock] = useState<string | null>(null);
  const [stockInput, setStockInput] = useState('');

  // Totals calculations
  const totalSales = orders.reduce((acc, o) => o.status !== 'cancelled' ? acc + o.total : acc, 0);
  const fulfilledOrders = orders.filter(o => o.status === 'Delivered').length;

  const handleCreateCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCode) return;

    const coupon: Coupon = {
      code: newCode.toUpperCase().trim(),
      discount: Number(newDiscount),
      type: newType,
      minSpend: newMinSpend ? Number(newMinSpend) : undefined,
      description: newDesc || `${newDiscount}${newType === 'percent' ? '% OFF' : ' off'} promo code`
    };

    setCoupons([coupon, ...coupons]);
    setNewCode('');
    setNewDiscount(10);
    setNewMinSpend('');
    setNewDesc('');
  };

  const handleStockSave = (pId: string) => {
    const parsedStock = Number(stockInput);
    if (isNaN(parsedStock) || parsedStock < 0) return;

    onReplenishStock(pId, parsedStock);
    setEditProductStock(null);
  };

  return (
    <div className="bg-black py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-zinc-900 pb-6 gap-4">
          <div>
            <span className="font-sans text-[10px] font-bold tracking-[0.3em] text-brand-accent uppercase">
              SECURE ADMIN CONTROL DECK
            </span>
            <h2 className="font-heading text-4xl sm:text-5xl font-bold tracking-widest text-white uppercase mt-2">
              SYNDICATE CO-ENTHUSIAST METRICS
            </h2>
          </div>
          <p className="font-sans text-xs text-zinc-500 max-w-xs leading-relaxed">
            Live administrative controller for DEVINE BLY inventory and customer orders.
          </p>
        </div>

        {/* Analytics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'TOTAL SALES ACCRUED', val: `₹${totalSales.toLocaleString('en-IN')}`, icon: DollarSign, color: 'text-brand-accent' },
            { label: 'TOTAL ORDERS RECEIVED', val: orders.length, icon: ShoppingBag, color: 'text-white' },
            { label: 'ACTIVE CO-PROMOS', val: coupons.length, icon: Percent, color: 'text-brand-accent' },
            { label: 'CONVERSION VELOCITY', val: '4.85%', icon: TrendingUp, color: 'text-emerald-500' }
          ].map((card, i) => {
            const Icon = card.icon;
            return (
              <div key={i} className="bg-zinc-950 p-6 rounded-2xl border border-zinc-900 space-y-3 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[9px] font-bold tracking-widest text-zinc-500 uppercase">{card.label}</span>
                  <div className="rounded-lg bg-zinc-900 p-2 border border-zinc-800">
                    <Icon className="h-4 w-4 text-brand-accent" />
                  </div>
                </div>
                <h3 className={`font-heading text-3xl font-bold tracking-wider ${card.color}`}>{card.val}</h3>
              </div>
            );
          })}
        </div>

        {/* Two Columns Grid: Orders + Promo Builder */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Column 1 & 2: Orders fulfillment board */}
          <div className="lg:col-span-2 bg-zinc-950 rounded-2xl border border-zinc-900 p-6 space-y-6">
            <h3 className="font-heading text-xl sm:text-2xl tracking-widest text-white uppercase border-b border-zinc-900 pb-3">
              LIVE ORDER FULFILLMENT MATRIX
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs font-sans">
                <thead>
                  <tr className="border-b border-zinc-900 text-zinc-500 uppercase tracking-widest text-[9px] font-bold">
                    <th className="pb-3">ORDER ID</th>
                    <th className="pb-3">RECIPIENT</th>
                    <th className="pb-3">ITEMS</th>
                    <th className="pb-3">TOTAL</th>
                    <th className="pb-3">COURIER STATE</th>
                    <th className="pb-3 text-right">ACTION STATUS</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-900/60">
                  {orders.map((ord) => (
                    <tr key={ord.id} className="hover:bg-zinc-900/30 transition-colors">
                      <td className="py-4 font-bold text-white">{ord.id}</td>
                      <td className="py-4 text-zinc-300">
                        <p className="font-semibold text-white">{ord.shippingAddress.fullName}</p>
                        <p className="text-[10px] text-zinc-500">{ord.shippingAddress.phone}</p>
                      </td>
                      <td className="py-4 text-zinc-400">
                        {ord.items.map((it, idx) => (
                          <p key={idx} className="truncate max-w-[120px]">
                            {it.name} ({it.size} x{it.quantity})
                          </p>
                        ))}
                      </td>
                      <td className="py-4 font-bold text-white">₹{ord.total.toLocaleString('en-IN')}</td>
                      <td className="py-4">
                        <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                          ord.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500' :
                          ord.status === 'Shipped' ? 'bg-blue-500/10 text-blue-500 animate-pulse' :
                          ord.status === 'cancelled' ? 'bg-red-500/10 text-red-500' :
                          'bg-yellow-500/10 text-yellow-500 animate-pulse'
                        }`}>
                          {ord.status}
                        </span>
                      </td>
                      <td className="py-4 text-right">
                        <select
                          value={ord.status}
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                          className="rounded bg-black border border-zinc-800 text-zinc-300 text-[10px] py-1 px-2 focus:outline-none focus:border-brand-accent cursor-pointer"
                        >
                          <option value="Processing">Processing</option>
                          <option value="Shipped">Shipped</option>
                          <option value="Delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-10 text-zinc-500 uppercase">NO ACTIVE TRANSACTIONS IN STORE</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Column 3: Promo Codes builder */}
          <div className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 space-y-6">
            <h3 className="font-heading text-xl tracking-widest text-white uppercase border-b border-zinc-900 pb-3">
              PROMO CODE GENERATOR
            </h3>

            {/* Create form */}
            <form onSubmit={handleCreateCoupon} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Coupon Code</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. STREET40"
                    value={newCode}
                    onChange={(e) => setNewCode(e.target.value)}
                    className="w-full rounded bg-black border border-zinc-900 px-3 py-2 text-white uppercase focus:outline-none focus:border-brand-accent"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Promo Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as 'percent' | 'fixed')}
                    className="w-full rounded bg-black border border-zinc-900 px-3 py-2 text-white focus:outline-none"
                  >
                    <option value="percent">Percentage OFF</option>
                    <option value="fixed">Fixed ₹ Off</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Discount Value</label>
                  <input
                    type="number"
                    required
                    min={1}
                    value={newDiscount}
                    onChange={(e) => setNewDiscount(Number(e.target.value))}
                    className="w-full rounded bg-black border border-zinc-900 px-3 py-2 text-white focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Min spend (optional)</label>
                  <input
                    type="number"
                    placeholder="e.g. 2500"
                    value={newMinSpend}
                    onChange={(e) => setNewMinSpend(e.target.value)}
                    className="w-full rounded bg-black border border-zinc-900 px-3 py-2 text-white focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[9px] text-zinc-500 uppercase tracking-widest mb-1.5">Coupon Description</label>
                <input
                  type="text"
                  placeholder="e.g. 40% OFF first collection drop"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full rounded bg-black border border-zinc-900 px-3 py-2 text-white focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full font-button text-[10px] font-bold tracking-widest bg-brand-accent hover:bg-white text-black py-3 rounded-lg transition-all cursor-pointer uppercase flex items-center justify-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>GENERATE PROMO</span>
              </button>
            </form>

            {/* Coupons list */}
            <div className="space-y-3 pt-4 border-t border-zinc-900/60 max-h-56 overflow-y-auto pr-1">
              <h4 className="font-sans text-[10px] text-zinc-500 uppercase tracking-widest">ACTIVE COUPONS IN DATABASE:</h4>
              {coupons.map((c) => (
                <div key={c.code} className="flex justify-between items-center bg-black rounded-lg p-3 border border-zinc-900">
                  <div className="text-[11px] font-sans">
                    <p className="text-white font-bold uppercase">{c.code}</p>
                    <p className="text-[9px] text-zinc-500 mt-0.5">{c.description}</p>
                  </div>
                  <span className="font-heading text-lg text-brand-accent font-bold">
                    {c.type === 'percent' ? `${c.discount}%` : `₹${c.discount}`}
                  </span>
                </div>
              ))}
            </div>

          </div>

        </div>

        {/* INVENTORY CONTROL GRID */}
        <section className="bg-zinc-950 rounded-2xl border border-zinc-900 p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
            <h3 className="font-heading text-xl sm:text-2xl tracking-widest text-white uppercase flex items-center">
              <Package className="h-5 w-5 mr-2 text-brand-accent" />
              <span>STOCK CATALOG COUNTERS</span>
            </h3>
            <span className="text-[10px] text-zinc-500 uppercase font-sans">Total distinct SKUs: {products.length}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {products.map((p) => (
              <div key={p.id} className="flex items-center justify-between bg-black rounded-xl p-3 border border-zinc-900 text-xs font-sans">
                <div className="flex items-center space-x-2.5 min-w-0">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="h-10 w-8 object-cover rounded"
                  />
                  <div className="min-w-0">
                    <p className="text-white font-semibold truncate uppercase">{p.name}</p>
                    <p className="text-[9px] text-zinc-500 mt-0.5 uppercase">Price: ₹{p.price}</p>
                  </div>
                </div>

                <div className="text-right">
                  {editProductStock === p.id ? (
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="number"
                        min={0}
                        autoFocus
                        value={stockInput}
                        onChange={(e) => setStockInput(e.target.value)}
                        className="w-12 bg-zinc-900 text-white rounded px-1.5 py-1 text-center border border-brand-accent text-[10px]"
                      />
                      <button
                        onClick={() => handleStockSave(p.id)}
                        className="text-brand-accent font-bold hover:text-white"
                      >
                        <CheckCircle className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div 
                      onClick={() => {
                        setEditProductStock(p.id);
                        setStockInput(String(p.stock));
                      }}
                      className="cursor-pointer bg-zinc-900/60 hover:bg-zinc-900 border border-zinc-800 rounded px-2.5 py-1 text-center hover:border-brand-accent transition-colors"
                      title="Adjust Stock Count"
                    >
                      <span className={`font-bold ${p.stock < 15 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                        {p.stock}
                      </span>
                      <span className="text-[8px] text-zinc-500 block uppercase font-semibold">STOCK</span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
}
