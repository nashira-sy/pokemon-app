import React from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
}

export default function Modal({ isOpen, onClose, children, title }: Props) {
  if (!isOpen) return null;
  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full shadow-xl">
        {title && <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-gray-100">{title}</h3>}
        <div>{children}</div>
        <div className="mt-4 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800">Close</button>
        </div>
      </div>
    </div>
  );
}