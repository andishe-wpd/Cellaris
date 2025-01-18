export default function Checkbox({ label = '', value, onChange, disabled = false }) {
  return label ? (
    <label>
      <input type="checkbox" checked={value} onChange={onChange} disabled={disabled} />
      {label}
    </label>
  ) : (
    <input type="checkbox" checked={value} onChange={onChange} disabled={disabled} />
  );
}
