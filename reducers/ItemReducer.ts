import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import Item from '../model/Item';

export const initialState: Item[] = [];

const api = axios.create({
    baseURL: 'http://localhost:3000/item',
});

export const saveItem = createAsyncThunk(
    'item/saveItem',
    async (item: Item) => {
        const response = await api.post('/add', item);
        return response.data;
    }
);

export const deleteItem = createAsyncThunk(
    'item/deleteItem',
    async (id: string) => {
        await api.delete(`/delete/${id}`);
        return id;
    }
);

export const updateItem = createAsyncThunk(
    'item/updateItem',
    async (item: Item) => {
        const response = await api.put(`/update/${item.id}`, item);
        return response.data;
    }
);

export const getItems = createAsyncThunk(
    'item/getItems',
    async () => {
        const response = await api.get('/view');
        return response.data;
    }
);

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(saveItem.fulfilled, (state, action: PayloadAction<Item>) => {
            state.push(action.payload);
        });
        builder.addCase(deleteItem.fulfilled, (state, action: PayloadAction<string>) => {
            return state.filter((item) => item.id !== action.payload);
        });
        builder.addCase(updateItem.fulfilled, (state, action: PayloadAction<Item>) => {
            return state.map((item) =>
                item.id === action.payload.id ? action.payload : item
            );
        });
        builder.addCase(getItems.fulfilled, (state, action: PayloadAction<Item[]>) => {
            return action.payload;
        });
    },
});

export default itemSlice.reducer;