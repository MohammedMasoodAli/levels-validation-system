import {

  PieChart,
  Pie,
  Cell,

  ResponsiveContainer,

  BarChart,
  Bar,

  XAxis,
  YAxis,
  Tooltip

} from "recharts";


export default function AnalyticsCharts({

  submissions

}) {

  // =====================================
  // VALID VS FLAGGED
  // =====================================

  const validCount = submissions.filter(
    item => item.flagged === false
  ).length;


  const flaggedCount = submissions.filter(
    item => item.flagged === true
  ).length;


  const validationData = [

    {
      name: "Valid",
      value: validCount
    },

    {
      name: "Flagged",
      value: flaggedCount
    }

  ];


  // =====================================
  // SCORE DISTRIBUTION
  // =====================================

  const scoreData = [

    {
      name: "0-25",
      value: submissions.filter(
        item =>
          item.quality_score >= 0
          &&
          item.quality_score < 25
      ).length
    },

    {
      name: "25-50",
      value: submissions.filter(
        item =>
          item.quality_score >= 25
          &&
          item.quality_score < 50
      ).length
    },

    {
      name: "50-75",
      value: submissions.filter(
        item =>
          item.quality_score >= 50
          &&
          item.quality_score < 75
      ).length
    },

    {
      name: "75-100",
      value: submissions.filter(
        item =>
          item.quality_score >= 75
      ).length
    }

  ];


  // =====================================
  // COLORS
  // =====================================

  const COLORS = [

    "#00E5FF",
    "#FF4D4F"

  ];


  return (

    <div className="grid grid-cols-2 gap-8 mt-12">


      {/* PIE CHART */}

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

        <h2 className="text-2xl font-bold mb-6">

          Validation Distribution

        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <PieChart>

            <Pie

              data={validationData}

              cx="50%"
              cy="50%"

              outerRadius={100}

              dataKey="value"

              label

            >

              {
                validationData.map(
                  (entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  )
                )
              }

            </Pie>

            <Tooltip />

          </PieChart>

        </ResponsiveContainer>

      </div>


      {/* BAR CHART */}

      <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800">

        <h2 className="text-2xl font-bold mb-6">

          Trust Score Distribution

        </h2>

        <ResponsiveContainer
          width="100%"
          height={300}
        >

          <BarChart data={scoreData}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar dataKey="value" />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>

  )
}