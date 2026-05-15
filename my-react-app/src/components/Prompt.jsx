export default function Prompt({ cwd, input }) {
  return (
    <>
      <span className="prompt-label">
        savsh
        {cwd} $</span>
      {input != null && <span className="prompt-input">&nbsp;{input}</span>}
    </>
  )
}
