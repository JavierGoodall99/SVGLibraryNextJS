"use client";

import React from "react";

export function DisplayIcon({ iconString }: { iconString: string }) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(iconString, "text/html");
  const styles = doc.getElementsByTagName("style");

  console.log(styles[0]);
  return (
    <div>
      {iconString}
      
    </div>
  );
}