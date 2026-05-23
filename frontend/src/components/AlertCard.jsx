export default function AlertCard({

  title,
  description,
  type

}) {

  const colors = {

    danger: "border-red-500",
    warning: "border-yellow-500",
    success: "border-green-500"

  }

  return (

    <div className={`bg-slate-900 border-l-4 ${colors[type]} p-5 rounded-xl`}>

      <h2 className="text-lg font-bold">
        {title}
      </h2>

      <p className="text-slate-400 mt-2">
        {description}
      </p>

    </div>
  )
}