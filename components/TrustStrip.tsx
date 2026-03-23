const TRUST_ITEMS = [
  { icon: '🏛', label: 'B.D.S. Mumbai University' },
  { icon: '🔬', label: 'Modern Equipment' },
  { icon: '✅', label: 'Reg. No. A-6039' },
  { icon: '💉', label: 'Painless Procedures' },
  { icon: '🧼', label: 'Sterile Environment' },
] as const;

export default function TrustStrip() {
  return (
    <div className="trust" role="list" aria-label="Trust indicators">
      {TRUST_ITEMS.map((item) => (
        <div key={item.label} className="ti" role="listitem">
          <div className="tiicon" aria-hidden="true">{item.icon}</div>
          {item.label}
        </div>
      ))}
    </div>
  );
}
