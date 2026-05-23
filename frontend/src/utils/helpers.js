export const analyzeSubmission = (data) => {

  let validation_label = "VALID";

  let quality_score = 100;

  let confidence = "High";

  let issues = [];

  let flagged = false;


  // =====================================
  // NORMALIZATION
  // =====================================

  const company =
    data.company?.trim().toLowerCase();

  const role =
    data.role?.trim().toLowerCase();

  const email =
    data.company_email?.trim();

  const location =
    data.location?.trim().toLowerCase();

  const education =
    data.education?.trim();

  const level =
    data.level_designation?.trim().toLowerCase();

  const baseSalary =
    Number(data.base_salary);

  const totalComp =
    Number(data.total_compensation);

  const experience =
    Number(data.years_of_experience);


  // =====================================
  // VALID COMPANIES
  // =====================================

  const validCompanies = [

    "google",
    "meta",
    "amazon",
    "microsoft",
    "apple",
    "netflix",
    "tesla",
    "uber",
    "adobe",
    "salesforce"

  ];


  // =====================================
  // GIBBERISH DETECTION
  // =====================================

  const gibberishRegex =
    /([a-z])\1{4,}|[0-9]{5,}|^[a-z]{1,3}$/i;


  if (
    gibberishRegex.test(company)
    ||
    gibberishRegex.test(role)
  ) {

    validation_label = "SPAM_GIBBERISH";

    quality_score -= 60;

    flagged = true;

    issues.push(
      "Gibberish text detected"
    );

  }


  // =====================================
  // EMAIL VALIDATION
  // =====================================

  const emailRegex =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  if (!emailRegex.test(email)) {

    validation_label = "INVALID_EMAIL";

    quality_score -= 40;

    flagged = true;

    issues.push(
      "Invalid company email format"
    );

  }


  // =====================================
  // COMPANY VALIDATION
  // =====================================

  if (!validCompanies.includes(company)) {

    validation_label = "UNKNOWN_COMPANY";

    quality_score -= 25;

    flagged = true;

    issues.push(
      "Company not recognized"
    );

  }


  // =====================================
  // TOTAL COMP VALIDATION
  // =====================================

  if (totalComp < baseSalary) {

    validation_label = "INVALID_TOTAL_COMP";

    quality_score -= 40;

    flagged = true;

    issues.push(
      "Total compensation lower than base salary"
    );

  }


  // =====================================
  // EXTREME HIGH SALARY
  // =====================================

  if (baseSalary > 700000) {

    validation_label = "ANOMALY_HIGH_SALARY";

    quality_score -= 50;

    flagged = true;

    issues.push(
      "Extreme salary anomaly detected"
    );

  }


  // =====================================
  // GOOGLE LOW SALARY
  // =====================================

  if (
    company === "google"
    &&
    baseSalary < 50000
  ) {

    validation_label = "ANOMALY_LOW_SALARY";

    quality_score -= 35;

    flagged = true;

    issues.push(
      "Salary too low for Google benchmark"
    );

  }


  // =====================================
  // EXPERIENCE MISMATCH
  // =====================================

  if (
    experience > 20
    &&
    level === "l3"
  ) {

    validation_label = "EXPERIENCE_MISMATCH";

    quality_score -= 35;

    flagged = true;

    issues.push(
      "Experience inconsistent with level"
    );

  }


  // =====================================
  // INTERN HIGH SALARY
  // =====================================

  if (
    role.includes("intern")
    &&
    baseSalary > 200000
  ) {

    validation_label = "ROLE_COMP_MISMATCH";

    quality_score -= 50;

    flagged = true;

    issues.push(
      "Intern compensation unrealistic"
    );

  }


  // =====================================
  // REQUIRED FIELDS
  // =====================================

  if (
    !company ||
    !role ||
    !location ||
    !education
  ) {

    validation_label = "INCOMPLETE_SUBMISSION";

    quality_score -= 25;

    flagged = true;

    issues.push(
      "Required fields missing"
    );

  }


  // =====================================
  // TRUST SCORE LIMITS
  // =====================================

  if (quality_score < 0) {

    quality_score = 0;

  }


  // =====================================
  // CONFIDENCE LEVEL
  // =====================================

  if (quality_score >= 80) {

    confidence = "High";

  }

  else if (quality_score >= 50) {

    confidence = "Medium";

  }

  else {

    confidence = "Low";

  }


  // =====================================
  // FINAL RESULT
  // =====================================

  return {

    validation_label,
    quality_score,
    confidence,
    issues,
    flagged

  };

};