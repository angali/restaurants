/* This component shows list of nearest places (restaurants) */
import React, { useState, useEffect } from 'react';
import { IPlace } from '../models/place';
import { PlaceService } from '../services/PlaceService'
import Link from 'next/link';
import { usePosition } from '../hooks/usePosition';

interface IProps { }

interface IState {
    loading: boolean;
    places: IPlace[];
    errorMessage: string;
}

const Places: React.FC<IProps> = () => {

    const [state, setState] = useState<IState>({
        loading: false,
        places: [] as IPlace[],
        errorMessage: ''
    });

    const { latitude, longitude, positionError } = usePosition();

    const {
        loading,
        places,
        errorMessage
    } = state;

    useEffect(() => {

        setState(state=>({ ...state, loading: true }))

        PlaceService.getAllPlaces(latitude, longitude)
            .then(respose => {
                setState(state =>({
                    ...state,
                    places: respose.data.places.items || [],
                    loading: false,
                    errorMessage: ''
                }))
            })
            .catch(error => {

                setState(state =>({
                    ...state,
                    loading: false,
                    errorMessage: error.message
                }))

            })

    }, [latitude, longitude]);


    // if distance bigger than 1000m then we show km
    const getDistance = (distance: number): string => {
        if (distance < 1000)
            return `${distance}m`;
        else
            if (distance < 5000)
                return `${distance / 1000}km`;
            else
                return `${Math.round(distance / 1000)}km`;
    }

    /* render list of the places (restaurants) */
    const restaurantList = (): JSX.Element[] => (

        places.map((place, i) =>
            <Link key={i} href={`/place/${place.id}`}>
                <button className="bg-light col-md-10 offset-md-1 p-3 mb-1 rounded-1 border-0 text-start col-12 shadow-lg">
                    <div className="row">
                        <div className="col-8">
                            <h3 className=" text-dark fw-bold"> {place.title}</h3>

                            <h4 className="lead text-secondary"> {place.address.city}</h4>

                            {
                                place.openingHours &&
                                place.openingHours.map((c, i) => (
                                    <div key={i} className={`fs-6 ${c.isOpen ? 'text-success' : 'text-danger'} mx-1`}>
                                        {c.isOpen ? 'Open' : 'Closed'}<span className="text-secondary"> - {c.text && c.text[0]}</span>
                                    </div>

                                ))
                            }

                            {
                                place.categories &&
                                place.categories.map((c, i) => (
                                    <div key={i} className="badge bg-success mx-1 mt-2">{c.name}</div>
                                ))
                            }
                            {
                                place.foodTypes &&
                                place.foodTypes.map((c, i) => (
                                    <div key={i} className="badge bg-success mx-1">{c.name}</div>
                                ))
                            }

                        </div>
                        <div className="col-4 text-end text-secondary">
                            <h4 className="text">{getDistance(place.distance)}</h4>

                        </div>

                    </div>
                </button>
            </Link>
        )
    )

    return (
        <React.Fragment>
            <p className="h1 fw-bold text-success">
                Nearby Restaurants
            </p>

            <p className="text-muted fst-italic">Discovering nearest restaurants</p>

            {/* show an alert if there is any error */}
            {positionError && <div className="alert alert-danger">{positionError}</div>}
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

            <hr />

            {/* show loading spiner */}
            {loading || (!latitude && !longitude && !positionError) &&
                <React.Fragment>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </React.Fragment>
            }

            {restaurantList()}

        </React.Fragment>
    )
}

export default Places;