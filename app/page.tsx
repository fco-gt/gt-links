"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { title } from "@/components/primitives";

const linkValidateRegex = /^(https?|ftp):\/\/[^\s\/$.?#].[^\s]*$/;

export default function Home() {
  const [originalLink, setOriginalLink] = useState<string>("");
  const [newLink, setNewLink] = useState<string>("");

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
      const data = await response.json();
      const code = data.shortUrl;
      const url = `https://gt-links.vercel.app/${code}`;

      setNewLink(url);
      setOriginalLink("");
    } else if (response.status === 401) {
      console.log("Link ya generado");
    } else {
      console.log("Ha ocurrido un erorr");
    }
  };

  return (
    <main className="flex items-center justify-center">
      <section className="flex w-full flex-col max-w-sm items-center justify-center space-x-2 pt-32">
        <h1 className={title({ color: "green" })}>GT-Links</h1>
        <p className="text-gray-100 text-xs mt-5">
          *Esta app aun esta en una fase alpha*
        </p>
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

        <div className="mt-9 flex">
          <strong className="flex">
            {newLink && (
              <p className="w-[500px] text-center">
                Link generado:{" "}
                <a href={newLink} target="_blank" className="text-green-500">
                  {newLink}
                </a>
              </p>
            )}
          </strong>
        </div>
      </section>
    </main>
  );
}
