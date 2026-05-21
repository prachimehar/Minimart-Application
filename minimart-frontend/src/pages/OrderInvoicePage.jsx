import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import api from "../services/api";

import jsPDF from "jspdf";
import html2canvas from "html2canvas-pro";

export default function OrderInvoicePage() {

    const { id } = useParams();

    const [order, setOrder] = useState(null);

    const invoiceRef = useRef();

    useEffect(() => {
        fetchOrder();
    }, [id]);

    const fetchOrder = async () => {

        try {

            const res = await api.get(`/orders/${id}`);

            setOrder(res.data);

        } catch (err) {

            console.log(err);

        }
    };

    // DOWNLOAD PDF
    const downloadInvoice = async () => {

        const input = invoiceRef.current;

        const canvas = await html2canvas(input);

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jsPDF("p", "mm", "a4");

        const pdfWidth = pdf.internal.pageSize.getWidth();

        const pdfHeight =
            (canvas.height * pdfWidth) / canvas.width;

        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            pdfWidth,
            pdfHeight
        );

        pdf.save(`invoice-${order.id}.pdf`);
    };

    if (!order) {

        return (
            <div className="p-6">
                Loading invoice...
            </div>
        );
    }

    return (

        <div className="space-y-6">

            {/* DOWNLOAD BUTTON */}
            <div className="flex justify-end">

                <button
                    onClick={downloadInvoice}
                    className="bg-black text-white px-5 py-3 rounded-xl hover:bg-gray-800 transition"
                >
                    Download Invoice
                </button>

            </div>

            {/* INVOICE */}
            <div
                ref={invoiceRef}
                className="p-6 bg-white rounded-2xl shadow-md space-y-6"
            >

                {/* HEADER */}
                <div className="flex justify-between items-start">

                    <div>

                        <h1 className="text-3xl font-bold">
                            Invoice #{order.id}
                        </h1>

                        <p className="text-gray-600 mt-2">
                            Status: {order.status}
                        </p>

                        <p className="text-gray-600">
                            Date: {order.orderDate}
                        </p>

                    </div>

                    <div className="text-right">

                        <h2 className="text-2xl font-bold">
                            MiniMart
                        </h2>

                        <p className="text-gray-500">
                            Retail Management System
                        </p>

                    </div>

                </div>

                {/* CUSTOMER */}
                <div className="border p-4 rounded-lg">

                    <h2 className="font-semibold mb-3 text-lg">
                        Customer Details
                    </h2>

                    <p>
                        <span className="font-medium">
                            Name:
                        </span>{" "}
                        {order.customer?.name}
                    </p>

                    <p>
                        <span className="font-medium">
                            Email:
                        </span>{" "}
                        {order.customer?.email}
                    </p>

                    <p>
                        <span className="font-medium">
                            Phone:
                        </span>{" "}
                        {order.customer?.phone}
                    </p>

                </div>

                {/* ITEMS */}
                <div>

                    <h2 className="font-semibold mb-3 text-lg">
                        Order Items
                    </h2>

                    <div className="border rounded-lg overflow-hidden">

                        {/* HEADER */}
                        <div className="grid grid-cols-4 bg-gray-100 p-3 font-semibold">

                            <span>Product</span>
                            <span>Quantity</span>
                            <span>Price</span>
                            <span>Total</span>

                        </div>

                        {/* ROWS */}
                        {order.items?.map((item, i) => (

                            <div
                                key={i}
                                className="grid grid-cols-4 p-3 border-t"
                            >

                                <span>
                                    {item.productName}
                                </span>

                                <span>
                                    {item.quantity}
                                </span>

                                <span>
                                    ₹{item.unitPrice}
                                </span>

                                <span>
                                    ₹{item.quantity * item.unitPrice}
                                </span>

                            </div>

                        ))}

                    </div>

                </div>

                {/* TOTAL */}
                <div className="flex justify-end">

                    <div className="bg-gray-100 px-6 py-4 rounded-xl">

                        <h2 className="text-2xl font-bold">
                            Total: ₹{order.totalAmount}
                        </h2>

                    </div>

                </div>

            </div>

        </div>
    );
}