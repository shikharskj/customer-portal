// components/CustomerDetails.tsx
import React from "react";

interface Customer {
  name: string;
  title: string;
  address: string;
}

interface Props {
  customer: Customer | null;
}

const CustomerDetails: React.FC<Props> = ({ customer }) => {
  if (!customer) {
    return <div className="no-selection">Select a customer to see details</div>;
  }

  return (
    <div className="customer-details">
      <h1>{customer.name}</h1>
      <h4>{customer.title}</h4>
      <p>{customer.address}</p>
    </div>
  );
};

export default CustomerDetails;
