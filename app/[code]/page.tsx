import { notFound, redirect } from "next/navigation";

async function getLink(code: string) {
  console.log(code);
  try {
    const response = await fetch(
      `${process.env.REDIRECT_URL}api/links/${encodeURIComponent(code)}`,
      {
        method: "GET",
      }
    );

    const data = await response.json();
    console.log("data", data);
    return data;
  } catch (error) {
    return notFound();
  }
}

async function getLinkData(params: Record<string, string>) {
  const code: string = params.code;
  console.log("code", code);
  return await getLink(code);
}

export default async function Page({
  params,
}: {
  params: Record<string, string>;
}) {
  const data = await getLinkData(params);
  const url = data?.originalUrl;

  console.log("data2", data);
  console.log("url", url);

  if (url) {
    const destination = url;

    if (destination) {
      return redirect(destination);
    } else {
      return notFound();
    }
  } else {
    return notFound();
  }
}
