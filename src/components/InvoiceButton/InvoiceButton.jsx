/* eslint-disable react/prop-types */

import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { formatDate, formatPrice } from "@/lib/utils";
import jsPDF from "jspdf";
import "jspdf-autotable";

export function InvoiceButton({ orderData }) {
  const handleDownload = () => {
    const doc = new jsPDF();

    doc.setProperties({
      title: `Invoice-ORDER-${orderData.orderId}-LeafyNest`,
      subject: "Invoice",
      author: "LeafyNest",
      keywords: "invoice, order, LeafyNest",
      creator: "LeafyNest Invoice Generator",
    });

    doc.addImage(
      "https://res.cloudinary.com/dmjd9rohb/image/upload/v1729762401/rb_2149399755-removebg-preview-c_vdkjnd.png",
      "PNG",
      20,
      15,
      40,
      40
    );

    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(44, 62, 80);
    doc.text("INVOICE", 140, 30);

    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(52, 73, 94);
    doc.text(`Invoice Number: INV-${orderData.orderId}`, 140, 40);
    doc.text(`Date: ${formatDate(orderData.orderDate)}`, 140, 45);
    doc.text(`Order ID: ORDER-${orderData.orderId}`, 140, 50);

    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("LeafyNest", 20, 70);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Avenida Concha Espina 1", 20, 75);
    doc.text("28036 Madrid, Spain", 20, 80);
    doc.text("Phone: +62 123 456 789", 20, 85);

    doc.autoTable({
      startY: 120,
      head: [["Item", "Price", "Quantity", "Total"]],
      body: orderData.orderProduct.map((product) => [
        product.productName,
        formatPrice(product.price),
        product.quantity,
        formatPrice(product.price * product.quantity),
      ]),
      styles: { fontSize: 9, cellPadding: 5 },
      headStyles: {
        fillColor: [44, 62, 80],
        textColor: 255,
        fontStyle: "bold",
      },
      columnStyles: {
        0: { cellWidth: 80 },
        1: { cellWidth: 30, halign: "right" },
        2: { cellWidth: 30, halign: "center" },
        3: { cellWidth: 30, halign: "right" },
      },
      alternateRowStyles: { fillColor: [241, 245, 249] },
    });

    const finalY = doc.lastAutoTable.finalY || 120;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text(`Total:`, 130, finalY + 10);
    doc.text(`${formatPrice(orderData.totalAmount)}`, 170, finalY + 10, {
      align: "right",
    });
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Payment Method: ${orderData.vaNumber[0].bank}`, 20, finalY + 20);

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text(
      "Thank you for your order!",
      doc.internal.pageSize.width / 2,
      finalY + 30,
      { align: "center" }
    );

    // Add page numbers
    const pageCount = doc.internal.getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      doc.setFontSize(8);
      doc.setTextColor(150, 150, 150);
      doc.text(
        `Page ${i} of ${pageCount}`,
        doc.internal.pageSize.width - 20,
        doc.internal.pageSize.height - 10
      );
    }

    doc.save(`invoice-ORDER-${orderData.orderId}-LeafyNest.pdf`);
  };

  return (
    <Button
      onClick={handleDownload}
      variant='link'
      size='sm'
      className='text-white'
    >
      <Download className=' h-4 w-4' /> Download Invoice (PDF)
    </Button>
  );
}
