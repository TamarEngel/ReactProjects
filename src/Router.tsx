import { createBrowserRouter } from "react-router";
import AppLayout from "./components/routerComponents/AppLayout";
import RecipesList from "./components/recipesList";
import RecipeDetails from "./components/recipeDetails";
import AddRecipeForm from "./components/addRecipeForm";
import UserRecipes from "./components/UserRecipes";
import UpdateRecipe from "./components/UpdateRecipe";

export const myRouter=createBrowserRouter([
    {
        path:'/',
        element:<AppLayout/>,
        errorElement:<>main erorr</>,
        children:[
            {
                path:'recipes/',element:<RecipesList/>,
                children:[
                    {
                        path:':id',element:<RecipeDetails/>
                    }
                ]

            },
            {
                path: 'addRecipe', element: <AddRecipeForm />
            },
            {
                path: 'MyRecipe', element: <UserRecipes />,children: [ {

                    path: ':id', element: <UpdateRecipe/>
                }]
            },
        ]
    }
])