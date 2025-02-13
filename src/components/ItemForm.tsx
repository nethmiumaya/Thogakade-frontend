import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import {IItem} from "../context/posContext";


interface Props {
    onSubmit: (data: { name: string; price: number; quantity: number }) => void;
    initialData?: IItem;
    onCancel?: () => void;
}

const ItemForm: React.FC<Props> = ({ onSubmit, initialData, onCancel }) => {
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setPrice(initialData.price.toString());
            setQuantity(initialData.quantity.toString());
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (name.trim() === '' || price.trim() === '' || quantity.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }
        const parsedPrice = parseFloat(price);
        const parsedQuantity = parseInt(quantity, 10);
        if (isNaN(parsedPrice) || isNaN(parsedQuantity)) {
            alert('Price and quantity must be valid numbers.');
            return;
        }
        onSubmit({ name, price: parsedPrice, quantity: parsedQuantity });
        setName('');
        setPrice('');
        setQuantity('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Item Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Price"
                value={price}
                onChangeText={setPrice}
                style={styles.input}
                keyboardType="numeric"
            />
            <TextInput
                placeholder="Quantity"
                value={quantity}
                onChangeText={setQuantity}
                style={styles.input}
                keyboardType="numeric"
            />
            <View style={styles.buttonContainer}>
                <Button title="Save" onPress={handleSubmit} />
                {onCancel && (
                    <Button title="Cancel" onPress={onCancel} color="gray" />
                )}
            </View>
        </View>
    );
};

export default ItemForm;

const styles = StyleSheet.create({
    container: { marginVertical: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 5,
        borderRadius: 5,
    },
    buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', marginTop: 10 },
});