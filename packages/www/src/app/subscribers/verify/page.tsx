"use client";

import { Suspense, useEffect, useState } from "react";

function VerifySubscriberPageContent() {
  const [isLoading, setIsLoading] = useState(true);

  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : new URLSearchParams();

  const tokenParam = searchParams.get("token");

  useEffect(() => {
    (async () => {
      try {
        await fetch(
          `${process.env.NEXT_PUBLIC_API_HOST}/subscribers/${tokenParam}/verify`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
      } finally {
        setIsLoading(false);
      }
    })();
  }, [tokenParam]);

  return (
    <>
      <h1>Confirm subscription</h1>
      {isLoading ? <p>Loading...</p> : <p>Done! You&apos;re good to go!</p>}
    </>
  );
}

export default function VerifySubscriberPage() {
  return (
    <Suspense fallback={<><h1>Confirm subscription</h1><p>Loading...</p></>}>
      <VerifySubscriberPageContent />
    </Suspense>
  );
}
