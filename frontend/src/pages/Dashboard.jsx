import { useEffect, useState } from "react";

import MainLayout from "../layouts/MainLayout";
import AnalyticsCharts from "../components/AnalyticsCharts";
import StatsCard from "../components/StatsCard";
import AlertCard from "../components/AlertCard";
import SubmissionTable from "../components/SubmissionTable";
import UploadForm from "../components/UploadForm";

import { getSubmissions } from "../services/api";


export default function Dashboard() {

  // FIRESTORE STATE

  const [submissions, setSubmissions] = useState([]);


  // FETCH DATA

  useEffect(() => {

    fetchData();

  }, []);


  const fetchData = async () => {

    const data = await getSubmissions();

    setSubmissions(data);

  };


  // DASHBOARD ANALYTICS

  const totalSubmissions = submissions.length;


  const flaggedSubmissions = submissions.filter(
    item => item.flagged === true
  ).length;


  const spamRisk = totalSubmissions > 0
    ?
      (
        (flaggedSubmissions / totalSubmissions) * 100
      ).toFixed(1)
    :
      0;


  const averageTrustScore = totalSubmissions > 0
    ?
      (
        submissions.reduce(
          (acc, item) =>
            acc + Number(item.quality_score || 0),
          0
        ) / totalSubmissions
      ).toFixed(0)
    :
      0;


  return (

    <MainLayout>

      {/* HEADER */}

      <div>

        <h1 className="text-4xl font-bold">

          Validation Dashboard

        </h1>

        <p className="text-slate-400 mt-2">

          AI-powered crowdsourced data validation system

        </p>

      </div>


      {/* STATS */}

      <div className="grid grid-cols-4 gap-6 mt-10">

        <StatsCard
          title="Total Submissions"
          value={totalSubmissions}
          color="text-cyan-400"
        />

        <StatsCard
          title="Flagged Submissions"
          value={flaggedSubmissions}
          color="text-red-400"
        />

        <StatsCard
          title="Average Trust Score"
          value={`${averageTrustScore}%`}
          color="text-green-400"
        />

        <StatsCard
          title="Spam Risk"
          value={`${spamRisk}%`}
          color="text-yellow-400"
        />

      </div>


      {/* AI ALERTS */}

      <div className="mt-12">

        <h2 className="text-2xl font-bold mb-6">

          AI Alerts

        </h2>

        <div className="grid grid-cols-2 gap-6">

          <AlertCard
            title="Suspicious Salary Spike"
            description="Extreme compensation anomaly detected in recent uploads."
            type="danger"
          />

          <AlertCard
            title="Duplicate Submission Pattern"
            description="Multiple uploads detected from identical IP sources."
            type="warning"
          />

          <AlertCard
            title="Validation Pipeline Active"
            description="AI validation services running normally."
            type="success"
          />

          <AlertCard
            title="Compensation Mismatch"
            description="Some submissions contain inconsistent compensation values."
            type="danger"
          />

        </div>

      </div>
      
      <AnalyticsCharts submissions={submissions} />

      {/* UPLOAD FORM */}

      <UploadForm refreshData={fetchData} />


      {/* SUBMISSION TABLE */}

      <SubmissionTable submissions={submissions} />

    </MainLayout>

  );
}