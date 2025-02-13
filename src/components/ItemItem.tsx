import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { IItem } from '../context/posContext';

interface Props {
    item: IItem;
    onEdit: (item: IItem) => void;
    onDelete: (id: string) => void;
}

const ItemItem: React.FC<Props> = ({ item, onEdit, onDelete }) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>Price: ${item.price.toFixed(2)}</Text>
                <Text>Quantity: {item.quantity}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => onEdit(item)} style={styles.iconButton}>
                    <Icon name="edit" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(item.id)} style={styles.iconButton}>
                    <Icon name="delete" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default ItemItem;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    info: { flex: 1 },
    name: { fontWeight: 'bold', fontSize: 16 },
    actions: { flexDirection: 'row' },
    iconButton: {
        marginHorizontal: 5,
    },
});