export interface SliceState {
  status: "idle" | "loading" | "succeeded" | "failed",
  error: string | null,
}

export const initialState: SliceState = {
  status: "idle",
  error: null,
};
