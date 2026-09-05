// src/components/account/AccountView.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import { 
  User, 
  Package, 
  MapPin, 
  CreditCard, 
  Bell, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  ChevronRight, 
  ShieldCheck, 
  ExternalLink 
} from 'lucide-react';

export const AccountView = () => {
  const { 
    user, 
    orders, 
    savedAddresses, 
    addAddress, 
    deleteAddress, 
    formatPrice, 
    showToast 
  } = useStore();

  const [activeTab, setActiveTab] = useState('orders'); // 'orders' | 'addresses' | 'payments' | 'settings'
  const [selectedOrderForModal, setSelectedOrderForModal] = useState(null);

  // New address modal state
  const [isAddAddressOpen, setIsAddAddressOpen] = useState(false);
  const [newAddressForm, setNewAddressForm] = useState({
    fullName: '',
    address: '',
    city: '',
    state: 'Maharashtra',
    postalCode: '',
    country: 'India',
    phone: '',
    isDefault: false
  });

  const handleCreateAddress = (e) => {
    e.preventDefault();
    if (!newAddressForm.fullName || !newAddressForm.address) return;
    addAddress(newAddressForm);
    setIsAddAddressOpen(false);
    setNewAddressForm({
      fullName: '',
      address: '',
      city: '',
      state: 'Maharashtra',
      postalCode: '',
      country: 'India',
      phone: '',
      isDefault: false
    });
  };

  return (
    <div className="pt-28 pb-24 bg-brand-bg dark:bg-brand-bgDark min-h-screen text-brand-black dark:text-white">
      <div className="container-custom">
        {/* Account Banner Header */}
        <div className="bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-2xl p-6 sm:p-8 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-brand-red text-white flex items-center justify-center text-xl font-bold font-mono shadow-md">
              AK
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h1 className="font-syne text-2xl font-bold uppercase">{user.name}</h1>
                <span className="anarthak-tag text-[10px]">{user.tier}</span>
              </div>
              <p className="text-xs font-mono text-brand-grey">{user.email} • Member Since {user.memberSince} • {user.city}</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <div className="text-right hidden sm:block">
              <span className="text-brand-grey block">PRIVILEGE ALLOCATION:</span>
              <span className="text-brand-red font-bold">Tier 1 Drop Whitelist Active</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-brand-border dark:border-brand-borderDark mb-8 overflow-x-auto space-x-6 text-xs font-mono uppercase tracking-wider">
          {[
            { id: 'orders', label: `Orders (${orders.length})`, icon: Package },
            { id: 'addresses', label: `Saved Addresses (${savedAddresses.length})`, icon: MapPin },
            { id: 'payments', label: 'Payment Options', icon: CreditCard },
            { id: 'settings', label: 'VIP Preferences', icon: Bell }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-4 flex items-center gap-2 transition-colors cursor-pointer border-b-2 -mb-px shrink-0 ${
                  activeTab === tab.id
                    ? 'border-brand-red text-brand-red font-bold'
                    : 'border-transparent text-brand-grey hover:text-brand-black dark:hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* TAB 1: ORDERS & TRACKING */}
        {activeTab === 'orders' && (
          <div className="space-y-6 animate-fade-in">
            {orders.length === 0 ? (
              <div className="text-center py-16 bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-xl p-8 space-y-3">
                <p className="text-sm text-brand-grey">No previous orders on record.</p>
                <Link
                  to="/shop"
                  className="btn-anarthak-red inline-block text-xs py-2.5 px-6 uppercase font-mono font-bold"
                >
                  Explore Collection
                </Link>
              </div>
            ) : (
              orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-2xl p-6 transition-all hover:border-brand-grey space-y-6 shadow-sm"
                >
                  {/* Order Top Bar */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-brand-border dark:border-brand-borderDark text-xs font-mono">
                    <div className="flex items-center gap-4">
                      <div>
                        <span className="text-brand-grey block">ORDER ID</span>
                        <span className="font-bold text-sm">{order.id}</span>
                      </div>
                      <div>
                        <span className="text-brand-grey block">DATE PLACED</span>
                        <span className="text-brand-grey">{order.date}</span>
                      </div>
                      <div>
                        <span className="text-brand-grey block">TOTAL VALUATION</span>
                        <span className="text-brand-red font-bold">{formatPrice(order.total)}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className={`px-2.5 py-1 rounded text-[11px] font-bold ${
                        order.status === 'Delivered' 
                          ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                          : 'bg-brand-red/10 text-brand-red border border-brand-red/20'
                      }`}>
                        {order.status.toUpperCase()}
                      </span>
                      <button
                        onClick={() => setSelectedOrderForModal(order)}
                        className="px-3 py-1 bg-brand-bg dark:bg-zinc-800 border border-brand-border dark:border-brand-borderDark text-brand-black dark:text-zinc-300 rounded text-xs transition-colors cursor-pointer hover:border-brand-red"
                      >
                        Inspect Timeline
                      </button>
                    </div>
                  </div>

                  {/* Order Items */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3.5 p-3 rounded-lg bg-brand-bg dark:bg-brand-black border border-brand-border dark:border-brand-borderDark">
                        <img src={item.image} alt={item.name} className="w-14 h-16 rounded object-cover" />
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold truncate">{item.name}</h4>
                          <p className="text-[11px] font-mono text-brand-grey">
                            {item.color} • Size {item.size} • Qty {item.quantity}
                          </p>
                          <p className="text-xs font-mono font-bold text-brand-red mt-1">
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Tracking Snippet */}
                  <div className="pt-2 flex items-center justify-between text-xs font-mono text-brand-grey">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-red" />
                      Estimated Arrival: <strong className="text-brand-black dark:text-white">{order.estimatedDelivery}</strong>
                    </span>
                    <span>Carrier: {order.carrier}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* TAB 2: SAVED ADDRESSES */}
        {activeTab === 'addresses' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center">
              <h2 className="font-syne text-lg font-bold uppercase">Saved Indian Destinations</h2>
              <button
                onClick={() => setIsAddAddressOpen(true)}
                className="btn-anarthak-red text-xs py-2.5 px-4 flex items-center gap-1.5 cursor-pointer uppercase font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Address</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {savedAddresses.map((addr) => (
                <div
                  key={addr.id}
                  className="bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-2xl p-6 relative flex flex-col justify-between shadow-sm"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-bold text-sm">{addr.fullName}</h4>
                      {addr.isDefault && (
                        <span className="text-[10px] font-mono text-brand-red bg-brand-red/10 px-2 py-0.5 rounded border border-brand-red/20 font-bold">
                          PRIMARY
                        </span>
                      )}
                    </div>
                    <div className="text-xs font-mono text-brand-grey space-y-1">
                      <p>{addr.address}</p>
                      <p>{addr.city}, {addr.state} - {addr.postalCode}</p>
                      <p>{addr.country || 'India'}</p>
                      <p className="text-brand-black dark:text-zinc-200 font-bold pt-2">{addr.phone}</p>
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-brand-border dark:border-brand-borderDark flex justify-end">
                    <button
                      onClick={() => deleteAddress(addr.id)}
                      className="text-xs font-mono text-brand-grey hover:text-red-500 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal for adding address */}
            {isAddAddressOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="fixed inset-0 bg-black/70 backdrop-blur-sm" onClick={() => setIsAddAddressOpen(false)} />
                <div className="relative w-full max-w-lg bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-xl p-6 z-10 space-y-4 animate-fade-in shadow-2xl">
                  <h3 className="font-syne text-lg font-bold uppercase">Add Delivery Address</h3>
                  <form onSubmit={handleCreateAddress} className="space-y-3">
                    <div>
                      <label className="block text-xs font-mono text-brand-grey mb-1">Full Name</label>
                      <input
                        type="text"
                        value={newAddressForm.fullName}
                        onChange={(e) => setNewAddressForm({ ...newAddressForm, fullName: e.target.value })}
                        required
                        className="input-anarthak"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-brand-grey mb-1">Street Address</label>
                      <input
                        type="text"
                        value={newAddressForm.address}
                        onChange={(e) => setNewAddressForm({ ...newAddressForm, address: e.target.value })}
                        required
                        className="input-anarthak"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-mono text-brand-grey mb-1">City</label>
                        <input
                          type="text"
                          value={newAddressForm.city}
                          onChange={(e) => setNewAddressForm({ ...newAddressForm, city: e.target.value })}
                          required
                          className="input-anarthak"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-brand-grey mb-1">PIN Code (6-Digit)</label>
                        <input
                          type="text"
                          maxLength={6}
                          value={newAddressForm.postalCode}
                          onChange={(e) => setNewAddressForm({ ...newAddressForm, postalCode: e.target.value })}
                          required
                          className="input-anarthak font-mono"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-brand-grey mb-1">Indian Mobile (+91)</label>
                      <input
                        type="tel"
                        value={newAddressForm.phone}
                        onChange={(e) => setNewAddressForm({ ...newAddressForm, phone: e.target.value })}
                        className="input-anarthak"
                      />
                    </div>
                    <div className="flex justify-end gap-3 pt-3">
                      <button
                        type="button"
                        onClick={() => setIsAddAddressOpen(false)}
                        className="btn-anarthak-dark text-xs py-2 px-4 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-anarthak-red text-xs py-2 px-5 cursor-pointer uppercase font-bold"
                      >
                        Save Address
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: PAYMENT METHODS */}
        {activeTab === 'payments' && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <h2 className="font-syne text-lg font-bold uppercase">Stored Payment Handles</h2>
            <div className="p-6 rounded-2xl bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark space-y-4 shadow-sm">
              <div className="flex items-center justify-between pb-4 border-b border-brand-border dark:border-brand-borderDark">
                <div className="flex items-center gap-3">
                  <CreditCard className="w-6 h-6 text-brand-red" />
                  <div>
                    <h4 className="text-xs font-bold">RuPay Platinum Debit Card •••• 8819</h4>
                    <p className="text-[11px] font-mono text-brand-grey">Expires 09/29 • Verified Indian Card</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 font-bold">
                  VERIFIED
                </span>
              </div>
              <p className="text-xs text-brand-grey leading-relaxed font-light">
                Encrypted with 256-Bit SSL NPCI standards. Ready for instantaneous 1-click checkout across all upcoming Anarthak drops.
              </p>
            </div>
          </div>
        )}

        {/* TAB 4: PREFERENCES & VIP TIER */}
        {activeTab === 'settings' && (
          <div className="space-y-6 animate-fade-in max-w-2xl">
            <h2 className="font-syne text-lg font-bold uppercase">Patron Preferences</h2>
            <div className="bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-2xl p-6 space-y-4 text-xs font-mono shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-brand-border dark:border-brand-borderDark">
                <div>
                  <h4 className="font-bold">Early Drop Access Alerts</h4>
                  <p className="text-brand-grey text-[11px]">Receive WhatsApp / SMS secret drop code 1 hour before general release</p>
                </div>
                <span className="text-brand-red font-bold">ACTIVE</span>
              </div>

              <div className="flex items-center justify-between pb-3 border-b border-brand-border dark:border-brand-borderDark">
                <div>
                  <h4 className="font-bold">Heavyweight Fit Preference</h4>
                  <p className="text-brand-grey text-[11px]">Auto-selects size L for boxy drop silhouette</p>
                </div>
                <span className="font-bold">SIZE L</span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-bold">Packaging Style</h4>
                  <p className="text-brand-grey text-[11px]">Signature Anarthak Matte Black & Red Archive Box</p>
                </div>
                <span className="font-bold">ANARTHAK LUXURY</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Order Timeline Modal */}
      {selectedOrderForModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md" onClick={() => setSelectedOrderForModal(null)} />
          <div className="relative w-full max-w-xl bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-2xl p-6 z-10 space-y-6 animate-fade-in shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-brand-border dark:border-brand-borderDark">
              <div>
                <h3 className="font-syne text-lg font-bold uppercase">Order {selectedOrderForModal.id} Timeline</h3>
                <p className="text-xs font-mono text-brand-grey">Carrier: {selectedOrderForModal.carrier}</p>
              </div>
              <button onClick={() => setSelectedOrderForModal(null)} className="text-brand-grey hover:text-brand-black dark:hover:text-white cursor-pointer">
                ✕
              </button>
            </div>

            <div className="space-y-4">
              {selectedOrderForModal.timeline.map((step, idx) => (
                <div key={idx} className="flex items-start gap-3.5">
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold shrink-0 mt-0.5 ${
                    step.completed ? 'bg-brand-red text-white' : 'bg-brand-border dark:bg-zinc-800 text-brand-grey'
                  }`}>
                    {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold">{step.step}</h4>
                    <p className="text-[11px] font-mono text-brand-grey">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-brand-border dark:border-brand-borderDark flex justify-end">
              <button onClick={() => setSelectedOrderForModal(null)} className="btn-anarthak-red text-xs py-2 px-6 uppercase font-bold cursor-pointer">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
