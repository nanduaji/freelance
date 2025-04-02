import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Invoice = () => {
  const invoiceData = {
    hotelName: "THE GREAT WALL HOTEL",
    tagline: "Meet All Your Needs",
    guestName: "Mr. Daniel Gallego",
    roomNumber: "205",
    arrivalDate: "March 31, 2025",
    departureDate: "April 01, 2025",
    invoiceNo: "00010",
    invoiceDate: "01/04/2025",
    guests: "2 Persons",
    items: [
      { description: "DELUXE ROOM (2 NIGHTS)", quantity: 1, unitPrice: "319/Night", total: 638 },
      { description: "ROOM SERVICE - BREAKFAST", quantity: 4, unitPrice: "49 per meal", total: 196 },
    ],
    subtotal: 834,
    tax: 0,
    total: 834,
    currency: "AED",
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 border-0">
        <div className="text-center">
          <h4 className="fw-bold">{invoiceData.hotelName}</h4>
          <p className="text-muted">{invoiceData.tagline}</p>
          <h2 className="text-end fw-bold">INVOICE</h2>
        </div>
        
        <h5 className="mt-4">{invoiceData.guestName}</h5>

        <div className="row mt-3 p-3" style={{ backgroundColor: "#d1e7dd" }}>
          <div className="col-md-6">
            <p><strong>Room No#:</strong> {invoiceData.roomNumber}</p>
            <p><strong>Arrival Date:</strong> {invoiceData.arrivalDate}</p>
            <p><strong>Departure Date:</strong> {invoiceData.departureDate}</p>
          </div>
          <div className="col-md-6 text-end">
            <p><strong>Invoice No:</strong> {invoiceData.invoiceNo}</p>
            <p><strong>Date:</strong> {invoiceData.invoiceDate}</p>
            <p><strong>No of Guests:</strong> {invoiceData.guests}</p>
          </div>
        </div>

        <table className="table mt-3">
          <thead className="table-light">
            <tr>
              <th>Item</th>
              <th>Quantity</th>
              <th>Unit Price</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {invoiceData.items.map((item, index) => (
              <tr key={index}>
                <td>{item.description}</td>
                <td>{item.quantity}</td>
                <td>{item.unitPrice}</td>
                <td>{item.total}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="text-end">
          <h6><strong>Subtotal:</strong> {invoiceData.subtotal} {invoiceData.currency}</h6>
          <h6><strong>Tax (0%):</strong> {invoiceData.tax} {invoiceData.currency}</h6>
          <h5 className="fw-bold mt-3">Total: {invoiceData.total} {invoiceData.currency}</h5>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
