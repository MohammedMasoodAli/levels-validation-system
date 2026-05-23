export default function StatsCard({

  title,
  value,
  color

}) {

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">

      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h1 className={`text-4xl font-bold mt-3 ${color}`}>
        {value}
      </h1>

    </div>
  )
}