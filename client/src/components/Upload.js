import React, { useState, useRef } from "react";
import Dropzone from "react-dropzone";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Send, Backup } from "@material-ui/icons";
import styled, { css } from "styled-components";

export default function Upload({
  file,
  setFile,
  previewSrc,
  setPreviewSrc,
  isPreviewAvailable,
  setIsPreviewAvailable,
  errorMsg,
  setErrorMsg,
  setOpen,
}) {
  const dropRef = useRef(); // React ref for managing the hover state of droppable area

  const onDrop = (files) => {
    console.log("files", files[0]);
    if (!files[0]) {
      setErrorMsg("Image type should be one of JPEG, JPG and PNG.");
      setOpen(true);
    } else {
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
      dropRef.current.style.borderRadius = "20px";
    }
  };

  const updateBorder = (dragState) => {
    if (dragState === "over") {
      dropRef.current.style.border = "2px solid #000";
      dropRef.current.style.borderRadius = "20px";
    } else if (dragState === "leave") {
      dropRef.current.style.border = "2px dashed #e9ebeb";
      dropRef.current.style.borderRadius = "20px";
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
            accept=".jpg, .jpeg, .png"
          >
            {({ getRootProps, getInputProps }) => (
              <UploadContainer
                {...getRootProps({ className: "drop-zone" })}
                ref={dropRef}
                Upload
              >
                <input {...getInputProps()} />

                <Text active={file}>
                  <Backup />
                  <p>
                    <strong>Drop or Select your file here</strong>
                  </p>
                  <p>
                    <strong>to upload</strong>
                  </p>
                </Text>
              </UploadContainer>
            )}
          </Dropzone>
        </ImageContainer>
        {previewSrc && isPreviewAvailable && (
          <UploadContainer className="image-preview" Image>
            <img
              className="preview-image"
              src={previewSrc}
              alt="Preview"
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </UploadContainer>
        )}
      </Container>
    </>
  );
}

const Container = styled.div`
  position: relative;
  width: 30vw;
  height: 30vw;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 20px;
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
      transition: all 1s;
      :hover {
        cursor: pointer;
        background: #d3d3d3;
        border-radius: 20px;
        opacity: 0.7;
      }
    `}

  ${(props) =>
    props.Image &&
    css`
      position: absolute;
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
      transition: all 1s;
      :hover {
        visibility: visible;
        color: #000;
      }
    `}
`;
