import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from "../components/SideBar";
import NavBar from "../components/NavBar";
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import '../css/MediaList.css';
import RightSection from "../components/RightSection";
import { FaHeart, FaComment, FaEdit, FaShare } from "react-icons/fa";
import swal from 'sweetalert';
import { useNavigate } from 'react-router-dom';

const MediaList = () => {
    const [mediaList, setMediaList] = useState([]);
    const [deleteId, setDeleteId] = useState(null);
    const [editedDescription, setEditedDescription] = useState("");
    const [editModeId, setEditModeId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await axios.get('http://localhost:8081/api/media/all');
                setMediaList(response.data);
            } catch (error) {
                console.error('Error fetching media: ', error);
                swal({
                    icon: 'error',
                    title: 'Error',
                    text: 'An error occurred while fetching the media list.',
                    button: 'OK',
                });
            }
        }
        fetchData();
    }, []);

    const handleDelete = async (mediaId) => {
        try {
            await axios.delete(`http://localhost:8081/api/media/${mediaId}`);
            setMediaList(prevMediaList => prevMediaList.filter(media => media.id !== mediaId));
            swal({
                icon: 'success',
                title: 'Post deleted successfully!',
                button: 'OK',
            });
            navigate("/MediaList");
        } catch (error) {
            console.error('Error deleting media: ', error);
            swal({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while deleting the post.',
                button: 'OK',
            });
        }
    };

    const confirmDelete = (mediaId) => {
        setDeleteId(mediaId);
    };

    const cancelDelete = () => {
        setDeleteId(null);
    };

    const proceedDelete = () => {
        handleDelete(deleteId);
        setDeleteId(null);
    };

    const handleLike = async (mediaId) => {
        try {
            await axios.post(`http://localhost:8081/api/media/${mediaId}/like`);
            setMediaList(prevMediaList => {
                return prevMediaList.map(media => {
                    if (media.id === mediaId) {
                        return { ...media, likes: (media.likes || 0) + 1 };
                    }
                    return media;
                });
            });
        } catch (error) {
            console.error("Error liking media:", error);
            swal({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while liking the post.',
                button: 'OK',
            });
        }
    };

    const handleComment = (mediaId) => {
        setMediaList(prevMediaList => {
            return prevMediaList.map(media => {
                if (media.id === mediaId) {
                    return { ...media, commented: true };
                }
                return media;
            });
        });
    };

    const handleShare = (mediaId) => {
        // Implement logic to handle sharing a media post
    };

    const handleEditDescription = (mediaId, description) => {
        setEditedDescription(description);
        setEditModeId(mediaId);
    };

    const handleSaveDescription = async (mediaId) => {
        try {
            await axios.put(`http://localhost:8081/api/media/${mediaId}/description`, null, {
                params: {
                    description: editedDescription
                }
            });
            setMediaList(prevMediaList => {
                return prevMediaList.map(media => {
                    if (media.id === mediaId) {
                        return { ...media, description: editedDescription };
                    }
                    return media;
                });
            });
            setEditModeId(null);
            swal({
                icon: 'success',
                title: 'Description updated successfully!',
                button: 'OK',
            });
            navigate("/MediaList");
        } catch (error) {
            console.error('Error updating description: ', error);
            swal({
                icon: 'error',
                title: 'Error',
                text: 'An error occurred while updating the description.',
                button: 'OK',
            });
        }
    };

    return (
        <>
            <NavBar />
            <div className='displayFit'>
                <div className="media-list-container">
                    <Sidebar />
                    {mediaList.map(media => (
                        <div key={media.id} className="media-card">
                            {editModeId === media.id ? (
                                <input
                                    type="text"
                                    value={editedDescription}
                                    onChange={(e) => setEditedDescription(e.target.value)}
                                />
                            ) : (
                                <h3 className="media-description">{media.description}</h3>
                            )}
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
                                <div className="like-container">
                                    <button className="action-button like-button" onClick={() => handleLike(media.id)}><FaHeart /></button>
                                    <span className="like-count">{media.likes || 0}</span>
                                </div>
                                <button className="action-button comment-button" onClick={() => handleComment(media.id)}><FaComment /></button>
                                <button className="action-button share-button" onClick={() => handleShare(media.id)}><FaShare /></button>
                                <button className="action-button edit-button" onClick={() => handleEditDescription(media.id, media.description)}><FaEdit /></button>
                            </div>
                            <button className="delete-button" onClick={() => confirmDelete(media.id)}>Delete</button>
                            {deleteId === media.id && (
                                <div className="delete-confirmation">
                                    <p>Are you sure you want to delete this post?</p>
                                    <button onClick={proceedDelete}>Yes</button>
                                    <button onClick={cancelDelete}>No</button>
                                </div>
                            )}
                            {editModeId === media.id && (
                                <button className="save-button" onClick={() => handleSaveDescription(media.id)}>Save</button>
                            )}
                        </div>
                    ))}
                </div>
                <RightSection />
            </div>
        </>
    );
};

export default MediaList;
