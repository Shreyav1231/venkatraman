export default function OutputLine({ text, error }) {
  if (!text) return null
  return (
    <div className={`output-line${error ? ' error' : ''}`}>
      {text.split('\n').map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  )
}
