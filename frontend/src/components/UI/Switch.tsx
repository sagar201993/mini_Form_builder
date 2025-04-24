import React from "react";

interface SwitchTypeProps {
  label: string;
  checked: boolean;
  onChange: () => void;
}
const Switch = ({ label, checked, onChange }: SwitchTypeProps) => {
  return (
    <>
      <div className="flex items-center space-x-2">
        <span className="text-sm">{label}</span>
        <label className="relative inline-flex items-center cursor-pointer">
          <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-green-500 peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        </label>
      </div>
    </>
  );
};

export default Switch;
