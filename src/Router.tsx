import { createBrowserRouter } from "react-router";
import AppLayout from "./components/routerComponents/AppLayout";
// import GrandFather from "./components/routerComponents/grandFather";
// import Father from "./components/routerComponents/father";
// import GrandMother from "./components/routerComponents/grandMother";
// import Mother from "./components/routerComponents/mother";
//import {createBrowserRouter } from "react-router";
import RecipesList from "./components/recipesList";
import RecipeDetails from "./components/recipeDetails";
import AddRecipeForm from "./components/addRecipeForm";

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
        ]
    }
])