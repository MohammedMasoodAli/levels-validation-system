export default function Navbar() {

  return (

    <div className="w-full h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-8">

      <div>

        <h1 className="text-2xl font-bold text-cyan-400">
          AI Data Quality Pipeline
        </h1>

      </div>

      <button className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold">

        Upload Submission

      </button>

    </div>
  )
}