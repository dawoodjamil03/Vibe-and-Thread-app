import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

export default function OrderSuccessPage() {
  const { cartItems, clearCart } = useCart();
  const [orderData, setOrderData] = useState(null);
  const hasDownloadedPdf = useRef(false);

  useEffect(() => {
    // Retrieve order data passed from checkout
    const savedOrder = localStorage.getItem('lastOrder');
    if (savedOrder) {
      setOrderData(JSON.parse(savedOrder));
    } else if (cartItems.length > 0) {
      // Fallback if accessed directly somehow but has cart items
      setOrderData({
        orderId: 'VIBE-' + Math.floor(100000 + Math.random() * 900000)
      });
    }

    if (cartItems.length > 0) {
      clearCart();
    }
  }, [cartItems.length, clearCart]);

  useEffect(() => {
    if (orderData && orderData.items && !hasDownloadedPdf.current) {
      hasDownloadedPdf.current = true;
      generatePDF();
    }
  }, [orderData]);

  const generatePDF = () => {
    if (!orderData || !orderData.items) return;

    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text("Vibe & Thread", 14, 20);
    
    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Order Receipt", 14, 30);
    
    doc.setFontSize(10);
    doc.text(`Order ID: ${orderData.orderId}`, 14, 40);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 45);

    // Customer Details
    if (orderData.customer) {
      doc.text("Shipping Details:", 120, 30);
      doc.setFont("helvetica", "bold");
      doc.text(`${orderData.customer.firstName} ${orderData.customer.lastName}`, 120, 35);
      doc.setFont("helvetica", "normal");
      doc.text(`${orderData.customer.address}, ${orderData.customer.city}`, 120, 40);
      doc.text(`ZIP: ${orderData.customer.zip}`, 120, 45);
      doc.text(`Payment: ${orderData.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Credit Card'}`, 120, 50);
    }

    // Items Table
    const tableData = orderData.items.map(item => [
      item.name,
      item.size || 'N/A',
      item.quantity.toString(),
      `Rs. ${item.priceNum.toLocaleString()}`,
      `Rs. ${(item.priceNum * item.quantity).toLocaleString()}`
    ]);

    autoTable(doc, {
      startY: 60,
      head: [['Item', 'Size', 'Qty', 'Unit Price', 'Total']],
      body: tableData,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [20, 20, 20], textColor: [255, 255, 255], fontStyle: 'bold' },
      foot: [
        ['', '', '', 'Subtotal:', `Rs. ${orderData.subtotal.toLocaleString()}`],
        ['', '', '', 'Shipping:', orderData.shipping === 0 ? 'Free' : `Rs. ${orderData.shipping.toLocaleString()}`],
        ['', '', '', 'Total:', `Rs. ${orderData.total.toLocaleString()}`]
      ],
      footStyles: { fontStyle: 'bold', fillColor: [240, 240, 240] }
    });

    // Save PDF
    doc.save(`${orderData.orderId}-Receipt.pdf`);
  };

  const displayOrderId = orderData?.orderId || `VIBE-${Math.floor(100000 + Math.random() * 900000)}`;

  return (
    <section className="max-w-[1440px] mx-auto px-margin-mobile md:px-margin-desktop py-xl md:py-[120px] text-center min-h-[60vh] flex flex-col items-center justify-center">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', bounce: 0.5, duration: 0.8 }}
      >
        <span className="material-symbols-outlined text-[80px] text-primary mb-md block">check_circle</span>
      </motion.div>
      <motion.h1 
        className="text-style-headline-lg text-primary mb-sm"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Thank You For Your Order
      </motion.h1>
      <motion.div 
        className="text-style-body-lg text-on-surface-variant max-w-[500px] mb-lg"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <p className="mb-sm">Your order <strong>{displayOrderId}</strong> has been successfully placed.</p>
        <p className="text-sm text-secondary bg-surface-container-low p-sm rounded-sm">
          <em>Note: This is a frontend demo application. A mock confirmation email attempt was made, but to view your actual order details, please download your PDF receipt below.</em>
        </p>
      </motion.div>
      
      <motion.div
        className="flex flex-col sm:flex-row gap-md"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        {orderData?.items && (
          <button
            onClick={generatePDF}
            className="inline-flex items-center justify-center gap-xs text-style-button border border-primary text-primary py-sm px-xl hover:bg-surface-container transition-colors duration-300 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">download</span>
            Download PDF Receipt
          </button>
        )}
        <Link
          to="/"
          className="inline-block text-style-button bg-primary text-on-primary py-sm px-xl hover:bg-primary-container transition-colors duration-300"
        >
          Continue Shopping
        </Link>
      </motion.div>
    </section>
  );
}
