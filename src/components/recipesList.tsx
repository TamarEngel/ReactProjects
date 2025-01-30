import { observer } from "mobx-react-lite"
import recipeStore, { RecipeType } from "../store/recipeStore"
import { useState } from "react"
import { Outlet, useNavigate } from "react-router";
import { Grid, Box, List, ListItem, ListItemButton, Typography } from "@mui/material";

export default observer(() => {
  const [currentRecpie, setcurrentRecpie] = useState<RecipeType | null>(null);
  const navigate = useNavigate();
  const handleUpdate = (recipe: RecipeType) => {
    setcurrentRecpie(recipe);
    navigate(`${recipe.id}`)
    console.log("select one recipe");
  }
  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <Grid item xs={4} sx={{ borderRight: "1px solid #ccc", overflowY: "auto", padding: 2 }}>
        <Typography variant="h5" gutterBottom>
          כל המתכונים
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
      <Grid item xs={8} sx={{ padding: 2, marginBottom: 10 }}>
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
})



