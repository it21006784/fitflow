// AddMedia.js
import React, { useState } from 'react';
import Sidebar from "../components/SideBar";
import NavBar from "../components/NavBar";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 
import '../css/media.css';
import RightSection from "../components/RightSection";

const AddMedia = () => {
  const [description, setDescription] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [videoFiles, setVideoFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [videoPreviews, setVideoPreviews] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles([...imageFiles, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews([...imagePreviews, ...previews]);
  };

  const handleVideoChange = (e) => {
    const files = Array.from(e.target.files);
    setVideoFiles([...videoFiles, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setVideoPreviews([...videoPreviews, ...previews]);
  };

  const handleAddImage = () => {
    document.getElementById('imageInput').click();
  };

  const handleAddVideo = () => {
    document.getElementById('videoInput').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageFiles.length === 0 && videoFiles.length === 0) {
        setErrorMessage('Please upload at least one image or one video.');
        return;
    }

    const formData = new FormData();
    imageFiles.forEach((file) => formData.append('imageFiles', file));
    videoFiles.forEach((file) => formData.append('videoFiles', file));
    formData.append('description', description);

    try {
        const response = await axios.post('http://localhost:8081/api/media/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        console.log('Media uploaded successfully:', response.data);
        setSuccessMessage('Media uploaded successfully!');
        setErrorMessage('');
        setDescription('');
        setImageFiles([]);
        setVideoFiles([]);
        setImagePreviews([]);
        setVideoPreviews([]);
    } catch (error) {
        console.error('Error uploading media:', error);
        console.log('Error details:', error.response);
        setSuccessMessage('');
        setErrorMessage('Error uploading media. Please try again.');
    }
};

  return (
    <>
      <NavBar />
      <div className="container mt-5 d-flex justify-content-center align-items-center">
        <Sidebar />
        <div className="cardm" style={{ width: "760px", height: "800px" }}>
          <div className="card-body">
            <h2 className="card-title text-center font-weight-bold mb-4">Upload Media</h2>
            <div className="form-group">
              <br />
              <br />
              <label>Upload Images:</label>
              <input type="file" id="imageInput" className="form-control-file" accept="image/*" multiple style={{ display: 'none' }} onChange={handleImageChange} />
              <button type="button" className="btn btn-primary mt-2" onClick={handleAddImage}>Add Image</button>
              <div className="preview-container">
                {imagePreviews.map((preview, index) => (
                  <img key={index} src={preview} alt={`Preview ${index}`} className="preview-image-large" />
                ))}
              </div>
            </div>
            <br />
            <div className="form-group">
              <label>Upload Videos:</label>
              <input type="file" id="videoInput" className="form-control-file" accept="video/*" multiple style={{ display: 'none' }} onChange={handleVideoChange} />
              <button type="button" className="btn btn-primary mt-2" onClick={handleAddVideo}>Add Video</button>
              <div className="preview-container">
                {videoPreviews.map((preview, index) => (
                  <video key={index} src={preview} controls className="preview-video-large" />
                ))}
              </div>
            </div>
            <br />
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="description">Description:</label>
                <textarea id="description" className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
              </div>
              <div className="text-center">
                <br />
                <button type="submit" className="btn btn-primary mt-3">Submit</button>
              </div>
            </form>
            {successMessage && <p className="text-success">{successMessage}</p>}
            {errorMessage && <p className="text-danger">{errorMessage}</p>}
          </div>
        </div>
        <RightSection />
      </div>
    </>
  );
};

export default AddMedia;
