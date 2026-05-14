export default function Prompt({ cwd, input }) {
  return (
    <>
      <span className="prompt-label">svash{cwd} $</span>
      {input != null && <span className="prompt-input">&nbsp;{input}</span>}
    </>
  )
}
