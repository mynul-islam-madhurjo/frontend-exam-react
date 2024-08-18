import { createSlice } from '@reduxjs/toolkit';

const appointmentsSlice = createSlice({
    name: 'appointments',
    initialState: [],
    reducers: {
        addAppointment: (state, action) => {
            state.push(action.payload);
        },
    },
});

export const { addAppointment } = appointmentsSlice.actions;
export default appointmentsSlice.reducer;
