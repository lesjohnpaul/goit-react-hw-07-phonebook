import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_URL = 'https://66345bc49bb0df2359a14e22.mockapi.io/api/contacts';

// Async thunks
export const fetchContacts = createAsyncThunk('contacts/fetchAll', async () => {
  const response = await fetch(API_URL);
  return response.json();
});

export const addContact = createAsyncThunk('contacts/addContact', async (contact) => {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(contact)
  });
  return response.json();
});

export const deleteContact = createAsyncThunk('contacts/deleteContact', async (contactId) => {
  await fetch(`${API_URL}/${contactId}`, { method: 'DELETE' });
  return contactId;  // Return the id on success to filter it out from the state
});

// Slice
const contactsSlice = createSlice({
  name: 'contacts',
  initialState: {
    items: [],
    isLoading: false,
    error: null,
    filter: ''
  },
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, state => { state.isLoading = true; })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  }
});

export const { setFilter } = contactsSlice.actions;
export default contactsSlice.reducer;
