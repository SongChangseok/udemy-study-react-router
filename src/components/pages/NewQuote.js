import { useNavigate } from "react-router-dom";
import QuoteForm from "../quotes/QuoteForm";
import useHttp from "../../hooks/use-http";
import { addQuote } from "../../lib/api";
import { useEffect } from "react";

const NewQuote = () => {
  const { sendRequest, status } = useHttp(addQuote);
  const navigate = useNavigate();
  const addQuoteHandler = (quoteData) => {
    sendRequest(quoteData);
  };

  useEffect(() => {
    if (status === "completed") {
      navigate("/quotes");
    }
  }, [navigate, status]);

  return (
    <QuoteForm isLoading={status === "pending"} onAddQuote={addQuoteHandler} />
  );
};

export default NewQuote;
