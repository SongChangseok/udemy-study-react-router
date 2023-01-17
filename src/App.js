import { Link, Navigate, Route, Routes } from "react-router-dom";
// import AllQuotes from "./components/pages/AllQuotes";
// import QuoteDetail from "./components/pages/QuoteDetail";
// import NewQuote from "./components/pages/NewQuote";
import Layout from "./components/layout/Layout";
// import NotFound from "./components/pages/NotFound";
import Comments from "./components/comments/Comments";
import React, { Suspense } from "react";
import LoadingSpinner from "./components/UI/LoadingSpinner";

const AllQuotes = React.lazy(() => import("./components/pages/AllQuotes"));
const QuoteDetail = React.lazy(() => import("./components/pages/QuoteDetail"));
const NewQuote = React.lazy(() => import("./components/pages/NewQuote"));
const NotFound = React.lazy(() => import("./components/pages/NotFound"));

function App() {
  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/quotes" />} />
          <Route path="/quotes" element={<AllQuotes />} />
          <Route path="/quotes/:quoteId/*" element={<QuoteDetail />}>
            <Route
              path=""
              element={
                <div className="centered">
                  <Link className="btn--flat" to="comments">
                    Load Comments
                  </Link>
                </div>
              }
            />
            <Route path="comments" element={<Comments />} />
          </Route>
          <Route path="/new-quote" element={<NewQuote />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
