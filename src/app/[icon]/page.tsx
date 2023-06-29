import React from "react";
import fs from "fs";
import path from "path";

function page({ params }: { params: any }) {
  const iconName = params.icon;
  const iconsDir = path.join(process.cwd(), "src", "resources", "icons");
  const iconFiles = fs.readdirSync(iconsDir);

  const icons = iconFiles.map((file) => {
    const iconPath = path.join(iconsDir, file);
    const iconContent = fs.readFileSync(iconPath, "utf-8");
    return { name: file.replace(".svg", ""), content: iconContent };
  });

  const currentIcon = icons.filter(
    (icon) => icon.name.toLowerCase() === iconName?.toLowerCase()
  );

  return (
    <div>
      {currentIcon.length > 0 ? (
        <div dangerouslySetInnerHTML={{ __html: currentIcon[0].content }} />
      ) : (
        "Icon not found"
      )}
    </div>
  );
}

export default page;
