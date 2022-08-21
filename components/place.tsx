import React, { useState, useEffect } from "react";
import { IPlace } from "../models/place";
import { PlaceService } from "../services/PlaceService";
import GMap from "../components/map";

interface IProps {
    id: string;
}

interface IState {
    place: IPlace;
    loading: boolean;
    errorMessage: string;
}

const Place: React.FC<IProps> = ({ id }) => {
    const [state, setState] = useState<IState>({
        loading: false,
        place: {} as IPlace,
        errorMessage: ""
    });

    const { loading, place, errorMessage } = state;

    useEffect(() => {
        if (!id) return;

        setState(state => ({ ...state, loading: true }));

        PlaceService.getPlace(id)
            .then(respose => {
                setState(state => ({
                    ...state,
                    place: respose.data.place || [],
                    loading: false,
                    errorMessage: ""
                }));
            })
            .catch(error => {
                setState(state=>({
                    ...state,
                    loading: false,
                    errorMessage: error.message
                }));
            });
    }, [id]);

    return (
        <React.Fragment>
            <p className="h1 fw-bold text-success">{place.title}</p>
            <p className="text-muted fst-italic">
                {place.address ? place.address.label : ""}
            </p>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <hr />

            {loading && (
                <React.Fragment>
                    <div className="d-flex justify-content-center">
                        <div className="spinner-border" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </React.Fragment>
            )}

            {/* Show google map*/}
            {place.position && (
                <GMap lat={place.position.lat} lng={place.position.lng} />
            )}

            <ul className="list-group shadow-sm">
                {(place.categories || place.foodTypes) && (
                    <li className="list-group-item">
                        <span className="text-secondary h5 fw-bolder">
                            Categories/Food Types
                        </span>
                        <div className="py-2">
                            {place.categories &&
                                place.categories.map((c, i) => (
                                    <div key={i} className="badge bg-success mx-1">
                                        {c.name}
                                    </div>
                                ))}
                            {place.foodTypes &&
                                place.foodTypes.map((c, i) => (
                                    <div key={i} className="badge bg-success mx-1">
                                        {c.name}
                                    </div>
                                ))}
                        </div>
                    </li>
                )}

                {/* Show contact information of the place (if exist), phone,  */}
                {place.contacts && (
                    <li className="list-group-item">
                        <span className="text-secondary h5 fw-bolder">Contacts</span>
                        <div>
                            {place.contacts &&
                                place.contacts.map((c, i) => (
                                    <div key={i} className=" text-muted mx-1 mt-2">
                                        {c.phone && (
                                            <div className="mb-1">
                                                <span className="mx-1 fst-italic">phone:</span>
                                                {c.phone.map((p, index) => (
                                                    <span key={index}>
                                                        {index ? "," : ""}
                                                        <a
                                                            href={`tel:${p.value}`}
                                                            className="text-secondary"
                                                            style={{ textDecoration: "none" }}
                                                        >
                                                            {" "}
                                                            {p.value}{" "}
                                                        </a>
                                                    </span>
                                                ))}
                                            </div>
                                        )}

                                        {c.mobile && (
                                            <React.Fragment>
                                                <span className="mx-1 fst-italic">mobile:</span>
                                                {c.mobile.map((p, index) => (
                                                    <span key={index}>
                                                        {index ? "," : ""}
                                                        <a
                                                            href={`tel:${p.value}`}
                                                            className="text-secondary mx-1"
                                                            style={{ textDecoration: "none" }}
                                                        >
                                                            {" "}
                                                            {p.value}{" "}
                                                        </a>
                                                    </span>
                                                ))}
                                            </React.Fragment>
                                        )}

                                        {c.fax && (
                                            <React.Fragment>
                                                <span className="mx-1 fst-italic">fax:</span>
                                                {c.fax.map((p, index) => (
                                                    <span key={index}>
                                                        {index ? "," : ""}
                                                        <a
                                                            href={`tel:${p.value}`}
                                                            className="text-secondary mx-1"
                                                            style={{ textDecoration: "none" }}
                                                        >
                                                            {" "}
                                                            {p.value}{" "}
                                                        </a>
                                                    </span>
                                                ))}
                                            </React.Fragment>
                                        )}

                                        {c.www && (
                                            <React.Fragment>
                                                <span className="mx-1 fst-italic">website:</span>
                                                {c.www.map((p, index) => (
                                                    <span key={index}>
                                                        {index ? "," : ""}
                                                        <a
                                                            href={
                                                                p.value.indexOf("://") === -1
                                                                    ? `https://${p.value}`
                                                                    : p.value
                                                            }
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="text-primary mx-1"
                                                            style={{ textDecoration: "none" }}
                                                        >
                                                            {p.value}
                                                        </a>
                                                    </span>
                                                ))}
                                            </React.Fragment>
                                        )}

                                        {c.email && (
                                            <React.Fragment>
                                                <span className="mx-1 fst-italic">email:</span>
                                                {c.email.map((p, index) => (
                                                    <span key={index}>
                                                        {index ? "," : ""}
                                                        <a
                                                            href={`mailto:${p.value}`}
                                                            className="text-primary"
                                                            style={{ textDecoration: "none" }}
                                                        >
                                                            {" "}
                                                            {p.value}{" "}
                                                        </a>
                                                    </span>
                                                ))}
                                            </React.Fragment>
                                        )}
                                    </div>
                                ))}
                        </div>
                    </li>
                )}
                {place.openingHours && (
                    <li className="list-group-item">
                        <span className="text-secondary h5 fw-bolder">Opening Hours</span>
                        <div className="px-1">
                            {place.openingHours.map((c, i) => (
                                <div key={i} className=" fst-italic text-secondary mx-1 mt-2">
                                    {c.text &&
                                        c.text.map((t, index) => <div key={index}>{t}</div>)}
                                </div>
                            ))}
                        </div>
                    </li>
                )}
            </ul>

            {false && <code>{JSON.stringify(place)}</code>}
        </React.Fragment>
    );
};

export default Place;
