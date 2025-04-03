import React, { useEffect, useState } from 'react';

function PromiseStatusModal({ content }) {
  const [visible, setVisible] = useState(content);

  useEffect(() => {
    if (content) {
      setVisible(content);
      const timer = setTimeout(() => setVisible(null), 3000);

      return () => clearTimeout(timer);
    }
  }, [content]);

  if (!visible) return null;

  return (
    <div className="absolute bottom-25 left-1/2 transform -translate-x-1/2 z-10 p-4 rounded-md bg-[#FF983F] text-white">
      {visible}
    </div>
  );
}

export default PromiseStatusModal;
