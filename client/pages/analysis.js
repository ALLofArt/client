import Upload from "../src/components/Upload";
import axios from "axios";
import { Button } from "@material-ui/core";
import { Send, Backup } from "@material-ui/icons";
import { useState } from "react";

export default function analysis() {
  const [file, setFile] = useState(null); // state for storing actual image
  const [previewSrc, setPreviewSrc] = useState(""); // state for storing previewImage
  const [isPreviewAvailable, setIsPreviewAvailable] = useState(false); // state to show preview only for images
  return (
    <div>
      <h1>Look for the painter style</h1>
      <p>내가 그린 그림을 업로드하고,</p>
      <p>내 그림이 어떤 유명한 화가의 화풍과 얼마나 유사한지 확인해보세요.</p>
      <Upload
        file={file}
        setFile={setFile}
        previewSrc={previewSrc}
        setPreviewSrc={setPreviewSrc}
        isPreviewAvailable={isPreviewAvailable}
        setIsPreviewAvailable={setIsPreviewAvailable}
      />
      <Button variant="contained" size="large" endIcon={<Send />} type="submit">
        Analyze
      </Button>
    </div>
  );
}
