export default function Button({buttonContent, handler}) {
  return (
    <button 
      onClick = {handler} 
      className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
    >
      {buttonContent}
    </button>
  )
}
