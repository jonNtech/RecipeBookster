import Chefs from "../components/Chefs";
import Recipes from "../components/Recipes";
import AddChefModal from "../components/AddChefModal";
import AddRecipeModal from "../components/AddRecipeModal";

export default function Home() {
    return (
        <>
            <div className="d-flex gap-3 mb-4">
                <AddChefModal />
                <AddRecipeModal />
            </div>
            <Recipes />
            <br></br>
            <Chefs />
        </>
    );    
}