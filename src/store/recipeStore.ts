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
            //this.list.push(res.data.recipes)
            this.fetchRecipes()
        } catch (e) {
            if ((e as AxiosError).response && (e as AxiosError).response?.status === 401)
                alert('מייל או סיסמא לא תקינים')
            if ((e as AxiosError).response && (e as AxiosError).response?.status === 403)
                alert('יש להתחבר בכדי להכניס מתכון ')
            console.log(e);
        }
    });
    GetRecipeById(id: number): RecipeType | undefined {
        return this.list.find(t => t.id === id);
    }
}

export default new RecipeStore()


