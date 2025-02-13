import React, { useContext, useState } from 'react';
import { View, Text, FlatList, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { PosContext, ICustomer, IItem, IOrderItem, IOrder } from '../context/posContext';

const OrdersScreen: React.FC = () => {
    const { customers, items, orders, addOrder } = useContext(PosContext);
    const [selectedCustomer, setSelectedCustomer] = useState<ICustomer | null>(null);
    const [selectedItems, setSelectedItems] = useState<Record<string, IOrderItem>>({});

    const toggleItemSelection = (item: IItem) => {
        setSelectedItems(prev => {
            const newItems = { ...prev };
            if (newItems[item.id]) {
                delete newItems[item.id];
            } else {
                newItems[item.id] = { ...item, quantity: 1 };
            }
            return newItems;
        });
    };

    const createOrder = () => {
        if (!selectedCustomer) {
            alert('Please select a customer.');
            return;
        }
        if (Object.keys(selectedItems).length === 0) {
            alert('Please select at least one item.');
            return;
        }
        const newOrder: Omit<IOrder, 'id'> = {
            customer: selectedCustomer,
            items: Object.values(selectedItems),
            date: new Date().toLocaleString(),
        };
        addOrder(newOrder);
        setSelectedCustomer(null);
        setSelectedItems({});
        alert('Order created!');
    };

    const calculateTotal = (order: IOrder) => {
        return order.items.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Create Order</Text>
    <Text style={styles.sectionTitle}>Select Customer:</Text>
    <FlatList
    data={customers}
    horizontal
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <TouchableOpacity
            style={[styles.selectButton, selectedCustomer?.id === item.id && styles.selectedButton]}
    onPress={() => setSelectedCustomer(item)}
>
    <Text style={styles.buttonText}>{item.name}</Text>
        </TouchableOpacity>
)}
    contentContainerStyle={styles.horizontalList}
    />
    <Text style={styles.sectionTitle}>Select Items:</Text>
    <FlatList
    data={items}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <TouchableOpacity
            style={[styles.selectButton, selectedItems[item.id] && styles.selectedButton]}
    onPress={() => toggleItemSelection(item)}
>
    <Text style={styles.buttonText}>
        {item.name} (${item.price.toFixed(2)})
    </Text>
    </TouchableOpacity>
)}
    contentContainerStyle={styles.list}
    />
    <Button title="Create Order" onPress={createOrder} />
    <Text style={[styles.title, { marginTop: 20 }]}>Orders</Text>
    {orders.length === 0 ? (
        <Text>No orders yet.</Text>
    ) : (
        <FlatList
            data={orders}
        keyExtractor={(item) => item.id}
        renderItem={({ item: order }) => (
        <View style={styles.orderItem}>
        <Text style={styles.orderText}>Customer: {order.customer.name}</Text>
    <Text style={styles.orderText}>
        Items: {order.items.map(i => `${i.name} x${i.quantity}`).join(', ')}
        </Text>
        <Text style={styles.orderText}>Total: ${calculateTotal(order)}</Text>
    <Text style={styles.orderText}>Date: {order.date}</Text>
    </View>
    )}
        />
    )}
    </View>
);
};

export default OrdersScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
    sectionTitle: { fontSize: 18, marginVertical: 10 },
    horizontalList: { marginBottom: 10 },
    list: { marginBottom: 10 },
    selectButton: {
        backgroundColor: '#ddd',
        padding: 10,
        borderRadius: 5,
        marginRight: 10,
        marginBottom: 10,
    },
    selectedButton: { backgroundColor: '#90ee90' },
    buttonText: { fontSize: 16 },
    orderItem: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5,
    },
    orderText: { fontSize: 14 },
});
