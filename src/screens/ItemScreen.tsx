import React, { useContext, useState } from 'react';
import { View, FlatList, Text, StyleSheet, Button } from 'react-native';
import ItemForm from '../components/ItemForm';
import ItemItem from '../components/ItemItem';
import {IItem, PosContext} from "../context/posContext";

const ItemsScreen: React.FC = () => {
    const { items, addItem, updateItem, deleteItem } = useContext(PosContext);
    const [editingItem, setEditingItem] = useState<IItem | null>(null);
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleAddItem = (item: { name: string; price: number }) => {
        addItem(item);
        setShowForm(false);
    };

    const handleUpdateItem = (data: { name: string; price: number }) => {
        if (editingItem) {
            updateItem(editingItem.id, data);
            setEditingItem(null);
        }
    };

    const startEditing = (item: IItem) => {
        setEditingItem(item);
    };

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Items</Text>
    {showForm && !editingItem && (
        <ItemForm onSubmit={handleAddItem} onCancel={() => setShowForm(false)} />
    )}
    {editingItem && (
        <ItemForm
            onSubmit={handleUpdateItem}
        initialData={editingItem}
        onCancel={() => setEditingItem(null)}
        />
    )}
    {!showForm && !editingItem && (
        <Button title="Add Item" onPress={() => setShowForm(true)} />
    )}
    <FlatList
        data={items}
    keyExtractor={(item) => item.id}
    renderItem={({ item }) => (
        <ItemItem item={item} onEdit={startEditing} onDelete={deleteItem} />
)}
    contentContainerStyle={styles.list}
    />
    </View>
);
};

export default ItemsScreen;

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
    list: { marginTop: 10 },
});
