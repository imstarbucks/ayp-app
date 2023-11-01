const ToggleSwitch = ({ isActive }) => {
  return (
    <label htmlFor="employeeStatus">
      <input
        type="checkbox"
        name="employeeStatus"
        id="employeeStatus"
        defaultChecked={isActive}
        className="peer hidden"
      />
      <div className="w-8 h-4 rounded-lg relative peer-checked:bg-blue-500 bg-slate-600 flex peer-checked:justify-end justify-start">
        <div className="w-4 h-4 rounded-full bg-white"></div>
      </div>
    </label>
  );
};

export default ToggleSwitch;
