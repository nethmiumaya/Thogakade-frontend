import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import ICustomer from '../model/Customer';

export const initialState: ICustomer[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/customer',
});

export const saveCustomer = createAsyncThunk(
    'customer/saveCustomer',
    async (customer: ICustomer) => {
        const response = await api.post('/add', customer);
        return response.data;
    }
);

export const deleteCustomer = createAsyncThunk(
    'customer/deleteCustomer',
    async (id: string) => {
        await api.delete(`/delete/${id}`);
        return id;
    }
);

export const updateCustomer = createAsyncThunk(
    'customer/updateCustomer',
    async (customer: ICustomer) => {
        const response = await api.put(`/update/${customer.id}`, customer);
        return response.data;
    }
);

export const getCustomers = createAsyncThunk(
    'customer/getCustomers',
    async () => {
        const response = await api.get('/view');
        return response.data;
    }
);

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(saveCustomer.fulfilled, (state, action: PayloadAction<ICustomer>) => {
            state.push(action.payload);
        });
        builder.addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<string>) => {
            return state.filter((customer) => customer.id !== action.payload);
        });
        builder.addCase(updateCustomer.fulfilled, (state, action: PayloadAction<ICustomer>) => {
            return state.map((customer) =>
                customer.id === action.payload.id ? action.payload : customer
            );
        });
        builder.addCase(getCustomers.fulfilled, (state, action: PayloadAction<ICustomer[]>) => {
            return action.payload;
        });
    },
});

export default customerSlice.reducer;