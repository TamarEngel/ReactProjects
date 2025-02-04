import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import {Grid,Box,List,ListItem,ListItemButton,Typography,} from "@mui/material";
import { toJS } from "mobx";
import recipeStore, { RecipeType } from "../store/recipeStore";
import { UserContext } from "./HomePage";

export default observer(() => {
  const [currentRecpie, setcurrentRecpie] = useState<RecipeType | null>(null);

  const navigate = useNavigate();
  const userCon = useContext(UserContext)
    if (!userCon)
        throw new Error("ERROR Profile must be used within a UserContext.Provider")
  const recipes = toJS(recipeStore.getRecipes);
  const userRecipes = recipes.filter((recipe) => {
    return String(recipe.authorId) === String(userCon.user?.id);
  });

  const handleUpdate = (recipe: RecipeType) => {
    setcurrentRecpie(recipe);
    navigate(`${recipe.id}`);
  };

  return (
    <Grid container spacing={2} sx={{ height: "100vh" }}>
      <Grid
        item
        xs={4}
        sx={{
          borderRight: "1px solid",
          padding: 2,
          backgroundColor: "#ffffffa3",
        }}
      >
        <Typography variant="h5" gutterBottom>
          My Recipes
        </Typography>
        <List>
          {userRecipes.length > 0 ? (
            userRecipes.map((recipe) => (
              <ListItem key={recipe.id} disablePadding>
                <ListItemButton onClick={() => handleUpdate(recipe)}>
                  {recipe.title}
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <Typography variant="h6" color="error">
              There is no avialable recipes to this user{" "}
            </Typography>
          )}
        </List>
      </Grid>
      <Grid item xs={8} sx={{ padding: 2, marginBottom: 10, width: 800 }}>
        {currentRecpie != null && (
          <div
            style={{
              backgroundColor: "#fffffff7",
              padding: "39px",
              borderRadius: "10px",
              boxShadow: "-2px -1px 9px 3px #b2acac7a",
              margin: "16px",
              textAlign: "center",
              width: "800px",
            }}
          >
            <Box height="100%">
              <Outlet />
            </Box>
          </div>
        )}
      </Grid>
    </Grid>
  );
});
