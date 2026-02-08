import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import basicService from "./basicService";
import { displayError } from "../error";

const initialState = {
	loading: false,
	settings: {},
	error: null,
	user_details: null,
	investments: {},
	projects: {},
	types: [],
};

export const loadSettings = createAsyncThunk(
	"basic/settings",
	async (_, thunkAPI) => {
		try {
			const res = await basicService.loadSettings();
			return res.data;
		} catch (error) {
			const message = displayError(error, false);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const loginInvestor = createAsyncThunk(
	"basic/auth",
	async (data, thunkAPI) => {
		try {
			const res = await basicService.loginInvestor(data);
			return res.data;
		} catch (error) {
			const message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const listInvestments = createAsyncThunk(
	"basic/investments",
	async (data, thunkAPI) => {
		try {
			const res = await basicService.getInvestments(data.id);
			return res.data;
		} catch (error) {
			const message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const listProperties = createAsyncThunk(
	"basic/properties",
	async (data, thunkAPI) => {
		try {
			const res = await basicService.loadProperties(
				data.status,
				data.types,
				data.location
			);
			return res.data;
		} catch (error) {
			const message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const listTypes = createAsyncThunk(
	"basic/types",
	async (_, thunkAPI) => {
		try {
			const res = await basicService.getTypes();
			return res.data;
		} catch (error) {
			const message = displayError(error, true);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const basicSlice = createSlice({
	name: "basic",
	initialState,
	reducers: {
		logout: (state) => {
			state.user_details = null;
			state.error = null;
			state.loading = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(loadSettings.fulfilled, (state, action) => {
			state.settings = action.payload;
			state.error = null;
		});
		builder.addCase(loadSettings.rejected, (state, action) => {
			state.error = action.payload;
		});
		builder.addCase(loginInvestor.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(loginInvestor.fulfilled, (state, action) => {
			state.user_details = action.payload;
			state.error = null;
		});
		builder.addCase(loginInvestor.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(listInvestments.pending, (state) => {
			state.loading = true;
		});
		builder.addCase(listInvestments.fulfilled, (state, action) => {
			state.investments = action.payload;
			state.error = null;
			state.loading = false;
		});
		builder.addCase(listInvestments.rejected, (state, action) => {
			state.loading = false;
			state.error = action.payload;
		});
		builder.addCase(listProperties.fulfilled, (state, action) => {
			state.projects = action.payload;
		});
		builder.addCase(listTypes.fulfilled, (state, action) => {
			state.types = action.payload;
		});
	},
});

export const { logout } = basicSlice.actions;

export default basicSlice.reducer;
