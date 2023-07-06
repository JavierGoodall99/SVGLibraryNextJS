"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";
import {
  Button,
  Checkbox,
  CheckboxProps,
  useId,
} from "@fluentui/react-components";
import { Label, Slider } from "@fluentui/react";

export const IconPage = ({ icons }: { icons: { [key: string]: string } }) => {
  const [fill, setFill] = useState("#ffffff");
  const [primaryColor, setPrimaryColor] = useState<string>("#000000"); // Initial primary color
  const [size, setSize] = useState<number>(80); // Initial size
  const [swidth, setStrokeWidth] = useState<number>(5); // Initial stroke width
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [secondaryColor, setSecondaryColor] = useState<string>("#FFFFFF"); // Initial secondary color
  const [gradient, setGradient] = useState(false);
  const id = useId();
  const [category, setCategory] = useState<string>("all"); // Initial category

 




  // Create a category filter based on the selected category
  const categoryFilter = (iconName: string) => {
    if (category === "all") {
      return true;
    }
    const svgData = icons[iconName];
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
    const categoryElement = svgDoc.querySelector("metadata > category");

    if (categoryElement) {
      const iconCategory = categoryElement.textContent;
      return iconCategory === category;
    }

    return false; 
  };







  // DOWNLOAD AS PNG OR SVG

  const handleDownloadSVG = (iconName: string) => {
    const svgData = icons[iconName];
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    if (gradient) {
      const linearGradient = svgDoc.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient"
      );
      linearGradient.setAttribute("id", `gradient-${iconName}`);
      linearGradient.innerHTML = `
        <stop offset="0%" stop-color="${secondaryColor}" />
        <stop offset="100%" stop-color="${primaryColor}" />
      `;
      svgElement.appendChild(linearGradient);
      svgElement.setAttribute("stroke", `url(#gradient-${iconName})`);
    } else {
      svgElement.setAttribute("fill", primaryColor);
    }

    svgElement.setAttribute("width", `${size}px`);
    svgElement.setAttribute("height", `${size}px`);
    svgElement.setAttribute("stroke-width", `${swidth}px`);
    // svgElement.setAttribute("stroke", primaryColor);

    const modifiedSvgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([modifiedSvgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${iconName}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadPNG = (iconName: string) => {
    const svgData = icons[iconName];
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    if (gradient) {
      const linearGradient = svgDoc.createElementNS(
        "http://www.w3.org/2000/svg",
        "linearGradient"
      );
      linearGradient.setAttribute("id", `gradient-${iconName}`);
      linearGradient.innerHTML = `
        <stop offset="0%" stop-color="${secondaryColor}" />
        <stop offset="100%" stop-color="${primaryColor}" />
      `;
      svgElement.appendChild(linearGradient);
      svgElement.setAttribute("stroke", `url(#gradient-${iconName})`);
    } else {
      svgElement.setAttribute("fill", primaryColor);
    }

    svgElement.setAttribute("width", `${size}px`);
    svgElement.setAttribute("height", `${size}px`);
    svgElement.setAttribute("stroke-width", `${swidth}px`);

    // Convert SVG to PNG
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgImage = new Image();

    svgImage.onload = () => {
      canvas.width = svgImage.width;
      canvas.height = svgImage.height;

      if (ctx) {
        ctx.drawImage(svgImage, 0, 0);

        // Create a PNG Blob
        canvas.toBlob((blob) => {
          if (blob) {
            // Create download link for PNG
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `${iconName}.png`;
            link.click();
            URL.revokeObjectURL(url);
          } else {
            console.error("Failed to create PNG blob.");
          }
        });
      } else {
        console.error("Failed to get canvas context.");
      }
    };

    svgImage.src = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
      svgString
    )}`;
  };





  // HANDLING CHANGE
  const handleSizeChange = (value: number) => {
    setSize(value);
  };

  const handleStrokeWidthChange = (value: number) => {
    setStrokeWidth(value);
  };

  function handlePrimaryColorChange(
    event: ChangeEvent<HTMLInputElement>
  ): void {
    setPrimaryColor(event.target.value);
  }

  const handleSecondaryColorChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSecondaryColor(event.target.value);
  };





  // CONTENT
  return (
    <div>
      <div className="search">
        <select
          className="m-5 p-3 text-xl bg-white border border-gray-300 rounded-lg shadow-md focus:outline-none focus:border-blue-500"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="all" className="text-gray-500">
          Alle Categorieën
          </option>
          <option value="Technology" className="text-gray-500">
            Technology
          </option>
          <option value="Home" className="text-gray-500">
            Home
          </option>
          {/* Add more options for each category */}
        </select>

        <input
          type="text"
          placeholder="Zoek iconen"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="md:flex flex-row h-full w-full">
        <div className="md:w-1/5 w-full">
          <div className="sidenav pt-4">
            <div className="container">
              <label htmlFor="primaryColor"></label>
              <label htmlFor="primaryColor">
                {gradient ? "Kies een kleur " : "Kies een kleur "}
                {/* {gradient ? "Select Start color: " : "Select color: "} */}
              </label>
              <input
                type="color"
                value={primaryColor}
                onChange={handlePrimaryColorChange}
              />
              {gradient && (
                <>
                  <label htmlFor="secondaryColor">Tweede kleur</label>
                  <input
                    type="color"
                    value={secondaryColor}
                    onChange={handleSecondaryColorChange}
                  />
                </>
              )}

              <label htmlFor="isGradient">Vink voor Verloop aan</label>
              <input
                type="checkbox"
                onChange={() => setGradient(!gradient)}
                id="isGradient"
              />
              <Label htmlFor={id}></Label>
              <Slider
                value={size}
                min={20}
                max={100}
                id={id}
                onChange={handleSizeChange}
                className="slider"
              />

              <Label htmlFor={id}></Label>
              <Slider
                value={swidth}
                min={1}
                max={10}
                id={id}
                onChange={handleStrokeWidthChange}
                className="slider"
              />
            </div>
          </div>
        </div>
        <div className="grow">
          <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 m-4">
            {Object.keys(icons).map((iconName: string) => {
              if (
                searchQuery &&
                iconName.toLowerCase().indexOf(searchQuery.toLowerCase()) === -1
              ) {
                return null;
              }

              if (!categoryFilter(iconName)) {
                return null; // Skip the icon if it doesn't match the selected category
              }

              return (
                <div className="relative group" key={iconName}>
                  <div className="group-hover:bg-white bg-white shadow group-hover:shadow rounded-xl p-4 duration-100">
                    <div>
                      <h6 className="text-xs text-center">{iconName}</h6>
                      <div className="m-auto"
                        style={{
                          width: `${size}px`,
                          height: `${size}px`,
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          style={{
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <defs>
                            <linearGradient id={`gradient-${iconName}`}>
                              <stop
                                offset="0%"
                                stopColor={
                                  gradient ? secondaryColor : primaryColor
                                }
                              />
                              <stop offset="100%" stopColor={primaryColor} />
                            </linearGradient>
                          </defs>
                          <g>
                            <foreignObject width="100%" height="100%">
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: icons[iconName],
                                }}
                                style={{
                                  fill: primaryColor,
                                  width: "100%",
                                  height: "100%",
                                  strokeWidth: swidth,
                                  stroke: `url(#gradient-${iconName})`,
                                }}
                              />
                            </foreignObject>
                          </g>
                        </svg>
                      </div>

                      <button
                        className="p-1 rounded-md cursor-pointer group-hover:block hidden border-2 border-white bg-black text-xs  text-white absolute bottom-0 right-0 m-2"
                        onClick={() => handleDownloadSVG(iconName)}
                      >
                        SVG
                      </button>
                      <br />
                      <button
                        className="p-1 rounded-md cursor-pointer group-hover:block hidden border-2 border-white bg-black text-xs text-white absolute bottom-0 right-10 m-2"
                        onClick={() => handleDownloadPNG(iconName)}
                      >
                        PNG
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
