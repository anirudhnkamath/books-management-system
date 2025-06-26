export default function Error({contentText}) {
  return (
    <div className="bg-red-200 text-red-800 border-l-4 border-red-500 p-4 mx-12 rounded-lg w-100">
      <strong>Error:</strong> {contentText}
    </div>
  )
}
