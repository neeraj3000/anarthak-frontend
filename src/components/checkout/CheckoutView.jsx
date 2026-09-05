// src/components/checkout/CheckoutView.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../context/StoreContext';
import confetti from 'canvas-confetti';
import { 
  Check, 
  ShieldCheck, 
  Truck, 
  CreditCard, 
  Lock, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Sparkles,
  Smartphone,
  Building2,
  Banknote,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';

const INDIAN_STATES = [
  'Maharashtra', 'Delhi NCR', 'Karnataka', 'Tamil Nadu', 
  'Telangana', 'Gujarat', 'Uttar Pradesh', 'West Bengal', 
  'Rajasthan', 'Punjab', 'Kerala', 'Madhya Pradesh', 'Haryana'
];

export const CheckoutView = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    cartSubtotal, 
    cartDiscount, 
    estimatedTax, 
    savedAddresses, 
    placeOrder, 
    formatPrice, 
    activePromo 
  } = useStore();

  const [currentStep, setCurrentStep] = useState(1); // 1: Delivery, 2: Shipping, 3: Payment, 4: Review

  // Address Form State
  const [selectedAddressId, setSelectedAddressId] = useState(savedAddresses[0]?.id || 'custom');
  const [addressForm, setAddressForm] = useState({
    fullName: 'Aditya Kashyap',
    email: 'aditya.k@anarthak.in',
    phone: '+91 98201 44589',
    address: 'Flat 402, Sea Face Enclave, Bandra West',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
    country: 'India'
  });

  // Shipping Method
  const shippingOptions = [
    {
      id: 'ship-bluedart',
      name: 'Bluedart Surface & Air Express',
      duration: '3-4 Business Days across India',
      price: cartSubtotal >= 1999 ? 0 : 99,
      carrier: 'Bluedart Express'
    },
    {
      id: 'ship-delhivery',
      name: 'Delhivery Priority Air',
      duration: '2-3 Business Days guaranteed',
      price: 149,
      carrier: 'Delhivery Express'
    },
    {
      id: 'ship-sameday',
      name: 'Anarthak Metro Same-Day VIP Delivery',
      duration: 'Delivered by 9 PM (Mumbai, Delhi NCR, Bengaluru)',
      price: 249,
      carrier: 'Anarthak Dedicated Fleet'
    }
  ];
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

  // Payment Method
  const [paymentType, setPaymentType] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [upiMethod, setUpiMethod] = useState('gpay'); // 'gpay' | 'phonepe' | 'paytm' | 'vpa'
  const [upiId, setUpiId] = useState('aditya@oksbi');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [codOtp, setCodOtp] = useState('');
  const [codVerified, setCodVerified] = useState(false);

  const [cardData, setCardData] = useState({
    number: '6074 •••• •••• 8819',
    name: 'ADITYA KASHYAP',
    expiry: '09/29',
    cvv: '921'
  });

  // Autofill Demo Address Button
  const handleAutofillDemo = () => {
    setAddressForm({
      fullName: 'Vikramaditya Rao',
      email: 'vikram.rao@anarthak.in',
      phone: '+91 99800 23411',
      address: '742, 12th Main, HAL 2nd Stage, Indiranagar',
      city: 'Bengaluru',
      state: 'Karnataka',
      postalCode: '560038',
      country: 'India'
    });
    setSelectedAddressId('custom');
  };

  const handlePlaceOrder = () => {
    try {
      confetti({
        particleCount: 110,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF1E27', '#FFFFFF', '#27272A']
      });
    } catch {
      // ignore
    }

    const orderPayload = {
      shippingAddress: selectedAddressId === 'custom' 
        ? addressForm 
        : (savedAddresses.find(a => a.id === selectedAddressId) || addressForm),
      shippingMethod: selectedShipping,
      paymentMethod: {
        type: paymentType === 'upi' ? `UPI (${upiMethod.toUpperCase()})` :
              paymentType === 'card' ? 'RuPay / Indian Card' :
              paymentType === 'netbanking' ? `Netbanking (${selectedBank})` : 'Cash on Delivery (COD)',
        last4: paymentType === 'card' ? '8819' : paymentType === 'upi' ? upiId : 'Verified',
        brand: paymentType === 'card' ? 'RuPay Platinum' : 'Indian Gateway'
      }
    };

    placeOrder(orderPayload);
    navigate('/order-confirmation');
  };

  const finalTotal = Math.max(0, cartSubtotal - cartDiscount + selectedShipping.price + estimatedTax + (paymentType === 'cod' ? 49 : 0));

  if (cart.length === 0) {
    return (
      <div className="pt-36 pb-24 text-center container-custom">
        <div className="max-w-md mx-auto bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark p-8 rounded-2xl space-y-4">
          <h2 className="font-syne text-2xl font-bold text-brand-black dark:text-white uppercase">Your Bag is Empty</h2>
          <p className="text-xs text-brand-grey dark:text-brand-muted">Please add our Tirupur heavyweight pieces to your bag prior to checkout.</p>
          <button
            onClick={() => navigate('/shop')}
            className="btn-anarthak-red text-xs py-3 px-6 uppercase font-mono font-bold cursor-pointer"
          >
            Explore Catalog
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 bg-brand-bg dark:bg-brand-bgDark min-h-screen">
      <div className="container-custom">
        {/* Step Indicator Stepper */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-0.5 bg-brand-border dark:bg-brand-borderDark -z-0" />
            
            {[
              { step: 1, label: 'Address', fullLabel: 'Indian Address' },
              { step: 2, label: 'Courier', fullLabel: 'Courier Logistics' },
              { step: 3, label: 'Payment', fullLabel: 'Payment (UPI/RuPay)' },
              { step: 4, label: 'Review', fullLabel: 'Review & Confirm' }
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center relative z-10">
                <button
                  onClick={() => {
                    if (s.step < currentStep) setCurrentStep(s.step);
                  }}
                  className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                    currentStep === s.step
                      ? 'bg-brand-red text-white ring-4 ring-brand-red/30'
                      : currentStep > s.step
                      ? 'bg-brand-black dark:bg-white text-white dark:text-brand-black'
                      : 'bg-brand-surface dark:bg-brand-surfaceDark text-brand-grey border border-brand-border dark:border-brand-borderDark'
                  }`}
                >
                  {currentStep > s.step ? <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4" /> : s.step}
                </button>
                <span className={`text-[10px] sm:text-[11px] font-mono mt-1 sm:mt-1.5 uppercase tracking-wider text-center ${
                  currentStep === s.step ? 'text-brand-red font-bold' : 'text-brand-grey'
                }`}>
                  <span className="inline sm:hidden">{s.label}</span>
                  <span className="hidden sm:inline">{s.fullLabel}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Steps Interactive Form Left (7 cols) */}
          <div className="lg:col-span-7 bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-2xl p-6 sm:p-8 space-y-6">
            
            {/* STEP 1: DELIVERY ADDRESS */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="flex items-center justify-between pb-4 border-b border-brand-border dark:border-brand-borderDark">
                  <div>
                    <h2 className="font-syne text-xl font-bold text-brand-black dark:text-white uppercase">
                      01. Indian Delivery Address
                    </h2>
                    <p className="text-xs text-brand-grey dark:text-brand-muted font-mono">Select a saved metro address or enter delivery location</p>
                  </div>
                  <button
                    onClick={handleAutofillDemo}
                    className="text-xs font-mono text-brand-red hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Autofill Bengaluru</span>
                  </button>
                </div>

                {/* Saved addresses selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {savedAddresses.map((addr) => (
                    <div
                      key={addr.id}
                      onClick={() => {
                        setSelectedAddressId(addr.id);
                        setAddressForm({ ...addr, country: 'India' });
                      }}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ${
                        selectedAddressId === addr.id
                          ? 'bg-brand-red/5 border-brand-red ring-1 ring-brand-red'
                          : 'bg-brand-bg dark:bg-brand-surfaceDark border-brand-border dark:border-brand-borderDark hover:border-brand-grey'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-brand-black dark:text-white">{addr.fullName}</span>
                        {addr.isDefault && (
                          <span className="text-[9px] font-mono text-brand-red bg-brand-red/10 px-1.5 py-0.5 rounded font-bold">
                            PRIMARY
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-brand-grey dark:text-brand-muted">{addr.address}</p>
                      <p className="text-xs text-brand-grey dark:text-brand-muted">{addr.city}, {addr.state} - {addr.postalCode}</p>
                      <p className="text-[11px] font-mono text-brand-black dark:text-zinc-400 mt-1">{addr.phone}</p>
                    </div>
                  ))}
                </div>

                {/* Full Form */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-brand-border dark:border-brand-borderDark">
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-brand-grey dark:text-brand-muted mb-1">Recipient Full Name</label>
                    <input
                      type="text"
                      value={addressForm.fullName}
                      onChange={(e) => setAddressForm({ ...addressForm, fullName: e.target.value })}
                      className="input-anarthak"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-brand-grey dark:text-brand-muted mb-1">Email Address</label>
                    <input
                      type="email"
                      value={addressForm.email}
                      onChange={(e) => setAddressForm({ ...addressForm, email: e.target.value })}
                      className="input-anarthak"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-brand-grey dark:text-brand-muted mb-1">Indian Mobile (+91)</label>
                    <input
                      type="tel"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="input-anarthak"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-mono text-brand-grey dark:text-brand-muted mb-1">Flat / Building / Street Address</label>
                    <input
                      type="text"
                      value={addressForm.address}
                      onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                      className="input-anarthak"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-brand-grey dark:text-brand-muted mb-1">City</label>
                    <input
                      type="text"
                      value={addressForm.city}
                      onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                      className="input-anarthak"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-brand-grey dark:text-brand-muted mb-1">State / Union Territory</label>
                    <select
                      value={addressForm.state}
                      onChange={(e) => setAddressForm({ ...addressForm, state: e.target.value })}
                      className="input-anarthak"
                    >
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-brand-grey dark:text-brand-muted mb-1">6-Digit PIN Code</label>
                    <input
                      type="text"
                      maxLength={6}
                      value={addressForm.postalCode}
                      onChange={(e) => setAddressForm({ ...addressForm, postalCode: e.target.value })}
                      className="input-anarthak font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-brand-grey dark:text-brand-muted mb-1">Country</label>
                    <input
                      type="text"
                      disabled
                      value="India (भारत)"
                      className="input-anarthak bg-brand-border/20 text-brand-grey cursor-not-allowed"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="btn-anarthak-red py-3.5 px-8 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <span>Continue to Shipping</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: SHIPPING LOGISTICS */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="pb-4 border-b border-brand-border dark:border-brand-borderDark">
                  <h2 className="font-syne text-xl font-bold text-brand-black dark:text-white uppercase">
                    02. Indian Logistics & Couriers
                  </h2>
                  <p className="text-xs text-brand-grey dark:text-brand-muted font-mono">Dispatched from our Tirupur fulfillment warehouse</p>
                </div>

                <div className="space-y-3">
                  {shippingOptions.map((opt) => (
                    <div
                      key={opt.id}
                      onClick={() => setSelectedShipping(opt)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                        selectedShipping.id === opt.id
                          ? 'bg-brand-red/5 border-brand-red ring-1 ring-brand-red'
                          : 'bg-brand-bg dark:bg-brand-surfaceDark border-brand-border dark:border-brand-borderDark hover:border-brand-grey'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Truck className="w-5 h-5 text-brand-red" />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-brand-black dark:text-white">{opt.name}</span>
                            <span className="text-[10px] font-mono text-brand-grey">({opt.carrier})</span>
                          </div>
                          <p className="text-xs text-brand-grey dark:text-brand-muted font-mono">{opt.duration}</p>
                        </div>
                      </div>

                      <span className="text-sm font-bold font-mono text-brand-black dark:text-white">
                        {opt.price === 0 ? (
                          <span className="text-emerald-500 font-bold">COMPLIMENTARY</span>
                        ) : (
                          formatPrice(opt.price)
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-brand-border dark:border-brand-borderDark">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="text-xs font-mono text-brand-grey hover:text-brand-black dark:hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Address</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(3)}
                    className="btn-anarthak-red py-3.5 px-8 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Indian Payment</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: INDIAN PAYMENT SIMULATION */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="pb-4 border-b border-brand-border dark:border-brand-borderDark">
                  <div className="flex items-center justify-between">
                    <h2 className="font-syne text-xl font-bold text-brand-black dark:text-white uppercase">
                      03. Indian Payment Gateway
                    </h2>
                    <span className="text-[10px] font-mono text-brand-red bg-brand-red/10 px-2 py-0.5 rounded border border-brand-red/20 font-bold">
                      DEMO SANDBOX
                    </span>
                  </div>
                  <p className="text-xs text-brand-grey dark:text-brand-muted font-mono">
                    All Indian payment options supported (UPI, RuPay, Netbanking, COD)
                  </p>
                </div>

                {/* Tab Switcher: UPI, RuPay Card, Netbanking, COD */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {[
                    { id: 'upi', label: 'UPI (GPay/PhonePe)', icon: Smartphone },
                    { id: 'card', label: 'RuPay / Cards', icon: CreditCard },
                    { id: 'netbanking', label: 'Netbanking', icon: Building2 },
                    { id: 'cod', label: 'Cash on Delivery', icon: Banknote }
                  ].map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setPaymentType(tab.id)}
                        className={`py-3 px-2 rounded-lg border text-center transition-all flex flex-col items-center gap-1.5 cursor-pointer ${
                          paymentType === tab.id
                            ? 'bg-brand-red/10 border-brand-red text-brand-red font-bold'
                            : 'bg-brand-bg dark:bg-brand-surfaceDark border-brand-border dark:border-brand-borderDark text-brand-grey hover:text-brand-black dark:hover:text-white'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        <span className="text-[11px] font-mono font-semibold">{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* 1. UPI Payment */}
                {paymentType === 'upi' && (
                  <div className="space-y-4 pt-2">
                    <div className="grid grid-cols-4 gap-2">
                      {[
                        { id: 'gpay', name: 'Google Pay' },
                        { id: 'phonepe', name: 'PhonePe' },
                        { id: 'paytm', name: 'Paytm' },
                        { id: 'vpa', name: 'Custom UPI' }
                      ].map((app) => (
                        <button
                          key={app.id}
                          onClick={() => setUpiMethod(app.id)}
                          className={`p-3 rounded-lg border text-xs font-mono text-center cursor-pointer transition-all ${
                            upiMethod === app.id
                              ? 'border-brand-red bg-brand-red/10 text-brand-red font-bold'
                              : 'border-brand-border dark:border-brand-borderDark text-brand-grey hover:border-brand-grey'
                          }`}
                        >
                          {app.name}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-brand-grey dark:text-brand-muted mb-1">
                        Enter UPI Virtual Payment Address (VPA)
                      </label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@okaxis or yourname@ibl"
                        className="input-anarthak font-mono"
                      />
                      <p className="text-[11px] text-emerald-500 font-mono mt-1 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        UPI handle verified via NPCI Bharat Interface
                      </p>
                    </div>
                  </div>
                )}

                {/* 2. RuPay / Indian Cards */}
                {paymentType === 'card' && (
                  <div className="space-y-4 pt-2">
                    {/* Visual Card Preview */}
                    <div className="p-5 rounded-xl bg-gradient-to-tr from-brand-black via-zinc-900 to-zinc-800 border border-brand-borderDark shadow-xl max-w-sm mx-auto text-white font-mono space-y-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-brand-red font-bold tracking-widest">ANARTHAK PATRON</span>
                        <span className="text-[10px] font-bold text-white bg-brand-red px-1.5 py-0.5 rounded">RUPAY PLATINUM</span>
                      </div>
                      <div className="text-base tracking-widest pt-2">
                        {cardData.number}
                      </div>
                      <div className="flex justify-between items-end text-[11px] text-zinc-400 pt-1">
                        <div>
                          <span className="block text-[8px] uppercase">Cardholder</span>
                          <span className="text-white font-bold">{cardData.name}</span>
                        </div>
                        <div>
                          <span className="block text-[8px] uppercase">Expires</span>
                          <span className="text-white font-bold">{cardData.expiry}</span>
                        </div>
                      </div>
                    </div>

                    {/* Inputs */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="col-span-2">
                        <label className="block text-xs font-mono text-brand-grey dark:text-brand-muted mb-1">Card Number</label>
                        <input
                          type="text"
                          value={cardData.number}
                          onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                          className="input-anarthak font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-brand-grey dark:text-brand-muted mb-1">Expiry (MM/YY)</label>
                        <input
                          type="text"
                          value={cardData.expiry}
                          onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                          className="input-anarthak font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-brand-grey dark:text-brand-muted mb-1">Security CVV</label>
                        <input
                          type="password"
                          value={cardData.cvv}
                          onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                          className="input-anarthak font-mono"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. Netbanking */}
                {paymentType === 'netbanking' && (
                  <div className="space-y-4 pt-2">
                    <p className="text-xs font-mono text-brand-grey">Select your Indian Bank:</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                      {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank', 'Kotak Mahindra', 'Punjab National Bank'].map((bank) => (
                        <button
                          key={bank}
                          onClick={() => setSelectedBank(bank)}
                          className={`p-3 rounded-lg border text-xs font-mono text-left cursor-pointer transition-all ${
                            selectedBank === bank
                              ? 'border-brand-red bg-brand-red/10 text-brand-red font-bold'
                              : 'border-brand-border dark:border-brand-borderDark text-brand-grey hover:border-brand-grey'
                          }`}
                        >
                          {bank}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Cash on Delivery (COD) */}
                {paymentType === 'cod' && (
                  <div className="p-5 rounded-xl border border-brand-border dark:border-brand-borderDark bg-brand-bg dark:bg-brand-surfaceDark space-y-3">
                    <div className="flex items-center gap-2 text-brand-red text-xs font-bold font-mono">
                      <AlertCircle className="w-4 h-4" />
                      <span>COD VERIFICATION REQUIRED</span>
                    </div>
                    <p className="text-xs text-brand-grey dark:text-brand-muted">
                      A nominal ₹49 handling fee applies to Cash on Delivery orders to curb bogus logistics bookings.
                    </p>

                    <div className="pt-2">
                      <label className="block text-xs font-mono text-brand-grey mb-1">
                        Enter 4-Digit Mobile Confirmation OTP (Simulated: 4402)
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          maxLength={4}
                          value={codOtp}
                          onChange={(e) => {
                            setCodOtp(e.target.value);
                            if (e.target.value === '4402') setCodVerified(true);
                          }}
                          placeholder="4402"
                          className="input-anarthak font-mono max-w-[140px]"
                        />
                        <button
                          onClick={() => {
                            setCodOtp('4402');
                            setCodVerified(true);
                          }}
                          className="px-4 py-2 bg-brand-black dark:bg-white text-white dark:text-brand-black text-xs font-mono rounded cursor-pointer"
                        >
                          Autofill OTP
                        </button>
                      </div>
                      {codVerified && (
                        <p className="text-[11px] font-mono text-emerald-500 mt-1">✓ Mobile OTP Verified Successfully</p>
                      )}
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between pt-4 border-t border-brand-border dark:border-brand-borderDark">
                  <button
                    onClick={() => setCurrentStep(2)}
                    className="text-xs font-mono text-brand-grey hover:text-brand-black dark:hover:text-white flex items-center gap-1.5 cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Back to Courier</span>
                  </button>

                  <button
                    onClick={() => setCurrentStep(4)}
                    className="btn-anarthak-red py-3.5 px-8 text-xs font-bold uppercase tracking-wider flex items-center gap-2 cursor-pointer"
                  >
                    <span>Review Order</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: FINAL ORDER REVIEW */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="pb-4 border-b border-brand-border dark:border-brand-borderDark">
                  <h2 className="font-syne text-xl font-bold text-brand-black dark:text-white uppercase">
                    04. Order Verification & Placement
                  </h2>
                  <p className="text-xs text-brand-grey dark:text-brand-muted font-mono">
                    Verify destination and heavyweight Tirupur allocation
                  </p>
                </div>

                {/* Summary Info Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                  <div className="p-4 rounded-xl bg-brand-bg dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark space-y-1">
                    <div className="flex justify-between text-brand-grey mb-1">
                      <span>DELIVERY DESTINATION</span>
                      <button onClick={() => setCurrentStep(1)} className="text-brand-red hover:underline cursor-pointer">Edit</button>
                    </div>
                    <p className="font-bold text-brand-black dark:text-white">{addressForm.fullName}</p>
                    <p className="text-brand-grey">{addressForm.address}</p>
                    <p className="text-brand-grey">{addressForm.city}, {addressForm.state} - {addressForm.postalCode}</p>
                    <p className="text-brand-black dark:text-zinc-300 font-bold">{addressForm.phone}</p>
                  </div>

                  <div className="p-4 rounded-xl bg-brand-bg dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark space-y-1">
                    <div className="flex justify-between text-brand-grey mb-1">
                      <span>LOGISTICS & PAYMENT</span>
                      <button onClick={() => setCurrentStep(3)} className="text-brand-red hover:underline cursor-pointer">Edit</button>
                    </div>
                    <p className="font-bold text-brand-black dark:text-white">{selectedShipping.name}</p>
                    <p className="text-brand-grey">{paymentType.toUpperCase()} Gateway</p>
                    <p className="text-emerald-500 font-bold">Encrypted 256-Bit SSL Active</p>
                  </div>
                </div>

                {/* Line Items List */}
                <div className="space-y-3 pt-2">
                  <span className="text-xs font-mono text-brand-grey uppercase tracking-wider block">
                    Garments in Bag ({cart.length})
                  </span>
                  {cart.map((item) => (
                    <div key={item.id} className="p-3 bg-brand-bg dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-lg flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.name} className="w-12 h-14 rounded object-cover" />
                        <div>
                          <h4 className="text-xs font-bold text-brand-black dark:text-white">{item.name}</h4>
                          <p className="text-[11px] font-mono text-brand-grey">
                            {item.color} • Size {item.size} • Qty {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold text-brand-black dark:text-white">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Place Order CTA */}
                <div className="pt-4 border-t border-brand-border dark:border-brand-borderDark space-y-3">
                  <button
                    onClick={handlePlaceOrder}
                    className="btn-anarthak-red w-full py-4 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                  >
                    <Lock className="w-4 h-4" />
                    <span>CONFIRM & PLACE ORDER — {formatPrice(finalTotal)}</span>
                  </button>
                  <p className="text-[10px] font-mono text-brand-grey text-center">
                    By placing your order you agree to Anarthak's 7-Day Hassle-Free Exchange Policy across all Indian pin codes.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Sticky Order Valuation Right (5 cols) */}
          <div className="lg:col-span-5 bg-brand-surface dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark rounded-2xl p-6 sm:p-8 space-y-6 sticky top-28">
            <h3 className="font-syne text-lg font-bold text-brand-black dark:text-white uppercase pb-4 border-b border-brand-border dark:border-brand-borderDark">
              Order Valuation
            </h3>

            {/* Price Calculations */}
            <div className="space-y-3 text-xs font-mono text-brand-grey">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="text-brand-black dark:text-white font-bold">{formatPrice(cartSubtotal)}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-brand-red font-bold">
                  <span>Promo Discount ({activePromo?.code})</span>
                  <span>-{formatPrice(cartDiscount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Indian Courier Shipping</span>
                <span className="text-brand-black dark:text-white">
                  {selectedShipping.price === 0 ? (
                    <span className="text-emerald-500 font-bold">COMPLIMENTARY</span>
                  ) : (
                    formatPrice(selectedShipping.price)
                  )}
                </span>
              </div>

              {paymentType === 'cod' && (
                <div className="flex justify-between text-brand-grey">
                  <span>COD Logistics Fee</span>
                  <span className="text-brand-black dark:text-white font-bold">₹49</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Integrated GST (12% Included)</span>
                <span className="text-brand-black dark:text-white">{formatPrice(estimatedTax)}</span>
              </div>

              <div className="pt-4 border-t border-brand-border dark:border-brand-borderDark flex justify-between items-baseline text-brand-black dark:text-white">
                <div>
                  <span className="font-syne text-base font-bold block uppercase">FINAL TOTAL</span>
                  <span className="text-[10px] text-brand-grey font-mono">Includes all Indian taxes</span>
                </div>
                <span className="text-2xl font-bold font-mono text-brand-red">
                  {formatPrice(finalTotal)}
                </span>
              </div>
            </div>

            {/* Anarthak Quality Promise */}
            <div className="p-4 rounded-xl bg-brand-bg dark:bg-brand-surfaceDark border border-brand-border dark:border-brand-borderDark space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-brand-red">
                <ShieldCheck className="w-4 h-4" />
                <span className="font-bold uppercase tracking-wider">ANARTHAK TIRUPUR GUARANTEE</span>
              </div>
              <p className="text-[11px] text-brand-grey leading-relaxed">
                Made with 100% comb-spun combed cotton from Tamil Nadu mills. Anti-bacon 2x2 ribbed neck band. Guaranteed zero collar droop after 50 washes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
