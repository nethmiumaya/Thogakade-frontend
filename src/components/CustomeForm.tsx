import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import ICustomer from "../../model/Customer";

interface Props {
    onSubmit: (data: { name: string; email: string; nic: string; phone: string }) => void;
    initialData?: ICustomer;
    onCancel?: () => void;
}

const CustomerForm: React.FC<Props> = ({ onSubmit, initialData, onCancel }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [nic, setNic] = useState<string>('');
    const [phone, setPhone] = useState<string>('');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setEmail(initialData.email);
            setNic(initialData.nic);
            setPhone(initialData.phone);
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (name.trim() === '' || email.trim() === '' || nic.trim() === '' || phone.trim() === '') {
            alert('Please fill in all fields.');
            return;
        }
        onSubmit({ name, email, nic, phone });
        setName('');
        setEmail('');
        setNic('');
        setPhone('');
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder="Name"
                value={name}
                onChangeText={setName}
                style={styles.input}
            />
            <TextInput
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                style={styles.input}
                keyboardType="email-address"
            />
            <TextInput
                placeholder="NIC"
                value={nic}
                onChangeText={setNic}
                style={styles.input}
            />
            <TextInput
                placeholder="Phone"
                value={phone}
                onChangeText={setPhone}
                style={styles.input}
                keyboardType="phone-pad"
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

export default CustomerForm;

const styles = StyleSheet.create({
    container: { marginVertical: 10 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginVertical: 5,
        borderRadius: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
});