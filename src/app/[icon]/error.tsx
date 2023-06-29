"use client";
import React from "react";

function Error({ error }: { error: Error }) {
  console.error(error);
  return <pre>{JSON.stringify(error, null, 2)}</pre>;
}

export default Error;
