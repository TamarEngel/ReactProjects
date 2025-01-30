import { observer } from "mobx-react-lite";
import recipeStore from "../store/recipeStore";
import { Box, Typography, List, ListItem } from "@mui/material";
import { useParams } from "react-router";

const RecipeDetails = observer(() => {
  const { id } = useParams();
  const recipe = recipeStore.GetRecipeById(Number(id));
  return (
    recipe && 
    <Box>
      <Typography variant="h4" gutterBottom>
        {recipe.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {recipe.description}
      </Typography>
      <Typography variant="h6" gutterBottom>
        Ingredients → 
      </Typography>
      <List>
        {recipe.ingredients.map((ingredient, index) => (
          <ListItem key={index}>{ingredient}</ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
      Instructions → 
      </Typography>
      <Typography>{recipe.instructions}</Typography>
    </Box>
  );

});

export default RecipeDetails;
