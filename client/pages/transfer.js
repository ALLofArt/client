import { Typography, Modal, Box, Tabs, Tab } from "@material-ui/core";
import { useState } from "react";
import styled from "styled-components";
import Upload from "../src/components/Upload";
import TabPanel from "../src/components/TabPanel";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Transfer() {
  // for content img
  const [contentImg, setContentImg] = useState(null);
  const [contentPreview, setContentPreview] = useState("");
  const [isContentPreview, setIsContentPreview] = useState(false);
  // for style img
  const [styleImg, setStyleImg] = useState(null);
  const [stylePreview, setStylePreview] = useState("");
  const [isStylePreview, setIsStylePreview] = useState(false);
  // for api
  const [errorMsg, setErrorMsg] = useState("");
  const [open, setOpen] = useState(false);
  // tab
  const [contentTab, setContentTab] = useState(0);
  const [styleTab, setStyleTab] = useState(0);

  const handleContentTab = (e, newValue) => {
    setContentTab(newValue);
  };

  const handleStyleTab = (e, newValue) => {
    setStyleTab(newValue);
  };

  const handleClose = () => setOpen(false);

  return (
    <Container>
      {errorMsg && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography
              id="modal-modal-description"
              sx={{ mt: 2, border: "none" }}
            >
              <strong> {errorMsg} </strong>
            </Typography>
          </Box>
        </Modal>
      )}

      <div>
        <h1 style={{ "text-align": "center" }}>Content</h1>
        <Box>
          <Box>
            <Tabs
              value={contentTab}
              onChange={handleContentTab}
              aria-label="content tab"
              centered
            >
              <Tab label="Random" {...a11yProps(0)} />
              <Tab label="Yours" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={contentTab} index={0}>
            <RandomContainer>Random</RandomContainer>
          </TabPanel>
          <TabPanel value={contentTab} index={1}>
            <Upload
              file={contentImg}
              setFile={setContentImg}
              previewSrc={contentPreview}
              setPreviewSrc={setContentPreview}
              isPreviewAvailable={isContentPreview}
              setIsPreviewAvailable={setIsContentPreview}
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              setOpen={setOpen}
            />
          </TabPanel>
        </Box>
      </div>
      <div>
        <h1 style={{ "text-align": "center" }}>Style</h1>
        <Box>
          <Box>
            <Tabs
              value={styleTab}
              onChange={handleStyleTab}
              aria-label="style tab"
              centered
            >
              <Tab label="Random" {...a11yProps(0)} />
              <Tab label="Yours" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <TabPanel value={styleTab} index={0}>
            <RandomContainer>Random</RandomContainer>
          </TabPanel>
          <TabPanel value={styleTab} index={1}>
            <Upload
              file={styleImg}
              setFile={setStyleImg}
              previewSrc={stylePreview}
              setPreviewSrc={setStylePreview}
              isPreviewAvailable={isStylePreview}
              setIsPreviewAvailable={setIsStylePreview}
              errorMsg={errorMsg}
              setErrorMsg={setErrorMsg}
              setOpen={setOpen}
            />
          </TabPanel>
        </Box>
      </div>
    </Container>
  );
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "30%",
  bgcolor: "background.paper",
  border: "2px solid #fff",
  borderRadius: 20,
  boxShadow: 24,
  p: 4,
  textAlign: "center",
  outline: "none",
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 5vh;
  height: 80vh;
  position: relative;

  & > div:first-child {
    margin-right: 3em;
  }
`;

const RandomContainer = styled.div`
  width: 25vw;
  height: 25vw;
  display: flex;
  background: #fff;
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  opacity: 1;
  position: relative;
`;
