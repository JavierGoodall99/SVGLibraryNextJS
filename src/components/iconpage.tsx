"use client"

import React, { ChangeEvent, useEffect, useState } from "react";
import { MdDownload } from "react-icons/md";

export const IconPage = ({ icons }: { icons: { [key: string]: string } }) => {
  const [fill, setFill] = useState("#ffffff");
  const [primaryColor, setPrimaryColor] = useState<string>("#000000"); // Initial primary color
  const [size, setSize] = useState<number>(80); // Initial size
  const [strokeWidth, setStrokeWidth] = useState<number>(5); // Initial stroke width
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  

  const handleDownload = (iconName: string) => {
    const svgData = icons[iconName];
    const parser = new DOMParser();
    const svgDoc = parser.parseFromString(svgData, "image/svg+xml");
    const svgElement = svgDoc.documentElement;

    // Apply the selected options
    svgElement.setAttribute("fill", primaryColor);
    svgElement.setAttribute("width", `${size}px`);
    svgElement.setAttribute("height", `${size}px`);
    svgElement.setAttribute("strokeWidth", `${strokeWidth}px`);

    const modifiedSvgData = new XMLSerializer().serializeToString(svgElement);
    const blob = new Blob([modifiedSvgData], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${iconName}.svg`;
    link.click();
    URL.revokeObjectURL(url);
  };

  function handleSizeChange(event: ChangeEvent<HTMLInputElement>): void {
    setSize(Number(event.target.value));
  }

  function handleStrokeWidthChange(event: ChangeEvent<HTMLInputElement>): void {
    setStrokeWidth(Number(event.target.value));
  }

  function handlePrimaryColorChange(event: ChangeEvent<HTMLInputElement>): void {
    setPrimaryColor(event.target.value);
  }

  return (
    <div>
      <div className="search">
      <input
              type="text"
              placeholder="Search icons"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
      </div>
    <div className="md:flex flex-row h-full w-full">
      <div className="md:w-1/5 w-full">
        <div className="sidenav pt-4">
          <div className="container">
            <label htmlFor="primaryColor">Select color: </label>
            <input
              type="color"
              value={primaryColor}
              onChange={handlePrimaryColorChange}
            />

            <label htmlFor="size">Size {size} px</label>
            <input
              type="range"
              id="size"
              min="20"
              max="100"
              value={size}
              onChange={handleSizeChange}
            />

            {/* <label htmlFor="strokeWidth">Stroke Width {strokeWidth} px</label>
            <input
              type="range"
              id="strokeWidth"
              min="1"
              max="20"
              value={strokeWidth}
              onChange={handleStrokeWidthChange}
            /> */}
          </div>
        </div>
      </div>
      <div className="grow">
        <div className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 m-4">
          {Object.keys(icons).map((iconName: string) => {
            if (searchQuery && iconName.toLowerCase().indexOf(searchQuery.toLowerCase()) === -1) {
              return null;
            }

            return (
              <div className="relative group" key={iconName}>
                <div className="group-hover:bg-white bg-white shadow group-hover:shadow rounded-xl p-4 duration-100">
                  <div>
                    <h6 className="text-sm">{iconName}</h6>
                    <div
                      dangerouslySetInnerHTML={{ __html: icons[iconName] }}
                      style={{
                        fill: primaryColor,
                        width: `${size}px`,
                        height: `${size}px`,
                        strokeWidth: `${strokeWidth}px`,
                      }}
                    />

                    <button
                      className="p-1 rounded-md cursor-pointer group-hover:block hidden border-2 border-white bg-black text-white absolute bottom-0 right-0 m-2"
                      onClick={() => handleDownload(iconName)}
                    >
                      <MdDownload />
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