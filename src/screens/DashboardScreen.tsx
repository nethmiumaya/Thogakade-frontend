import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {PosContext} from "../context/posContext";

const DashboardScreen: React.FC = () => {
    const { customers, items, orders } = useContext(PosContext);

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
            <View style={styles.statContainer}>
    <Text style={styles.statText}>Customers: {customers.length}</Text>
    <Text style={styles.statText}>Items: {items.length}</Text>
    <Text style={styles.statText}>Orders: {orders.length}</Text>
    </View>
    </View>
);
};

export default DashboardScreen;

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    statContainer: { alignItems: 'center' },
    statText: { fontSize: 18, marginVertical: 5 },
});
