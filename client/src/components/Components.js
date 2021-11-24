import React from 'react';
import { DropzoneArea } from "material-ui-dropzone";

function Components(props) {
    return (
      <div>
        <DropzoneArea
          acceptedFiles={["image/*"]}
          dropzoneText={"Drag and drop an image here or click"}
          filesLimit={1}
          showPreviews={true}
          onChange={(files) => console.log("Files:", files)}
        />
      </div>
    );
}

export default Components;