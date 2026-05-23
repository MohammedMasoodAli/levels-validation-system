const submissions = [

  {
    submission_id: "SUB001",
    company: "Google",
    role: "Software Engineer",
    score: 96,
    confidence: "High",
    status: "VALID",
    issues: "None"
  },

  {
    submission_id: "SUB007",
    company: "Google",
    role: "Software Engineer",
    score: 12,
    confidence: "High",
    status: "FLAGGED",
    issues: "Extreme salary outlier"
  },

  {
    submission_id: "SUB012",
    company: "Tesla",
    role: "Software Engineer",
    score: 35,
    confidence: "Medium",
    status: "SPAM",
    issues: "Duplicate IP submissions"
  },

  {
    submission_id: "SUB020",
    company: "Meta",
    role: "Software Engineer",
    score: 5,
    confidence: "High",
    status: "INVALID",
    issues: "Negative salary detected"
  },

  {
    submission_id: "SUB028",
    company: "Google",
    role: "Software Engineer",
    score: 55,
    confidence: "Medium",
    status: "REVIEW",
    issues: "Missing education field"
  }

]

export default submissions;