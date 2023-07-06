import fs from 'fs';
import path from 'path';
import { parseStringPromise } from 'xml2js';

interface Icon {
  name: string;
  path: string;
  category: string;
}

async function addIconsToJSON() {
  const jsonFilePath = path.join(process.cwd(), 'src', 'resources', 'icons.json');
  const iconsFolderPath = path.join(process.cwd(), 'src', 'resources', 'icons');

  const icons = fs.readdirSync(iconsFolderPath);

  const iconData: Icon[] = [];

  for (const icon of icons) {
    const iconName = path.basename(icon, '.svg');
    const iconPath = path.join('icons', icon);
    const iconContent = fs.readFileSync(path.join(iconsFolderPath, icon), 'utf8');

    try {
      const parsedXml = await parseStringPromise(iconContent);
      const metadataNode = parsedXml.svg.metadata;

      let category = '';

      if (metadataNode && metadataNode.length > 0 && metadataNode[0].category) {
        category = metadataNode[0].category[0];
      }

      iconData.push({
        name: iconName,
        path: iconPath,
        category: category,
      });
    } catch (error) {
      console.error(`Error parsing SVG file: ${icon}`, error);
    }
  }

  const jsonContent = {
    icons: iconData,
  };

  try {
    fs.writeFileSync(jsonFilePath, JSON.stringify(jsonContent, null, 2));
    console.log('JSON file updated successfully.');
  } catch (error) {
    console.error('Error writing JSON file:', error);
  }
}

// Call the function to add icons to the JSON file
addIconsToJSON();
