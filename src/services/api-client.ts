import axios from "axios";

const BASE_URL = "http://10.0.1.207:8000/model";
const url = "http://10.0.1.207:8000";

export interface ValveData {
  tag: string;
  cv_max: number;
  stroke_time: number;
  op: number;
  pv: number;
  cv: number;
}

export interface PumpData {
  tag: string;
  head_rated: number;
  flow_rated: number;
  op: number;
  pv: number;
  stroke_time: number;
}

export interface VesselData {
  tag: string;
  diameter: number;
  height: number;
  v_total: number;
  v_liquid: number;
  p_gas: number;
  v_gas: number;
  q_gas: number;
  p_total: number;
}

export interface ProcessData {
  Source: string;
  Mid1_out: string;
  Mid2_out: string;
  Outlet: string;
}

export interface FireStatus {
  fire: boolean;
}

export interface LeakStatus {
  leak: boolean;
}
export interface FullModelResponse {
  [key: string]: ValveData | PumpData | VesselData;
}

export const getModel = async (): Promise<FullModelResponse> => {
  const response = await axios.get<FullModelResponse>(BASE_URL);
  return response.data;
};

export const postModel = async (
  tag: string,
  attribute: string,
  value: number | boolean
): Promise<void> => {
  await axios.post(`${BASE_URL}/${tag}`, { attribute, value });
};

export const postStart = async (endpoint: string): Promise<void> => {
  await axios.post(`${url}/${endpoint}`);
};

export const getData = async <T>(endpoint: string): Promise<T> => {
  const response = await axios.get<T>(`${url}/${endpoint}`);
  return response.data;
};
