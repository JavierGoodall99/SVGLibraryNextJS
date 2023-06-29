// import Image from "next/image";
// import fs from "fs";
// import path from "path";
// import { MdDownload } from "react-icons/md";
// import Link from "next/link";
// const { JSDOM } = require("jsdom");


// export default function Home({ searchParams }: { searchParams: any }) {
//   const iconsDir = path.join(process.cwd(), "src", "resources", "new");
//   const iconFiles = fs.readdirSync(iconsDir);

//   const { search, fill, stroke, swidth } = searchParams;

//   const icons = iconFiles.map((file) => {
//     const iconPath = path.join(iconsDir, file);
//     const iconContent = fs.readFileSync(iconPath, "utf-8");
//     return { name: file.replace(".svg", ""), content: iconContent };
//   });

//   return (
//     <main>
//       <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-4 m-4">
//         {icons &&
//           (search
//             ? icons.filter((icon) => icon.name.toLowerCase().includes(search))
//             : icons
//           ).map((icon, index) => {
//             const dom = new JSDOM(icon.content);
//             const doc = dom.window.document;
//             const styles = doc.getElementsByTagName("style");
//             styles[0].innerHTML = `.cls-1 {
//               fill: ${fill ? fill : "#fff"};
//               stroke: ${stroke ? stroke : "#000"};
//               stroke-miterlimit: 10;
//               stroke-width: ${swidth ? swidth : "5"}px;
//             }`;

//             const newString = dom.serialize();
//             return (
//               <div className="relative group" key={index}>
//                 <div
//                   className="group-hover:bg-white bg-gray-100 group-hover:shadow rounded-xl p-4  duration-100"
//                   dangerouslySetInnerHTML={{ __html: newString }}
//                 />
//                 <Link href={`/${icon.name}`}>
//                   <div className="p-1 rounded-md cursor-pointer group-hover:block hidden border-2 border-white bg-black text-white absolute bottom-0 right-0 m-2">
//                     <MdDownload />
//                   </div>
//                 </Link>
//               </div>
//             );
//           })}
//       </div>
//     </main>
//   );
// }
