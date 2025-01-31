import { observer } from "mobx-react-lite"
import recipeStore, { RecipeType } from "../store/recipeStore"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router";
import { Grid, Box, List, ListItem, ListItemButton, Typography } from "@mui/material";
import { useLocation } from 'react-router-dom';

export default observer(() => {
  const [currentRecpie, setcurrentRecpie] = useState<RecipeType | null>(null);
  const navigate = useNavigate();
  const handleUpdate = (recipe: RecipeType) => {
    setcurrentRecpie(recipe);
    navigate(`${recipe.id}`)
    console.log("select one recipe");
  }

  const hasContent = location.pathname !== '/recipes'; 
  return (
    <Grid container spacing={2} sx={{ height: "100vh", display: "flex", justifyContent: "flex-start",marginTop:"20px"  }}>
      <Grid item xs={4} sx={{ borderRight: "1px solid #ccc", overflowY: "auto", padding: 2, display: "flex", flexDirection: "column", position: "fixed", alignItems: "flex-start",marginLeft:"20px",marginTop:"15px" }}>
        <Typography variant="h6" gutterBottom sx={{ color: "black", display: "inline-block", paddingBottom: "2.5px", paddingLeft: "16px", marginTop: "20px", marginBottom: "10px", position: "relative" }}>
          Popular Recipes:
          <span style={{ position: "absolute", bottom: 0, left: "16px", width: "100%", borderBottom: "2px solid pink" }} />
        </Typography>
        <List>
          {recipeStore.getRecipes.map((recipe) => (
            <ListItem key={recipe.id} disablePadding>
              <ListItemButton onClick={() => handleUpdate(recipe)}>
                {recipe.title}
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Grid>
      <Grid item xs={8} sx={{ padding: 1, marginBottom: 8, display: "flex", justifyContent: "flex-start", marginTop: "5px", marginLeft:"400px"}}>
      <Box display="flex" justifyContent="flex-start" alignItems="center" height="auto" width="88%">
        <div style={{ backgroundColor: "rgba(255, 249, 249, 0.8)", borderRadius: "20px", padding: "30px", width: "90%", minHeight: "400px", textAlign: "center", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
          { !hasContent ? <p>You need to select a recipe to display</p> : <Outlet /> }
        </div>
      </Box>
    </Grid>

    </Grid>
  );
})



