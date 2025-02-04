import { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import recipeStore, { RecipeType } from "../store/recipeStore";
import { observer } from "mobx-react-lite";

const UpdateRecipe = observer(() => {
  const { id } = useParams();
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();
  const original = recipeStore.GetRecipeById(Number(id));
  const { register, handleSubmit, reset, control } = useForm();
  const { fields, append, remove } = useFieldArray({ control, name: "ingredients" });

  const onSubmit = (data: any) => {
    const newRecipe: Partial<RecipeType> = {
      id: original?.id,
      title: data.title || original?.title,
      authorId: data.authorId || original?.authorId,
      description: data.description || original?.description,
      ingredients: data.ingredients?.length ? data.ingredients : original?.ingredients,
      instructions: data.instructions || original?.instructions,
    };
    recipeStore.updateRecipe(newRecipe);
    setClicked(false);
    navigate("/");
    reset({ ingredients: [] });
  };

  const handleModalOpen = () => {
    reset({ ingredients: [] });
    fields.forEach((_field, index) => remove(index));
  };

  const textFieldStyle = {
    '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } },
    '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' }
  };

  return (
    <>
      <Button onClick={() => { handleModalOpen(); setClicked(true); }} variant="contained" sx={{ textTransform: 'none', marginTop: 2.5, borderColor: 'pink', color: 'black', backgroundColor: 'transparent', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' }, '&:active': { backgroundColor: 'transparent', color: 'pink' } }}>
        {`Update Recipe ${original?.title}`}
      </Button>
      <Dialog open={clicked} onClose={() => setClicked(false)} aria-labelledby="dialog-title">
        <DialogTitle id="dialog-title">Update Recipe</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField {...register("title")} type="text" fullWidth label="Recipe Title" variant="outlined" margin="normal" size="small" defaultValue={original?.title} sx={textFieldStyle} />
            <TextField {...register("description")} type="text" fullWidth label="Recipe Description" variant="outlined" margin="normal" size="small" defaultValue={original?.description} sx={textFieldStyle} />
            
            <Typography variant="h6" sx={{ mt: 2 }}>Ingredients:</Typography>
            {fields.map((field, index) => (
              <div key={field.id} style={{ display: "flex", alignItems: "center" }}>
                <TextField {...register(`ingredients.${index}`)} type="text" fullWidth label={`Ingredient #${index + 1}`} variant="outlined" margin="normal" size="small" defaultValue={original?.ingredients[index] || ""} sx={textFieldStyle} />
                <Button type="button" onClick={() => remove(index)} variant="outlined" sx={{ minWidth: '100px', height: '40px', marginLeft: '10px', marginTop: '11px', padding: '6px 10px', borderColor: 'pink', color: 'black', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' } }}>Delete</Button>
              </div>
            ))}
            <Button type="button" onClick={() => append("")} variant="outlined" sx={{ marginTop: '10px', maxWidth: '200px', borderColor: 'pink', color: 'black', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' } }}>Add Ingredient</Button>

            <TextField {...register("instructions")} type="text" fullWidth label="Instructions" variant="outlined" margin="normal" size="small" multiline defaultValue={original?.instructions} sx={textFieldStyle} />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setClicked(false)} variant="outlined" sx={{ height: '40px', borderColor: 'pink', color: 'black', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' } }}>Cancel</Button>
          <Button type="submit" onClick={handleSubmit(onSubmit)} variant="contained" sx={{ height: '40px', borderColor: 'black', backgroundColor: 'white', color: 'pink', '&:hover': { backgroundColor: 'transparent', borderColor: 'pink', color: 'pink' } }}>Update Recipe</Button>
        </DialogActions>
      </Dialog>
    </>
  );
});

export default UpdateRecipe;
