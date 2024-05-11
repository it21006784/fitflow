import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function ViewOneMedia() {
    const [media, setMedia] = useState({});
    const [error, setError] = useState();
    const { mediaId } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:8081/api/media/${mediaId}`)
            .then(response => {
                setMedia(response.data);
            })
            .catch(error => {
                setError(error);
            });
    }, []);

    if (error) return <div className="alert alert-danger">Error: {error.message}</div>;

    return (
        <div className="container mt-4">
            <h3>Media Details</h3>
            <div className="card">
                <div className="card-body">
                    <div className="form-group">
                        <label>Description:</label>
                        <p>{media.description}</p>
                    </div>
                    {media.imageFiles && media.imageFiles.map((image, index) => (
                        <img key={index} src={`data:image/jpeg;base64,${image}`} alt={`Image ${index}`} className="img-fluid" />
                    ))}
                    {media.videoFiles && media.videoFiles.map((video, index) => (
                        <video key={index} controls className="mt-3">
                            <source src={`data:video/mp4;base64,${video}`} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    ))}
                </div>
            </div>
        </div>
    );
}
