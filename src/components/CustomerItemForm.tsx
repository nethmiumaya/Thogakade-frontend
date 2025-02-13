import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ICustomer from "../../model/Customer";

interface Props {
    customer: ICustomer;
    onEdit: (customer: ICustomer) => void;
    onDelete: (id: string) => void;
}

const CustomerItem: React.FC<Props> = ({ customer, onEdit, onDelete }) => {
    return (
        <View style={styles.container}>
            <View style={styles.info}>
                <Text style={styles.name}>{customer.name}</Text>
                <Text>{customer.email}</Text>
                <Text>{customer.nic}</Text>
                <Text>{customer.phone}</Text>
            </View>
            <View style={styles.actions}>
                <TouchableOpacity onPress={() => onEdit(customer)} style={styles.iconButton}>
                    <Icon name="edit" size={24} color="blue" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => onDelete(customer.id)} style={styles.iconButton}>
                    <Icon name="delete" size={24} color="red" />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomerItem;

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