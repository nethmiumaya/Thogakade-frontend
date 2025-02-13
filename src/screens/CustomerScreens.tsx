import React, { useContext, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';
import {ICustomer, PosContext} from "../context/posContext";
import CustomerForm from "../components/CustomeForm";
import CustomerItem from "../components/CustomerItemForm";

const CustomersScreen: React.FC = () => {
    const { customers, addCustomer, updateCustomer, deleteCustomer } = useContext(PosContext);
    const [editingCustomer, setEditingCustomer] = useState<ICustomer | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleAddCustomer = (customer: { name: string; email: string }) => {
        addCustomer(customer);
        setShowForm(false);
    };

    const handleUpdateCustomer = (data: { name: string; email: string }) => {
        if (editingCustomer) {
            updateCustomer(editingCustomer.id, data);
            setEditingCustomer(null);
        }
    };

    const startEditing = (customer: ICustomer) => {
        setEditingCustomer(customer);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Customers</Text>
    {showForm && !editingCustomer && (
        <CustomerForm
            onSubmit={handleAddCustomer}
        onCancel={() => setShowForm(false)}
        />
    )}
    {editingCustomer && (
        <CustomerForm
            onSubmit={handleUpdateCustomer}
        initialData={editingCustomer}
        onCancel={() => setEditingCustomer(null)}
        />
    )}
    {!showForm && !editingCustomer && (
        <Button title="Add Customer" onPress={() => setShowForm(true)} />
    )}
    <FlatList
        data={customers}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <CustomerItem
            customer={item}
    onEdit={startEditing}
    onDelete={deleteCustomer}
    />
)}
    contentContainerStyle={styles.list}
    />
    </View>
);
};

export default CustomersScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    list: { marginTop: 10 },
});
