import styled from "styled-components";
import GalleryImgBox from "./GalleryImgBox";
import { Modal, Box } from "@material-ui/core";

export default function GalleryImgModal({
  open,
  handleClose,
  modalData,
  saveFile,
}) {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={BoxStyle}>
        <CloseButtonWrapper>
          <CloseButton onClick={handleClose}>x</CloseButton>
        </CloseButtonWrapper>

        <ModalWrapper>
          {modalData.result ? (
            <ModalImgBox>
              <GalleryImgBox
                result={modalData.result}
                content={modalData.content}
                style={modalData.style}
                download={modalData.download}
              />
            </ModalImgBox>
          ) : null}
          <DownloadButton
            onClick={() => {
              saveFile(modalData.painting_id);
            }}
          >
            다운로드
          </DownloadButton>
        </ModalWrapper>
      </Box>
    </Modal>
  );
}

const DownloadButton = styled.button`
  width: 100px;
  height: 100px;
  border: solid 1px blue;
  font-size: 10px;
`;

const ModalImgBox = styled.div`
  width: 20vw;
  @media only screen and (max-width: 120rem) {
    width: 30vw;
  }
  @media only screen and (max-width: 60rem) {
    width: 40vw;
  }
  @media only screen and (max-width: 35rem) {
    width: 50vw;
  }
`;

const BoxStyle = {
  width: "90vw",
  height: "80vh",
  backgroundColor: "white",
  position: "absolute",
  top: "10vh",
  left: "5vw",
  paddingLeft: "10vw",
  "media only screen and (max-width: 45rem)": {
    height: "30vh",
  },
};

const CloseButton = styled.div`
  float: right;
  width: 3rem;
  font-size: 3em;
`;

const CloseButtonWrapper = styled.div`
  position: relative;
  width: 100%;
  height: "4em";
`;

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  float: left;
`;
