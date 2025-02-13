import React, { createContext, useState, ReactNode } from 'react';

export interface ICustomer {
    id: string;
    name: string;
    email: string;
}

export interface IItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export interface IOrderItem extends IItem {
    quantity: number;
}

export interface IOrder {
    id: string;
    customer: ICustomer;
    items: IOrderItem[];
    date: string;
}

interface IPosContext {
    customers: ICustomer[];
    addCustomer: (customer: Omit<ICustomer, 'id'>) => void;
    updateCustomer: (id: string, updatedCustomer: Partial<Omit<ICustomer, 'id'>>) => void;
    deleteCustomer: (id: string) => void;
    items: IItem[];
    addItem: (item: Omit<IItem, 'id'>) => void;
    updateItem: (id: string, updatedItem: Partial<Omit<IItem, 'id'>>) => void;
    deleteItem: (id: string) => void;
    orders: IOrder[];
    addOrder: (order: Omit<IOrder, 'id'>) => void;
}

export const PosContext = createContext<IPosContext>({} as IPosContext);

interface Props {
    children: ReactNode;
}

// --- Context Provider ---
export const PosProvider: React.FC<Props> = ({ children }) => {
    // Initial state
    const [customers, setCustomers] = useState<ICustomer[]>([
        { id: '1', name: 'Alice Johnson', email: 'alice@example.com' },
        { id: '2', name: 'Bob Smith', email: 'bob@example.com' },
    ]);

    const [items, setItems] = useState<IItem[]>([
        { id: '1', name: 'Apple', price: 1.0, quantity: 10 },
        { id: '2', name: 'Banana', price: 0.5 , quantity: 20 },
        { id: '3', name: 'Orange', price: 0.75 , quantity: 15 },
    ]);

    const [orders, setOrders] = useState<IOrder[]>([]);

    // --- Customer CRUD ---
    const addCustomer = (customer: Omit<ICustomer, 'id'>) => {
        setCustomers(prev => [
            ...prev,
            { ...customer, id: String(new Date().getTime()) },
        ]);
    };

    const updateCustomer = (id: string, updatedCustomer: Partial<Omit<ICustomer, 'id'>>) => {
        setCustomers(prev =>
            prev.map(c => (c.id === id ? { ...c, ...updatedCustomer } : c))
        );
    };

    const deleteCustomer = (id: string) => {
        setCustomers(prev => prev.filter(c => c.id !== id));
    };

    // --- Item CRUD ---
    const addItem = (item: Omit<IItem, 'id'>) => {
        setItems(prev => [
            ...prev,
            { ...item, id: String(new Date().getTime()) },
        ]);
    };

    const updateItem = (id: string, updatedItem: Partial<Omit<IItem, 'id'>>) => {
        setItems(prev =>
            prev.map(i => (i.id === id ? { ...i, ...updatedItem } : i))
        );
    };

    const deleteItem = (id: string) => {
        setItems(prev => prev.filter(i => i.id !== id));
    };

    // --- Orders ---
    const addOrder = (order: Omit<IOrder, 'id'>) => {
        setOrders(prev => [
            ...prev,
            { ...order, id: String(new Date().getTime()) },
        ]);
    };

    return (
        <PosContext.Provider
            value={{
        customers,
            addCustomer,
            updateCustomer,
            deleteCustomer,
            items,
            addItem,
            updateItem,
            deleteItem,
            orders,
            addOrder,
    }}
>
    {children}
    </PosContext.Provider>
);
};
