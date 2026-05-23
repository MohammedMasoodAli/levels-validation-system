import { useState } from "react";


export default function SubmissionTable({

  submissions

}) {

  const [openRow, setOpenRow] = useState(null);


  // =====================================
  // STATUS COLOR
  // =====================================

  const getStatusColor = (status) => {

    if (status === "VALID") {

      return "text-green-400";

    }

    return "text-red-400";

  };


  // =====================================
  // TOGGLE DROPDOWN
  // =====================================

  const toggleRow = (index) => {

    if (openRow === index) {

      setOpenRow(null);

    }

    else {

      setOpenRow(index);

    }

  };


  return (

    <div className="mt-12">

      <h2 className="text-2xl font-bold mb-6">

        Submission Validation Results

      </h2>


      <div className="overflow-x-auto">

        <table className="w-full bg-slate-900 rounded-xl overflow-hidden">

          <thead className="bg-slate-800">

            <tr>

              <th className="p-4 text-left">
                Submission ID
              </th>

              <th className="p-4 text-left">
                Timestamp
              </th>

              <th className="p-4 text-left">
                Company
              </th>

              <th className="p-4 text-left">
                Email
              </th>

              <th className="p-4 text-left">
                Role
              </th>

              <th className="p-4 text-left">
                Location
              </th>

              <th className="p-4 text-left">
                Score
              </th>

              <th className="p-4 text-left">
                Validation
              </th>

              <th className="p-4 text-left">
                Severity
              </th>

              <th className="p-4 text-left">
                Issues
              </th>

            </tr>

          </thead>


          <tbody>

            {submissions.map((item, index) => (

              <>
              
                {/* MAIN ROW */}

                <tr
                  key={index}
                  className="border-b border-slate-800 hover:bg-slate-800/40"
                >

                  <td className="p-4">
                    {item.submission_id}
                  </td>

                  <td className="p-4 text-slate-400">

                    {
                      item.timestamp
                      ?.slice(0, 19)
                      ?.replace("T", " ")
                    }

                  </td>

                  <td className="p-4">
                    {item.company}
                  </td>

                  <td className="p-4">
                    {item.company_email}
                  </td>

                  <td className="p-4">
                    {item.role}
                  </td>

                  <td className="p-4">
                    {item.location}
                  </td>

                  <td className="p-4">
                    {item.quality_score}
                  </td>

                  <td className={`p-4 font-bold ${getStatusColor(item.validation_label)}`}>

                    {item.validation_label}

                  </td>

                  <td className="p-4">

                    <span className={`
                      px-3 py-1 rounded-full text-sm font-bold

                      ${
                        item.severity === "LOW"
                        ? "bg-green-500/20 text-green-400"
                        : ""
                      }

                      ${
                        item.severity === "MEDIUM"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : ""
                      }

                      ${
                        item.severity === "HIGH"
                        ? "bg-orange-500/20 text-orange-400"
                        : ""
                      }

                      ${
                        item.severity === "CRITICAL"
                        ? "bg-red-500/20 text-red-400"
                        : ""
                      }

                    `}>

                      {item.severity}

                    </span>

                  </td>


                  {/* ISSUES BUTTON */}

                  <td className="p-4">

                    {
                      item.issues?.length > 0
                      ?
                      <button

                        onClick={() => toggleRow(index)}

                        className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm"

                      >

                        {
                          openRow === index
                          ?
                          "Hide Issues"
                          :
                          `View Issues (${item.issues.length})`
                        }

                      </button>
                      :
                      <span className="text-slate-400">

                        None

                      </span>
                    }

                  </td>

                </tr>


                {/* DROPDOWN ROW */}

                {
                  openRow === index
                  &&
                  item.issues?.length > 0
                  &&
                  (

                    <tr className="bg-slate-950 border-b border-slate-800">

                      <td
                        colSpan="10"
                        className="p-6"
                      >

                        <div className="space-y-3">

                          {
                            item.issues.map((issue, i) => (

                              <div

                                key={i}

                                className="bg-red-500/10 border border-red-500/20 text-red-300 px-4 py-3 rounded-lg"

                              >

                                • {issue}

                              </div>

                            ))
                          }

                        </div>

                      </td>

                    </tr>

                  )
                }

              </>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  )
}