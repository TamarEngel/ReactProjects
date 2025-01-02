import { createBrowserRouter } from "react-router-dom";
import AppLayout from "./components/routerComponents/AppLayout";
import GrandFather from "./components/routerComponents/grandFather";
import Father from "./components/routerComponents/father";
import GrandMother from "./components/routerComponents/grandMother";
import Mother from "./components/routerComponents/mother";

export const myRouter=createBrowserRouter([
    {
        path:'/',
        element:<AppLayout/>,
        errorElement:<>main erorr</>,
        children:[
            {
                path:'grandfather',element:<GrandFather/>,
                children:[
                    {
                        path:'father',element:<Father/>
                    }
                ]

            },
            {
                path:'grandmother',element:<GrandMother/>,
                children:[
                    {
                        path:'mother',element:<Mother/>
                    }
                ]

            }
        ]
    }
])