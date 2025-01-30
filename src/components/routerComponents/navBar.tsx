import { useContext, useState } from "react";
import { IconButton, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router";
import { userContext } from "../UserProvider";

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const context = useContext(userContext);
  const menuItems = [
    { text: "Home", path: "/" },
    { text: "recipes", path: "/recipes" },
  ];
  if (context?.user?.id) {
    menuItems.push({ text: "addRecipe", path: "/addRecipe" });
  }
  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };
  return (
    <>
      <Box sx={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}>
        <IconButton color="primary" onClick={toggleDrawer(true)} sx={{ color: "black", backgroundColor: "transparent", padding: "6px", boxSizing: "border-box", "&:hover": { backgroundColor: "transparent", border: "2px solid pink", borderRadius: "50%", color: "pink" }, "&:active": { backgroundColor: "transparent", color: "pink" } }}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>
      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 200, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 2 }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List sx={{ width: "100%" }}>
            {menuItems.map((item, index) => (
              <ListItem key={index} component={Link} to={item.path} sx={{ textAlign: "center", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)", transform: "scale(1.05)" } }}>
                <ListItemText primary={item.text} sx={{ color: "black", "&:hover": { color: "pink" } }} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};
export default NavBar;


