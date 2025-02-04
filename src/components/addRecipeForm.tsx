import { object, string, array } from "yup";
import { SubmitHandler, useForm, useFieldArray } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import recipeStore, { RecipeType } from "../store/recipeStore";
import { useContext, useState } from "react";
import { UserContext } from "./HomePage";
import { TextField, Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router";

const schema = object({
    title: string().required('Recipe title is required'),
    description: string().required('Recipe description is required'),
    ingredients: array()
        .of(string().required("Ingredient must be filled"))
        .min(1, "At least one ingredient is required"),
    instructions: string().required('Instructions are required'),
});
const AddRecipeForm = observer(() => {
    const navigate = useNavigate();
    const [click, setClick] = useState(true);
    const userCon = useContext(UserContext);
    if (!userCon) throw new Error("ERROR Profile must be used within a UserContext.Provider");
    const {register,handleSubmit,reset,control,formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            ingredients: ["", "", ""],
        },
    });
    const { fields, append, remove } = useFieldArray({
        name: "ingredients",
        control,
    });
    const onSubmit: SubmitHandler<Partial<RecipeType>> = (data) => {
        const newRecipe: RecipeType = {
            authorId: userCon.user?.id || 0,
            title: data.title || "",
            description: data.description || "",
            ingredients: data.ingredients || [],
            instructions: data.instructions || "",
        };
        recipeStore.addRecipe(newRecipe);
        setClick(false);
        navigate("/")
        reset({
            ingredients: []
        });
    };
    const close = () => {
        setClick(false);
        navigate("/")
    }
    return (
        <Dialog open={click} onClose={close}>
            <DialogTitle>Add Recipe</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <TextField fullWidth label="Recipe Title" variant="outlined" margin="normal" size="small" {...register('title')} error={!!errors.title} helperText={errors.title?.message} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <TextField fullWidth label="Recipe Description" variant="outlined" margin="normal" size="small" {...register('description')} error={!!errors.description} helperText={errors.description?.message} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <div>
                        <h4>Ingredients:</h4>
                        {fields.map((field, index) => (<div key={field.id} style={{ display: 'flex', alignItems: 'center' }}>
                        <TextField fullWidth label={`Ingredient #${index + 1}`} variant="outlined" margin="normal" size="small" {...register(`ingredients.${index}`)} error={!!errors.ingredients} helperText={errors.ingredients?.message} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                        <Button type="button" onClick={() => remove(index)} variant="outlined" color="primary" sx={{ minWidth: '100px', height: '40px', marginLeft: '10px', marginTop: '11px', padding: '6px 10px', borderColor: 'pink', color: 'black', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' } }}>
                            Delete
                        </Button></div>))}
                        <Button type="button" onClick={() => append("")} variant="outlined" color="primary" sx={{ marginTop: '10px', maxWidth: '200px', borderColor: 'pink', color: 'black', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' } }}>
                            Add Ingredient
                        </Button>
                    </div>
                    <TextField fullWidth label="Instructions" variant="outlined" margin="normal" size="small" {...register('instructions')} error={!!errors.instructions} helperText={errors.instructions?.message} sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#B0B0B0' }, '&:hover fieldset': { borderColor: 'pink' }, '&.Mui-focused fieldset': { borderColor: 'pink' } }, '& .MuiInputLabel-root': { color: '#B0B0B0' }, '& .MuiInputLabel-root.Mui-focused': { color: 'black' } }} />
                    <DialogActions>
                        <Button type="button" onClick={close} variant="outlined" color="primary" size="small" sx={{ height: '40px', borderColor: 'pink', color: 'black', '&:hover': { backgroundColor: 'transparent', borderColor: 'black', color: 'pink' } }}>
                            Cancel
                        </Button>
                        <Button type="submit" variant="outlined" color="primary" size="small" sx={{ height: '40px', borderColor: 'black', backgroundColor: 'white', color: 'pink', '&:hover': { backgroundColor: 'transparent', borderColor: 'pink', color: 'pink' } }}>
                            Add Recipe
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>
        </Dialog>
    );
});

export default AddRecipeForm;
