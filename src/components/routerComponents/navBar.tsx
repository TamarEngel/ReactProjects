import { useContext, useState } from "react";
import { IconButton, Drawer, List, ListItem, ListItemText, Box } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import { Link } from "react-router";
import { userContext } from "../HomePage";
import {Home,AddCircle,Fastfood } from '@mui/icons-material';

const NavBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const context = useContext(userContext);
  const menuItems = [
    { text: "Home", path: "/",icon: Home },
    { text: "recipes", path: "/recipes",icon: Fastfood },
  ];
  
  if (context?.user?.id) {
    menuItems.push({ text: "addRecipe", path: "/addRecipe",icon:AddCircle });
    menuItems.push({ text: "My Recipes", path: "/MyRecipe",icon:AddCircle });

  }
  const toggleDrawer = (open: boolean) => () => {
    setIsDrawerOpen(open);
  };
  return (
    <>
      <Box sx={{ position: "fixed", top: 10, right: 10, zIndex: 1000 }}>
        <IconButton color="primary" onClick={toggleDrawer(true)} sx={{ marginRight: "20px", color: "black", backgroundColor: "transparent", padding: "6px", boxSizing: "border-box", "&:hover": { backgroundColor: "transparent", border: "2px solid pink", borderRadius: "50%", color: "pink" }, "&:active": { backgroundColor: "transparent", color: "pink" } }}>
          <MenuIcon fontSize="large" />
        </IconButton>
      </Box>

      <Drawer anchor="right" open={isDrawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 200, height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: 2, borderLeft: "5px solid pink" }} role="presentation" onClick={toggleDrawer(false)} onKeyDown={toggleDrawer(false)}>
          <List sx={{ width: "100%" }}>
            {menuItems.map((item, index) => (
              <ListItem key={index} component={Link} to={item.path} sx={{ textAlign: "center", "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.1)", transform: "scale(1.05)" } }}>
                <IconButton sx={{ color: "black", marginRight: 2 }}><item.icon /></IconButton> 
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


