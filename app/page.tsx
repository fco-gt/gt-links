"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";

const linkValidateRegex = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;

export default function Home() {
  const [originalLink, setOriginalLink] = useState("");

  const handleOriginalLink = (e: any) => {
    const inputValue = e.target.value;
    setOriginalLink(inputValue);
  };

  const handleFormSubmit = (e: any) => {
    setOriginalLink("");
  };

  return (
    <main className="flex items-center justify-center">
      <section className="flex w-full flex-col max-w-sm items-center justify-center space-x-2 pt-32">
        <h1>FCO-GT URL SHORTENER</h1>
        <div className="flex gap-2 pt-11 w-full">
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
            onClick={handleFormSubmit}
            disabled={linkValidateRegex.test(originalLink) ? false : true}
          >
            Generate
          </Button>
        </div>
      </section>
    </main>
  );
}
