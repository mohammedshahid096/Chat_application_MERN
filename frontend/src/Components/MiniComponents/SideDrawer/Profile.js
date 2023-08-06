import React, { useState } from "react";
import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import Backdrop from "@mui/material/Backdrop";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { LogoutAction } from "../../../Actions/UserAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: window.innerWidth >= 600 ? 400 : 300,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 5,
  p: 4,
  pt: 2,
};

const Profile = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.User);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  //todo ---------------openining $ closing the mode----------------------------
  const [openModel, setOpenModel] = useState(false);
  const handleOpenModel = () => setOpenModel(true);
  const handleCloseModel = () => setOpenModel(false);

  const MainHandlerModelOpen = () => {
    handleClose();
    handleOpenModel();
  };

  const LogoutFunctionAction = () => {
    dispatch(LogoutAction());
  };
  return (
    <>
      <div>
        <Box
          sx={{ display: "flex", alignItems: "center", textAlign: "center" }}
        >
          <Badge badgeContent={4} color="error">
            <NotificationsIcon color="action" fontSize="medium" />
          </Badge>

          <Tooltip title="Account">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Avatar
                sx={{ width: 32, height: 32 }}
                src={user && user.profile.url}
              />
            </IconButton>
          </Tooltip>
        </Box>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          PaperProps={{
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&:before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={MainHandlerModelOpen}>
            <Avatar /> My Profile
          </MenuItem>

          <Divider />
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <PersonAdd fontSize="small" />
            </ListItemIcon>
            Add another account
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={LogoutFunctionAction}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </div>

      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={openModel}
          onClose={handleCloseModel}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
            },
          }}
        >
          <Fade in={openModel}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                My Profile :
              </Typography>
              <Box
                id="transition-modal-description"
                sx={{ mt: 2, d: "flex", height: 200 }}
              >
                <img src={user && user.profile.url} alt="user" />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 2,
                }}
              >
                <Box>
                  <Typography fontWeight="bold">Name : </Typography>
                  <Typography fontWeight="bold">Email : </Typography>
                </Box>

                <div>
                  <Typography fontWeight="light">
                    {user && user.name}
                  </Typography>
                  <Typography fontWeight="light">
                    {user && user.email}
                  </Typography>
                </div>
              </Box>

              <Box sx={{ display: "flex", justifyContent: "end", mt: 2 }}>
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleCloseModel}
                >
                  Close
                </Button>
              </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    </>
  );
};

export default Profile;
