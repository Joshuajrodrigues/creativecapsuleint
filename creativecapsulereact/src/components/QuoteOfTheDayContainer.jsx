import React from "react";
import { fetchQuotes } from "./QuotesContainer";
import { Typography } from "antd";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useState } from "react";

const QuoteOfTheDayContainer = () => {
  const quotes = useQuery({
    queryKey: ["quotes"],
    queryFn: () => fetchQuotes(),
  });

  const [quoteOfTheDay, setQuoteOfTheDay] = useState("");

  //  set current random quote into session
  // set current time into session

  // on reload check if session ? check if it has been 24 hrs since session

  // if yes set new random else use old
  useEffect(() => {
    const oneDay = new Date().getTime() + 1 * 24 * 60 * 60 * 1000;
    const currentDay = new Date().getTime();
    const randomQuote = quotes.data?.data[Math.floor(Math.random() * 10)];
    const randomQuoteCache = sessionStorage.getItem("randomQuote");
    const randomQuoteTime = sessionStorage.getItem("randomQuoteTime");
    if (randomQuoteTime && randomQuoteCache) {
      if (currentDay < oneDay) {
        // use same
        setQuoteOfTheDay(randomQuoteCache);
      } else if (currentDay >= oneDay && randomQuote !== undefined) {
        // use new
        setQuoteOfTheDay(randomQuote);

        sessionStorage.setItem("randomQuoteTime", randomQuote);
        sessionStorage.setItem("randomQuoteTimeSet", currentDay);
      }
    } else {
      setQuoteOfTheDay(randomQuote);
      if (randomQuote !== undefined) {
        sessionStorage.setItem("randomQuote", randomQuote);
        sessionStorage.setItem("randomQuoteTimeSet", currentDay);
      }
    }
  }, [quotes]);

  return (
    <div>
      <Typography.Title>"{quoteOfTheDay || ""}"</Typography.Title>
    </div>
  );
};

export default QuoteOfTheDayContainer;
