import React from 'react';
import { DropzoneArea } from "material-ui-dropzone";

function ImageUpload(props) {
    return (
      <div>
        <DropzoneArea onChange={(files) => console.log("Files:", files)} />
      </div>
    );
}

export default ImageUpload;