const Recipe = require('../models/Recipe')
const Chef = require('../models/Chef')

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLList,
    GraphQLNonNull,
    GraphQLEnumType,
} = require('graphql')

// RECIPE TYPES
const RecipeType = new GraphQLObjectType({
    name: 'Recipe',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        intgretients: { type: GraphQLString },
        steps: { type: GraphQLString },
        chef: {
            type: ChefType,
            resolve(parent, args) {
                return Chef.findById(parent.chefId)
            }
        },
    }),        
})

// CHEF TYPES
const ChefType = new GraphQLObjectType({
    name: 'Chef',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phone: { type: GraphQLString },
    }),
})

// QUERY TYPES
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        recipes: {
            type: new GraphQLList(RecipeType),
            resolve(parent, args) {
                return Recipe.find({})
            }
        },
        recipe: {
            type: RecipeType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Recipe.findById(args.id)
            }
        },
        chefs: {
            type: new GraphQLList(ChefType),
            resolve(parent, args) {
                return Chef.find({})
            }
        },
        chef: { 
            type: ChefType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Chef.findById(args.id)
            }
        }
    }
})

//mutations
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addChef: {
            type: ChefType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let chef = new Chef({
                    name: args.name,
                    email: args.email,
                    phone: args.phone
                })
                return chef.save()
            }
        },
        deleteChef: {
            type: ChefType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                Recipe.find({ chefId: args.id }).then(recipes => {
                    recipes.forEach(recipe =>{
                        recipe.remove()
                    })
                })
                return Chef.findByIdAndRemove(args.id)
            }
        },

        // ADD RECIPE
        addRecipe: {
            type: RecipeType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                description: { type: GraphQLNonNull(GraphQLString) },
                ingredients: { type: GraphQLNonNull(GraphQLString) },
                steps: { type: GraphQLNonNull(GraphQLString) },
                chefId: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let recipe = new Recipe({
                    name: args.name,
                    description: args.description,
                    ingredients: args.ingredients,
                    steps: args.steps,
                    chefId: args.chefId
                })
                return recipe.save()
            }
        },
        // DELETE RECIPE
        deleteRecipe: {
            type: RecipeType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                return Recipe.findByIdAndRemove(args.id)
            }
        },
        // UPDATE RECIPE
        updateRecipe: {
            type: RecipeType,
            args: {
                id: { type: GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                ingredients: { type: GraphQLString },
                steps: { type: GraphQLString },
                chefId: { type: GraphQLID }
            },
            resolve(parent, args) {
                return Recipe.findByIdAndUpdate(args.id, {
                    $set: {
                        name: args.name,
                        description: args.description,
                        ingredients: args.ingredients,
                        steps: args.steps,
                        chefId: args.chefId
                    }
                }, { new: true })
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
})