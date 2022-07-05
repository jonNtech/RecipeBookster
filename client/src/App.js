import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache } from "@apollo/client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import NotFound from "./pages/NotFound";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        chefs: {
          merge(existing, incoming) {
            return incoming;
          }
        },
        recipes: {
          merge(existing, incoming) {
            return incoming;
          }
        }  
      }
    }
  }
});

const chef = new ApolloClient({
  uri: "http://localhost:5000/graphql",
  cache
});

function App() {
  return (
    <>
      <ApolloProvider client={chef}>
        <Router>
          <Header />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/recipes/:id" element={<Recipe />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </ApolloProvider>
    </>
  );
}

export default App;
