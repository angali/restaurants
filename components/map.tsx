import React from 'react'
import { GOOGLE_MAPS_API_KEY } from '../config'
interface IProps {
    lat: number;
    lng: number;
}
const apiKey = GOOGLE_MAPS_API_KEY;

const GMap: React.FC<IProps> = ({ lat, lng }) => (

    <iframe
        className="shadow-lg"
        width="100%"
        height="250"
        frameBorder="0"
        loading="lazy"
        allowFullScreen
        src={`https://www.google.com/maps/embed/v1/place?key=${apiKey}&q= ${lat},${lng}`}>
    </iframe>

);

export default React.memo(GMap);
