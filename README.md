בשרת עשיתי כמה שינויים:
1: recipes.js:
הובפתי פונקצית עדכון זו:
router.put('/', recipeMiddleware, (req, res) => {
    const { title, description, ingredients, instructions } = req.body;
    const recipeId = req.header('recipe-id'); 
    const db = JSON.parse(fs.readFileSync(dbPath));

    const recipe = db.recipes.find(recipe => recipe.id === Number(recipeId));

    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.authorId !== req.header('user-id')) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    recipe.title = title;
    recipe.description = description;
    recipe.ingredients = ingredients;
    recipe.instructions = instructions;

    fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

    res.json({ recipe });
});

export default router;

2:הוספתי קובץ recipeMiddleware
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default (req, res, next) => {
    const recipeId = req.header('recipe-id');
    const userId = req.header('user-id'); 
    const db = JSON.parse(fs.readFileSync(path.join(__dirname, '../db/db.json')));

    const recipe = db.recipes.find(recipe => recipe.id == recipeId);
    
    if (!recipe) {
        return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.authorId !== userId) {
        return res.status(403).json({ message: "Unauthorized" });
    }

    req.recipe = recipe; 
    next();
};

תודה רבה!!!