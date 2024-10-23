// components/CustomerList.tsx
import React from "react";
import { FixedSizeList as List, ListChildComponentProps } from "react-window";
import InfiniteLoader from "react-window-infinite-loader";

interface Customer {
  id: number;
  name: string;
  title: string;
}

interface Props {
  customers: Customer[];
  selectedCustomer: number | null;
  onSelect: (id: number) => void;
  loadMoreCustomers: (startIndex: number, stopIndex: number) => Promise<void>; // Function to load more customers
  hasMoreCustomers: boolean; // Flag to indicate if there are more customers to load
}

const CustomerList: React.FC<Props> = ({
  customers,
  selectedCustomer,
  onSelect,
  loadMoreCustomers,
  hasMoreCustomers,
}) => {
  const isItemLoaded = (index: number) =>
    !hasMoreCustomers || index < customers.length;

  const itemCount = hasMoreCustomers ? customers.length + 1 : customers.length;

  const Row: React.FC<ListChildComponentProps> = ({ index, style }) => {
    if (!isItemLoaded(index)) {
      return <div style={style}>Loading...</div>; // Show a loading message when loading more customers
    }

    const customer = customers[index];

    return (
      <div
        style={style}
        className={`customer-card ${
          selectedCustomer === customer.id ? "selected" : ""
        }`}
        onClick={() => onSelect(customer.id)}
      >
        <h3>{customer.name}</h3>
        <p>{customer.title}</p>
      </div>
    );
  };

  return (
    <InfiniteLoader
      isItemLoaded={isItemLoaded}
      itemCount={itemCount}
      loadMoreItems={loadMoreCustomers}
    >
      {({ onItemsRendered, ref }) => (
        <List
          height={750} // Adjust height as needed
          itemCount={itemCount}
          itemSize={70} // Adjust size as needed
          width={"100%"}
          onItemsRendered={onItemsRendered}
          ref={ref}
        >
          {Row}
        </List>
      )}
    </InfiniteLoader>
  );
};

export default CustomerList;
