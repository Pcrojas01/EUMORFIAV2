import React, { useState } from 'react';
import { ArrowLeft, CreditCard, Smartphone, Building2, DollarSign, Check, Loader2 } from 'lucide-react';
import { CartItem } from '../../types';

interface CheckoutViewProps {
  cart: CartItem[];
  total: number;
  onBack: () => void;
  onPaymentComplete: () => void;
}

type PaymentMethod = 'card' | 'nequi' | 'paypal' | 'pse';
type CheckoutStep = 'method' | 'details' | 'processing' | 'success';

const CheckoutView: React.FC<CheckoutViewProps> = ({ cart, total, onBack, onPaymentComplete }) => {
  const [currentStep, setCurrentStep] = useState<CheckoutStep>('method');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);

  // Form states
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    department: ''
  });

  const [cardInfo, setCardInfo] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const [pseInfo, setPseInfo] = useState({
    bank: '',
    documentType: 'CC',
    documentNumber: '',
    email: ''
  });

  const [nequiInfo, setNequiInfo] = useState({
    phone: '',
    pin: ''
  });

  const [paypalInfo, setPaypalInfo] = useState({
    email: '',
    password: ''
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handlePayment = async () => {
    setIsProcessing(true);
    setCurrentStep('processing');

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));

    setCurrentStep('success');
    setIsProcessing(false);
    
    // Complete payment after showing success
    setTimeout(() => {
      onPaymentComplete();
    }, 3000);
  };

  const banks = [
    'Bancolombia',
    'Banco de Bogotá',
    'Davivienda',
    'BBVA Colombia',
    'Banco Popular',
    'Banco Caja Social',
    'Banco AV Villas',
    'Banco Falabella',
    'Scotiabank Colpatria'
  ];

  const paymentMethods = [
    {
      id: 'card' as PaymentMethod,
      name: 'Tarjeta',
      description: 'Débito/Crédito',
      icon: <CreditCard className="w-8 h-8" />,
      color: 'blue'
    },
    {
      id: 'nequi' as PaymentMethod,
      name: 'Nequi',
      description: 'Pago móvil',
      icon: <Smartphone className="w-8 h-8" />,
      color: 'purple'
    },
    {
      id: 'paypal' as PaymentMethod,
      name: 'PayPal',
      description: 'Pago seguro',
      icon: <DollarSign className="w-8 h-8" />,
      color: 'yellow'
    },
    {
      id: 'pse' as PaymentMethod,
      name: 'PSE',
      description: 'Débito a cuenta',
      icon: <Building2 className="w-8 h-8" />,
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={onBack}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors duration-300"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {currentStep === 'method' && 'Método de Pago'}
              {currentStep === 'details' && 'Información de Pago'}
              {currentStep === 'processing' && 'Procesando Pago'}
              {currentStep === 'success' && '¡Pago Exitoso!'}
            </h1>
            <p className="text-gray-600">Completa tu compra de forma segura</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-8">
              <h3 className="font-semibold text-gray-800 mb-4">Resumen del Pedido</h3>
              <div className="space-y-3 mb-4">
                {cart.map((item) => (
                  <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800">{item.name}</h4>
                      <p className="text-xs text-gray-500">
                        {item.selectedSize} • {item.selectedColor} • Qty: {item.quantity}
                      </p>
                      <p className="text-sm font-semibold text-red-600">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-semibold">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Envío:</span>
                  <span className="font-semibold text-green-600">Gratis</span>
                </div>
                <div className="border-t pt-2 flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span className="text-red-600">{formatPrice(total)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Payment Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {/* Payment Method Selection */}
              {currentStep === 'method' && (
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Selecciona tu método de pago</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paymentMethods.map((method) => (
                      <button
                        key={method.id}
                        onClick={() => setSelectedMethod(method.id)}
                        className={`p-6 border-2 rounded-xl transition-all duration-300 text-left ${
                          selectedMethod === method.id
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-red-300'
                        }`}
                      >
                        <div className={`text-${method.color}-500 mb-3`}>
                          {method.icon}
                        </div>
                        <div className="font-semibold text-gray-800">{method.name}</div>
                        <div className="text-sm text-gray-600">{method.description}</div>
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentStep('details')}
                    className="w-full mt-8 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300"
                  >
                    Continuar
                  </button>
                </div>
              )}

              {/* Payment Details */}
              {currentStep === 'details' && (
                <div className="space-y-6">
                  {/* Customer Information */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Personal</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Nombre completo"
                        value={customerInfo.name}
                        onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                        className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                      <input
                        type="email"
                        placeholder="Correo electrónico"
                        value={customerInfo.email}
                        onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                        className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                      <input
                        type="tel"
                        placeholder="Teléfono"
                        value={customerInfo.phone}
                        onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                        className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                      <input
                        type="text"
                        placeholder="Ciudad"
                        value={customerInfo.city}
                        onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                        className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                    <input
                      type="text"
                      placeholder="Dirección de envío"
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="w-full mt-4 px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>

                  {/* Payment Method Specific Fields */}
                  {selectedMethod === 'card' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Información de la Tarjeta</h3>
                      <div className="space-y-4">
                        <input
                          type="text"
                          placeholder="Número de tarjeta"
                          value={cardInfo.number}
                          onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <input
                          type="text"
                          placeholder="Nombre en la tarjeta"
                          value={cardInfo.name}
                          onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="MM/AA"
                            value={cardInfo.expiry}
                            onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                          />
                          <input
                            type="text"
                            placeholder="CVV"
                            value={cardInfo.cvv}
                            onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'pse' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Información PSE</h3>
                      <div className="space-y-4">
                        <select
                          value={pseInfo.bank}
                          onChange={(e) => setPseInfo({...pseInfo, bank: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        >
                          <option value="">Selecciona tu banco</option>
                          {banks.map(bank => (
                            <option key={bank} value={bank}>{bank}</option>
                          ))}
                        </select>
                        <div className="grid grid-cols-2 gap-4">
                          <select
                            value={pseInfo.documentType}
                            onChange={(e) => setPseInfo({...pseInfo, documentType: e.target.value})}
                            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                          >
                            <option value="CC">Cédula de Ciudadanía</option>
                            <option value="CE">Cédula de Extranjería</option>
                            <option value="NIT">NIT</option>
                          </select>
                          <input
                            type="text"
                            placeholder="Número de documento"
                            value={pseInfo.documentNumber}
                            onChange={(e) => setPseInfo({...pseInfo, documentNumber: e.target.value})}
                            className="px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'nequi' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Información Nequi</h3>
                      <div className="space-y-4">
                        <input
                          type="tel"
                          placeholder="Número de celular"
                          value={nequiInfo.phone}
                          onChange={(e) => setNequiInfo({...nequiInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <input
                          type="password"
                          placeholder="PIN de Nequi"
                          value={nequiInfo.pin}
                          onChange={(e) => setNequiInfo({...nequiInfo, pin: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                      </div>
                    </div>
                  )}

                  {selectedMethod === 'paypal' && (
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800 mb-4">Información PayPal</h3>
                      <div className="space-y-4">
                        <input
                          type="email"
                          placeholder="Email de PayPal"
                          value={paypalInfo.email}
                          onChange={(e) => setPaypalInfo({...paypalInfo, email: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                        <input
                          type="password"
                          placeholder="Contraseña de PayPal"
                          value={paypalInfo.password}
                          onChange={(e) => setPaypalInfo({...paypalInfo, password: e.target.value})}
                          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex gap-4 pt-6">
                    <button
                      onClick={() => setCurrentStep('method')}
                      className="flex-1 px-6 py-3 border border-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors duration-300"
                    >
                      Volver
                    </button>
                    <button
                      onClick={handlePayment}
                      className="flex-1 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      Pagar {formatPrice(total)}
                    </button>
                  </div>
                </div>
              )}

              {/* Processing */}
              {currentStep === 'processing' && (
                <div className="text-center py-12">
                  <Loader2 className="w-16 h-16 text-red-500 mx-auto mb-4 animate-spin" />
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Procesando tu pago...</h3>
                  <p className="text-gray-600">Por favor espera mientras confirmamos tu transacción</p>
                </div>
              )}

              {/* Success */}
              {currentStep === 'success' && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">¡Pago exitoso!</h3>
                  <p className="text-gray-600 mb-4">Tu pedido ha sido confirmado y será enviado pronto</p>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                    <p className="text-sm text-green-800">
                      <strong>Número de orden:</strong> EU-{Date.now()}
                    </p>
                    <p className="text-sm text-green-800">
                      <strong>Total pagado:</strong> {formatPrice(total)}
                    </p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Recibirás un correo de confirmación en breve
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutView;