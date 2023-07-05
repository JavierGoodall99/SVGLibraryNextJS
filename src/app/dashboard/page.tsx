
import fs from 'fs';
import path from 'path';

import React from 'react'
import {IconPage} from '../../components/iconpage';


interface Icons {
    [key: string]: string;
  }

function page() {
    const iconsDir = path.join(process.cwd(), 'src', 'resources', 'icons');
    const iconFiles = fs.readdirSync(iconsDir);
    const icons: Icons = {};
    iconFiles.forEach((file) => {
      const iconName = file.replace('.svg', '');
      const iconPath = path.join(iconsDir, file);
      const iconContent = fs.readFileSync(iconPath, 'utf-8');
      icons[iconName] = iconContent;
    });


  return (
    <div>  
        <div className="heading">
            <h1>DataBalk Icoon Bibliotheek 2.0</h1>
        </div>

        <IconPage icons={icons}/>
    </div>
  )
}

export default page;