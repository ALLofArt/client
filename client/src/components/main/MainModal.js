import {
  Typography,
  Backdrop,
  Modal,
  Fade,
  Button,
  Box,
} from "@material-ui/core";
export default function MainModal({open,handleClose}) {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "30rem",
    bgcolor: "black",
    borderRadius: "1rem",
    color: "white",
    p: 4,
  };
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
             위아래로 스크롤 하면서 카드를 클릭하세요!
          </Typography>
          <Button onClick={handleClose}>Close</Button>
        </Box>
      </Fade>
    </Modal>
  );
}
