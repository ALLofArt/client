import React, { useState, useRef } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Send } from "@material-ui/icons";
import styled, { css } from "styled-components";

export default function Upload() {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const onDrop = (files) => {
    const [uploadedFile] = files;
    setFile(uploadedFile);
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewSrc(fileReader.result);
    };
    fileReader.readAsDataURL(uploadedFile);
    setIsPreviewAvailable(
      uploadedFile.name.match(/\.(jpeg|JPEG|jpg|JPG|png|PNG)$/),
    );
    dropRef.current.style.border = "2px dashed #e9ebeb";
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
    }
  };
  return (
    <>
      <Container>
        <ImageContainer>
          <Dropzone
            onDrop={onDrop}
            onDragEnter={() => updateBorder("over")}
            onDragLeave={() => updateBorder("leave")}
          >
            {({ getRootProps, getInputProps }) => (
              <UploadContainer
                {...getRootProps({ className: "drop-zone" })}
                ref={dropRef}
                Upload
              >
                <input {...getInputProps()} />

                <Text active={file}>
                  <p>
                    <strong>Drop or Select your file here</strong>
                  </p>
                  <p>
                    <strong>to starting uploading</strong>
                  </p>
                </Text>
              </UploadContainer>
            )}
          </Dropzone>
        </ImageContainer>
        {previewSrc && (
          <UploadContainer className="image-preview" Image>
            <img
              className="preview-image"
              src={previewSrc}
              alt="Preview"
              style={{ maxWidth: "400px", maxHeight: "300px" }}
            />
          </UploadContainer>
        )}
      </Container>
      <div>
        <Button
          variant="contained"
          size="large"
          endIcon={<Send />}
          type="submit"
        >
          Analyze
        </Button>
      </div>
    </>
  );
}

const Container = styled.div`
  position: relative;
  width: 400px;
  height: 400px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  background: #fff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  opacity: 1;
  position: relative;
`;

const UploadContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.Upload &&
    css`
      z-index: 2;
      :hover {
        cursor: pointer;
        background: #d3d3d3;
        opacity: 0.7;
      }
    `}

  ${(props) =>
    props.Image &&
    css`
      position: absolute;
      /* top: 0;
      left: 0; */
      z-index: 1;
    `}
`;

const Text = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  visibility: visible;
  ${(props) =>
    props.active &&
    css`
      color: transparent;
      :hover {
        visibility: visible;
        color: #000;
      }
    `}
`;
