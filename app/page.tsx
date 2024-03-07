"use client";

import React from "react";
import { useRef, useState } from "react";

export default function Home() {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;
  const [shortURL, setShortURL] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const url = inputRef.current.value;

    fetch("/api/shortUrl", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ url }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <main>
      <h1>URL Shortener</h1>

      <p>Acorta tus URLs aqui</p>

      <section>
        <form onSubmit={handleSubmit}>
          <input className="text-black" ref={inputRef} type="text" placeholder="url" />
          <button>Acortar</button>
          <span>{shortURL}</span>
        </form>
      </section>
    </main>
  );
}
