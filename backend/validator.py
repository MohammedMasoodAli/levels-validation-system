from email_validator import validate_email, EmailNotValidError
from disposable_email_domains import blocklist


# =========================================
# VALID DATASETS
# =========================================

VALID_COMPANIES = {

    "google": "google.com",
    "meta": "meta.com",
    "amazon": "amazon.com",
    "microsoft": "microsoft.com",
    "apple": "apple.com",
    "netflix": "netflix.com",
    "tesla": "tesla.com",
    "uber": "uber.com",
    "adobe": "adobe.com",
    "salesforce": "salesforce.com"

}


VALID_LOCATIONS = [

    "bangalore",
    "hyderabad",
    "mumbai",
    "delhi",
    "pune",
    "chennai",
    "san francisco",
    "seattle",
    "new york",
    "mountain view",
    "london",
    "singapore"

]


# =========================================
# MEMORY TRACKING
# =========================================

SEEN_SESSIONS = set()

SEEN_EMAILS = {}


# =========================================
# MAIN VALIDATOR
# =========================================

def analyze_submission(data):

    validation_label = "VALID"

    quality_score = 100

    confidence = "High"

    severity = "LOW"

    issues = []

    flagged = False


    # =====================================
    # NORMALIZATION
    # =====================================

    company = data.get(
        "company",
        ""
    ).strip().lower()

    email = data.get(
        "company_email",
        ""
    ).strip().lower()

    role = data.get(
        "role",
        ""
    ).strip().lower()

    location = data.get(
        "location",
        ""
    ).strip().lower()

    level = data.get(
        "level_designation",
        ""
    ).strip().lower()

    session_id = data.get(
        "session_id",
        ""
    )

    base_salary = float(
        data.get("base_salary", 0)
    )

    total_comp = float(
        data.get("total_compensation", 0)
    )

    experience = float(
        data.get("years_of_experience", 0)
    )


    # =====================================
    # EMAIL VALIDATION
    # =====================================

    try:

        valid = validate_email(email)

        email = valid.email

    except EmailNotValidError:

        validation_label = "INVALID_EMAIL"

        quality_score -= 40

        flagged = True

        issues.append(
            "Invalid email format"
        )


    # =====================================
    # DISPOSABLE EMAIL DETECTION
    # =====================================

    domain = email.split("@")[-1]

    if domain in blocklist:

        validation_label = "DISPOSABLE_EMAIL"

        quality_score -= 40

        flagged = True

        issues.append(
            "Disposable email domain detected"
        )


    # =====================================
    # DUPLICATE SESSION DETECTION
    # =====================================

    if session_id in SEEN_SESSIONS:

        validation_label = "DUPLICATE_SESSION"

        quality_score -= 45

        flagged = True

        issues.append(
            "Repeated session detected"
        )

    else:

        SEEN_SESSIONS.add(session_id)


    # =====================================
    # EMAIL SPAM DETECTION
    # =====================================

    if email in SEEN_EMAILS:

        SEEN_EMAILS[email] += 1

    else:

        SEEN_EMAILS[email] = 1


    if SEEN_EMAILS[email] > 3:

        validation_label = "EMAIL_SPAM_PATTERN"

        quality_score -= 50

        flagged = True

        issues.append(
            "Repeated submission spam detected"
        )


    # =====================================
    # COMPANY VALIDATION
    # =====================================

    if company not in VALID_COMPANIES:

        validation_label = "UNKNOWN_COMPANY"

        quality_score -= 25

        flagged = True

        issues.append(
            "Company not recognized"
        )


    # =====================================
    # EMAIL DOMAIN VALIDATION
    # =====================================

    if company in VALID_COMPANIES:

        expected_domain = VALID_COMPANIES[company]

        if expected_domain not in email:

            validation_label = "EMAIL_COMPANY_MISMATCH"

            quality_score -= 30

            flagged = True

            issues.append(
                "Email domain does not match company"
            )


    # =====================================
    # LOCATION VALIDATION
    # =====================================

    if location not in VALID_LOCATIONS:

        validation_label = "INVALID_LOCATION"

        quality_score -= 30

        flagged = True

        issues.append(
            "Location not recognized"
        )


    # =====================================
    # TOTAL COMP VALIDATION
    # =====================================

    if total_comp < base_salary:

        validation_label = "INVALID_TOTAL_COMP"

        quality_score -= 40

        flagged = True

        issues.append(
            "Total compensation lower than base salary"
        )


    # =====================================
    # HIGH SALARY ANOMALY
    # =====================================

    if base_salary > 700000:

        validation_label = "ANOMALY_HIGH_SALARY"

        quality_score -= 50

        flagged = True

        issues.append(
            "Extreme salary anomaly detected"
        )


    # =====================================
    # GOOGLE LOW SALARY
    # =====================================

    if (

        company == "google"

        and

        base_salary < 50000

    ):

        validation_label = "ANOMALY_LOW_SALARY"

        quality_score -= 35

        flagged = True

        issues.append(
            "Salary too low for Google benchmark"
        )


    # =====================================
    # EXPERIENCE VS LEVEL
    # =====================================

    if (

        experience > 20

        and

        level == "l3"

    ):

        validation_label = "EXPERIENCE_MISMATCH"

        quality_score -= 30

        flagged = True

        issues.append(
            "Experience inconsistent with level"
        )


    # =====================================
    # INTERN SALARY CHECK
    # =====================================

    if (

        "intern" in role

        and

        base_salary > 200000

    ):

        validation_label = "ROLE_COMPENSATION_MISMATCH"

        quality_score -= 45

        flagged = True

        issues.append(
            "Intern compensation unrealistic"
        )


    # =====================================
    # REQUIRED FIELD CHECK
    # =====================================

    required_fields = [

        company,
        email,
        role,
        location

    ]


    if any(field == "" for field in required_fields):

        validation_label = "INCOMPLETE_SUBMISSION"

        quality_score -= 20

        flagged = True

        issues.append(
            "Required fields missing"
        )


    # =====================================
    # QUALITY SCORE LIMIT
    # =====================================

    if quality_score < 0:

        quality_score = 0


    # =====================================
    # CONFIDENCE LOGIC
    # =====================================

    if quality_score >= 80:

        confidence = "High"

    elif quality_score >= 50:

        confidence = "Medium"

    else:

        confidence = "Low"


    # =====================================
    # SEVERITY LOGIC
    # =====================================

    if quality_score < 80:

        severity = "MEDIUM"

    if quality_score < 50:

        severity = "HIGH"

    if quality_score < 25:

        severity = "CRITICAL"


    # =====================================
    # FINAL RESULT
    # =====================================

    return {

        "validation_label": validation_label,

        "quality_score": quality_score,

        "confidence": confidence,

        "severity": severity,

        "issues": issues,

        "flagged": flagged

    }