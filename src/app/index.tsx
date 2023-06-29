import { useEffect, useState } from 'react';

function Icon({ name }: { name: string }) {
  const [svgContent, setSvgContent] = useState<string>('');

  useEffect(() => {
    const fetchIcon = async () => {
      const response = await fetch(`/api/icons/${name}`);
      const data = await response.json();
      setSvgContent(data.icon);
    };

    fetchIcon();
  }, [name]);

  return <img src={`data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`} alt={name} />;
}

export default function IconsPage() {
  return (
    <div>
      <Icon name="next" />
      <Icon name="vercel" />
      {/* Add more icons as needed */}
    </div>
  );
}
