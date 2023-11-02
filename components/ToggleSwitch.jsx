import { useState, useEffect } from 'react';

const ToggleSwitch = ({ isActive }) => {
  const [active, setActive] = useState(isActive);

  useEffect(() => {
    setActive(isActive);
  }, [isActive]);

  return (
    <label htmlFor="employeeStatus">
      <input
        type="checkbox"
        name="employeeStatus"
        id="employeeStatus"
        defaultChecked={active}
        onChange={() => !setActive()}
        className="peer hidden"
      />
      <div className="w-8 h-4 rounded-lg relative bg-slate-600 flex peer-checked:bg-blue-500 peer-checked:justify-end justify-start">
        <div className="w-4 h-4 rounded-full bg-white"></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
