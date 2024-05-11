import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import NavBar from '../NavBar'; // Import the NavBar component
import { Carousel } from 'react-responsive-carousel'; // Import Carousel component
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import Carousel styles
import '../css/MediaList.css'; // Import CSS file for styling

const MediaList = () => {
    const [mediaList, setMediaList] = useState([]);
    const [deleteId, setDeleteId] = useState(null); // Track the ID of the media to be deleted

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8081/api/media/all');
                setMediaList(response.data);
            } catch (error) {
                console.error('Error fetching media: ', error);
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (mediaId) => {
        try {
            await axios.delete(`http://localhost:8081/api/media/${mediaId}`);
            setMediaList(prevMediaList => prevMediaList.filter(media => media.id !== mediaId));
        } catch (error) {
            console.error('Error deleting media: ', error);
        }
    };

    const confirmDelete = (mediaId) => {
        setDeleteId(mediaId); // Set the ID of the media to be deleted
    };

    const cancelDelete = () => {
        setDeleteId(null); // Reset the delete ID
    };

    const proceedDelete = () => {
        handleDelete(deleteId);
        setDeleteId(null); // Reset the delete ID after deletion
    };

    const handleLike = (mediaId) => {
        // Implement logic to handle liking a media post
    };

    const handleComment = (mediaId) => {
        // Implement logic to handle commenting on a media post
    };

    const handleShare = (mediaId) => {
        // Implement logic to handle sharing a media post
    };

    return (
        <div className='displayFit'>
            {/* <NavBar /> Include the NavBar component */}
            <div className="media-list-container">
                <h2>Media List</h2>
                {mediaList.map(media => (
                    <div key={media.id} className="media-card">
                        <h3 className="media-description">{media.description}</h3>
                        {(media.imageFiles.length > 0 || media.videoFiles.length > 0) && (
                            <Carousel showThumbs={false} showArrows={true} className="media-carousel">
                                {media.imageFiles.map((image, index) => (
                                    <img key={index} className="media-image" src={`data:image/jpeg;base64,${image}`} alt={`Image ${index}`} />
                                ))}
                                {media.videoFiles.map((video, index) => (
                                    <video key={index} className="media-video" controls>
                                        <source src={`data:video/mp4;base64,${video}`} type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                ))}
                            </Carousel>
                        )}
                        <div className="media-actions">
                            <button className="action-button like-button" onClick={() => handleLike(media.id)}>Like</button>
                            <button className="action-button comment-button" onClick={() => handleComment(media.id)}>Comment</button>
                            <button className="action-button share-button" onClick={() => handleShare(media.id)}>Share</button>
                        </div>
                        <button className="delete-button" onClick={() => confirmDelete(media.id)}>Delete</button>
                        {deleteId === media.id && (
                            <div className="delete-confirmation">
                                <p>Are you sure you want to delete this post?</p>
                                <button onClick={proceedDelete}>Yes</button>
                                <button onClick={cancelDelete}>No</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MediaList;
