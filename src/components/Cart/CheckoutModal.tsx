import React, { useState } from 'react';
import { X, CreditCard, Smartphone, Building2, Check, Loader2 } from 'lucide-react';
import { CartItem } from '../../types';
import { useCart } from '../../hooks/useCart';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: CartItem[];
  total: number;
}

type PaymentMethod = 'pse' | 'nequi' | 'card';
type PaymentStep = 'method' | 'details' | 'processing' | 'success';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, cart, total }) => {
  const [currentStep, setCurrentStep] = useState<PaymentStep>('method');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const { clearCart } = useCart();

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
    
    // Clear cart after successful payment
    setTimeout(() => {
      clearCart();
      onClose();
      resetForm();
    }, 3000);
  };

  const resetForm = () => {
    setCurrentStep('method');
    setSelectedMethod('card');
    setCustomerInfo({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      department: ''
    });
    setCardInfo({
      number: '',
      expiry: '',
      cvv: '',
      name: ''
    });
    setPseInfo({
      bank: '',
      documentType: 'CC',
      documentNumber: '',
      email: ''
    });
    setNequiInfo({
      phone: '',
      pin: ''
    });
  };

  const handleClose = () => {
    if (currentStep !== 'processing') {
      onClose();
      resetForm();
    }
  };

  if (!isOpen) return null;

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose}></div>
      
      <div className="relative bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-800">
            {currentStep === 'method' && 'Método de Pago'}
            {currentStep === 'details' && 'Información de Pago'}
            {currentStep === 'processing' && 'Procesando Pago'}
            {currentStep === 'success' && '¡Pago Exitoso!'}
          </h2>
          {currentStep !== 'processing' && (
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-300"
            >
              <X className="w-6 h-6" />
            </button>
          )}
        </div>

        <div className="p-6">
          {/* Order Summary */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <h3 className="font-semibold text-gray-800 mb-3">Resumen del Pedido</h3>
            <div className="space-y-2 mb-4">
              {cart.map((item) => (
                <div key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    {item.name} ({item.selectedSize}, {item.selectedColor}) x{item.quantity}
                  </span>
                  <span className="font-semibold">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="border-t pt-2 flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-red-600">{formatPrice(total)}</span>
            </div>
          </div>

          {/* Payment Method Selection */}
          {currentStep === 'method' && (
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-800 mb-4">Selecciona tu método de pago</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setSelectedMethod('card')}
                  className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                    selectedMethod === 'card'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <CreditCard className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <div className="text-center">
                    <div className="font-semibold">Tarjeta</div>
                    <div className="text-sm text-gray-600">Débito/Crédito</div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedMethod('pse')}
                  className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                    selectedMethod === 'pse'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <Building2 className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <div className="text-center">
                    <div className="font-semibold">PSE</div>
                    <div className="text-sm text-gray-600">Débito a cuenta</div>
                  </div>
                </button>

                <button
                  onClick={() => setSelectedMethod('nequi')}
                  className={`p-4 border-2 rounded-lg transition-all duration-300 ${
                    selectedMethod === 'nequi'
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-300'
                  }`}
                >
                  <Smartphone className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <div className="text-center">
                    <div className="font-semibold">Nequi</div>
                    <div className="text-sm text-gray-600">Pago móvil</div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => setCurrentStep('details')}
                className="w-full mt-6 px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-colors duration-300"
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
                <h3 className="font-semibold text-gray-800 mb-4">Información Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Nombre completo"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <input
                    type="email"
                    placeholder="Correo electrónico"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <input
                    type="tel"
                    placeholder="Teléfono"
                    value={customerInfo.phone}
                    onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                  <input
                    type="text"
                    placeholder="Ciudad"
                    value={customerInfo.city}
                    onChange={(e) => setCustomerInfo({...customerInfo, city: e.target.value})}
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Dirección de envío"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                  className="w-full mt-4 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                />
              </div>

              {/* Payment Method Specific Fields */}
              {selectedMethod === 'card' && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Información de la Tarjeta</h3>
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="Número de tarjeta"
                      value={cardInfo.number}
                      onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <input
                      type="text"
                      placeholder="Nombre en la tarjeta"
                      value={cardInfo.name}
                      onChange={(e) => setCardInfo({...cardInfo, name: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="MM/AA"
                        value={cardInfo.expiry}
                        onChange={(e) => setCardInfo({...cardInfo, expiry: e.target.value})}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={cardInfo.cvv}
                        onChange={(e) => setCardInfo({...cardInfo, cvv: e.target.value})}
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'pse' && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Información PSE</h3>
                  <div className="space-y-4">
                    <select
                      value={pseInfo.bank}
                      onChange={(e) => setPseInfo({...pseInfo, bank: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
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
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
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
                        className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedMethod === 'nequi' && (
                <div>
                  <h3 className="font-semibold text-gray-800 mb-4">Información Nequi</h3>
                  <div className="space-y-4">
                    <input
                      type="tel"
                      placeholder="Número de celular"
                      value={nequiInfo.phone}
                      onChange={(e) => setNequiInfo({...nequiInfo, phone: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                    <input
                      type="password"
                      placeholder="PIN de Nequi"
                      value={nequiInfo.pin}
                      onChange={(e) => setNequiInfo({...nequiInfo, pin: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-4">
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
  );
};

export default CheckoutModal;