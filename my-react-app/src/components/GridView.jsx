export default function GridView({ items }) {
  if (!items?.length) return null
  return (
    <div className="grid-view">
      {items.map((item, i) => (
        <div key={i} className="grid-card">{item}</div>
      ))}
    </div>
  )
}
