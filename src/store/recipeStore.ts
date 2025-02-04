import { action, makeAutoObservable } from "mobx"
import axios, { AxiosError } from "axios"

export type RecipeType = {
    id?: number;
    title: string;
    description: string;
    authorId: number;
    ingredients: string[];
    instructions: string;
};
class RecipeStore {
    list: RecipeType[] = [];
    currentRecpie: RecipeType | null = null;
    constructor() {
        makeAutoObservable(this)
        this.fetchRecipes();
    }
    fetchRecipes = action(async () => {
        try {
            const res = await axios.get(`http://localhost:3000/api/recipes`, {});
            this.list = res.data;
            console.log(res.data);

        } catch (e) {
            console.error("Error fetching recipes:", e);
        }
    });
    get getRecipes() {
        return this.list
    }
    addRecipe = action(async (newRecipe: RecipeType) => {
        try {
            const res = await axios.post(`http://localhost:3000/api/recipes`, newRecipe, {
                headers: {
                    'user-id': newRecipe.authorId
                }
            });
            this.list.push(res.data.recipes)
        } catch (e) {
            if ((e as AxiosError).response && (e as AxiosError).response?.status === 401)
                alert('מייל או סיסמא לא תקינים')
            if ((e as AxiosError).response && (e as AxiosError).response?.status === 403)
                alert('יש להתחבר בכדי להכניס מתכון ')
            console.log(e);
        }
    });
    
    updateRecipe = action(async (newRecipe: Partial<RecipeType>) => {
        try {
            console.log(newRecipe.id);
            console.log(newRecipe.authorId);
            await axios.put("http://localhost:3000/api/recipes", newRecipe, {
                headers: {
                    'recipe-id': newRecipe.id, 
                    'user-id': newRecipe.authorId
                },
            });
            this.fetchRecipes();
        } catch (e: any) {
            if (e.status === 401 || e.response === 403 || e.response === 4000)
                alert("User Not found")
            if (e.status === 403)
                alert('problem in connection')
            console.log(e);
        }
    });

    GetRecipeById(id: number): RecipeType | undefined {
        return this.list.find(t => t.id === id);
    }
}

export default new RecipeStore()


