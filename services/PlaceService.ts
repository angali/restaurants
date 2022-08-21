import axios from "axios";
import { API } from "../config";

//This class is responsible to communicate with server side API endpoints
export class PlaceService {
  public static getAllPlaces(latitude: number, longitude: number) {
    const dataURL: string = `${API}/places`;
    const q = "restaurant";

    return axios.post(dataURL, { latitude, longitude, q });
  }

  public static getPlace(id: string) {
    const dataURL: string = `${API}/place`;

    return axios.post(dataURL, { id });
  }
}
