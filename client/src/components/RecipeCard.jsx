export default function RecipeCard({ recipe }) {
    return (
        <div className="col-md-6">
            <div className="card mb-3">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                        <h4 className="card-title">{recipe.name}</h4>
                        <a href={`/recipes/${recipe.id}`} className="btn btn-light">View</a>
                    </div>
                    <p className="small">
                        <span className="text-success">{recipe.ingredients.length}</span> ingredients
                    </p>
                </div>
            </div>
        </div>
    );
}