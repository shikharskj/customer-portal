// app/page.tsx

"use client";

import { useState, useEffect } from "react";
import CustomerList from "./components/CustomerList";
import CustomerDetails from "./components/CustomerDetails";
import PhotoGrid from "./components/PhotoGrid";

const PAGE_SIZE = 20; // Number of customers to load per page

const Home = () => {
  const [customers, setCustomers] = useState<
    { id: number; name: string; title: string; address: string }[]
  >([]);
  const [selectedCustomer, setSelectedCustomer] = useState<number | null>(null);
  const [hasMoreCustomers, setHasMoreCustomers] = useState(true);

  // Simulate fetching customers from a server
  const loadMoreCustomers = async (startIndex: number, stopIndex: number) => {
    // Simulate an API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Load more customers
    const newCustomers = Array.from({ length: PAGE_SIZE }, (_, i) => ({
      id: startIndex + i + 1,
      name: `Customer ${startIndex + i + 1}`,
      title: `Title ${startIndex + i + 1}`,
      address: `Address ${startIndex + i + 1}`,
    }));

    setCustomers((prev) => [...prev, ...newCustomers]);

    // Stop loading more customers if we've loaded 1000
    if (startIndex + PAGE_SIZE >= 1000) {
      setHasMoreCustomers(false);
    }
  };

  return (
    <div className="container">
      <div className="sidebar">
        <CustomerList
          customers={customers}
          selectedCustomer={selectedCustomer}
          onSelect={setSelectedCustomer}
          loadMoreCustomers={loadMoreCustomers}
          hasMoreCustomers={hasMoreCustomers}
        />
      </div>
      <div className="content">
        <CustomerDetails
          customer={customers.find((c) => c.id === selectedCustomer) || null}
        />
        <PhotoGrid />
      </div>
    </div>
  );
};

export default Home;
