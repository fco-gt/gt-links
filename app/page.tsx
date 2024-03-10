"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";

const linkValidateRegex = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;

export default function Home() {
  const [originalLink, setOriginalLink] = useState<string>("");

  const handleOriginalLink = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOriginalLink(e.target.value);
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await fetch("/api/shorturl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ originalUrl: originalLink }),
    });

    if (response.ok) {
      setOriginalLink("");
    } else {
      console.log("A ocurrido un error");
    }
  };

  return (
    <main className="flex items-center justify-center">
      <section className="flex w-full flex-col max-w-sm items-center justify-center space-x-2 pt-32">
        <h1>FCO-GT URL SHORTENER</h1>
          <form onSubmit={handleFormSubmit} className="flex gap-2 pt-11 w-full">
            <Input
              type="url"
              placeholder="Paste your URL"
              className={
                linkValidateRegex.test(originalLink)
                  ? "text-green-500"
                  : "text-red-500"
              }
              value={originalLink}
              onChange={handleOriginalLink}
            ></Input>
            <Button
              type="submit"
              disabled={linkValidateRegex.test(originalLink) ? false : true}
            >
              Generate
            </Button>
          </form>
      </section>
    </main>
  );
}
