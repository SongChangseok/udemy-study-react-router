import { Outlet, useParams } from "react-router-dom";
import HighlightedQuote from "../quotes/HighlightedQuote";
import useHttp from "../../hooks/use-http";
import { getSingleQuote } from "../../lib/api";
import { useEffect } from "react";
import LoadingSpinner from "../UI/LoadingSpinner";

const QuoteDetail = () => {
  const { quoteId } = useParams();
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);
  if (status === "pending")
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  if (error) return <p className="centered">{error}</p>;

  if (!loadedQuote.text) return <p>No quote found!</p>;

  return (
    <>
      <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
      <Outlet />
    </>
  );
};

export default QuoteDetail;
