import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import * as applicationService from "../services/applicationService";

export interface AppInfo {
  _id: string;
  userId: string;
  companyName: string;
  jobTitle: string;
  jobUrl: string;
  dateApplied: string;
  status: string;
  notes?: string;
  flag?: boolean;
}

// export interface ErrorInfo {
//     statusCode: string;
//     error: string;
//     message: string;
// }

// export interface DateInfo {
//   startDate: string | Date;
//   endDate: string | Date;
// }

// Define a type for the slice state
interface ApplicationState {
  applications: AppInfo[];
  application: AppInfo;
}

// Define the initial state using that type
const initialState: ApplicationState = {
  applications: [] as AppInfo[],
  application: {} as AppInfo,
};

export const fetchApplications = createAsyncThunk(
  "application/fetch",
  async (userId: string, thunkAPI) => {
    const response = await applicationService.getApplications(userId);
    return response.applications;
  }
);

export const applicationSlice = createSlice({
  name: "application",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchApplications.fulfilled, (state, action) => {
      state.applications = action.payload.sort(function (
        a: AppInfo,
        b: AppInfo
      ) {
        return (
          new Date(b.dateApplied).valueOf() - new Date(a.dateApplied).valueOf()
        );
      });
    });
  },
});

export const {} = applicationSlice.actions;

export default applicationSlice.reducer;
