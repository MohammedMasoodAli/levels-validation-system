import { useState } from "react";
import axios from "axios";

import { addSubmission } from "../services/api";


export default function UploadForm({ refreshData }) {

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({

    company_email: "",
    company: "",

    education: "",
    role: "",
    gender: "",

    level_designation: "",
    years_of_experience: "",

    location: "",
    employment_type: "",

    base_salary: "",
    stock_compensation: "",
    bonus: "",
    total_compensation: ""

  });


  // =====================================
  // HANDLE INPUT CHANGE
  // =====================================

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  // =====================================
  // SUBMIT FORM
  // =====================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      // =====================================
      // AUTO GENERATED SYSTEM VALUES
      // =====================================

      const submission_id =
        "SUB" + Date.now();

      const session_id =
        "SES" + Math.floor(Math.random() * 100000000);

      const timestamp =
        new Date().toISOString();


      // =====================================
      // CLEAN NUMERIC VALUES
      // =====================================

      const cleanedData = {

        ...formData,

        years_of_experience:
          Number(formData.years_of_experience),

        base_salary:
          Number(formData.base_salary),

        stock_compensation:
          Number(formData.stock_compensation),

        bonus:
          Number(formData.bonus),

        total_compensation:
          Number(formData.total_compensation)

      };


      // =====================================
      // SEND TO FASTAPI VALIDATOR
      // =====================================

      const response = await axios.post(

        "https://levels-validation-system.onrender.com/validate",

        cleanedData

      );


      // =====================================
      // AI VALIDATION RESULT
      // =====================================

      const analysis = response.data;


      // =====================================
      // FINAL FIRESTORE DOCUMENT
      // =====================================

      const finalSubmission = {

        submission_id,
        session_id,
        timestamp,

        ...cleanedData,

        ...analysis

      };


      // =====================================
      // SAVE TO FIRESTORE
      // =====================================

      await addSubmission(finalSubmission);


      alert("Submission analyzed & uploaded");


      // =====================================
      // RESET FORM
      // =====================================

      setFormData({

        company_email: "",
        company: "",

        education: "",
        role: "",
        gender: "",

        level_designation: "",
        years_of_experience: "",

        location: "",
        employment_type: "",

        base_salary: "",
        stock_compensation: "",
        bonus: "",
        total_compensation: ""

      });


      refreshData();

    }

    catch(error) {

      console.log(error);

      alert("Validation API Error");

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 mt-10">

      <h2 className="text-3xl font-bold mb-8">

        Upload Salary Submission

      </h2>


      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-6"
      >


        {/* EMAIL */}

        <input
          type="email"
          name="company_email"
          placeholder="Company Email"
          value={formData.company_email}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
          required
        />


        {/* COMPANY */}

        <select
          name="company"
          value={formData.company}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
          required
        >

          <option value="">
            Select Company
          </option>

          <option value="Google">
            Google
          </option>

          <option value="Meta">
            Meta
          </option>

          <option value="Amazon">
            Amazon
          </option>

          <option value="Microsoft">
            Microsoft
          </option>

          <option value="Apple">
            Apple
          </option>

          <option value="Netflix">
            Netflix
          </option>

          <option value="Tesla">
            Tesla
          </option>

          <option value="Uber">
            Uber
          </option>

          <option value="Adobe">
            Adobe
          </option>

          <option value="Salesforce">
            Salesforce
          </option>

        </select>


        {/* EDUCATION */}

        <select
          name="education"
          value={formData.education}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
        >

          <option value="">
            Education
          </option>

          <option value="Bachelor">
            Bachelor
          </option>

          <option value="Master">
            Master
          </option>

          <option value="PhD">
            PhD
          </option>

        </select>


        {/* ROLE */}

        <input
          type="text"
          name="role"
          placeholder="Role"
          value={formData.role}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
          required
        />


        {/* GENDER */}

        <select
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
        >

          <option value="">
            Gender
          </option>

          <option value="Male">
            Male
          </option>

          <option value="Female">
            Female
          </option>

          <option value="Other">
            Other
          </option>

        </select>


        {/* LEVEL */}

        <input
          type="text"
          name="level_designation"
          placeholder="Level / Designation"
          value={formData.level_designation}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
        />


        {/* EXPERIENCE */}

        <input
          type="number"
          name="years_of_experience"
          placeholder="Years of Experience"
          value={formData.years_of_experience}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
        />


        {/* LOCATION */}

        <input
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
          required
        />


        {/* EMPLOYMENT TYPE */}

        <select
          name="employment_type"
          value={formData.employment_type}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
        >

          <option value="">
            Employment Type
          </option>

          <option value="Full-Time">
            Full-Time
          </option>

          <option value="Intern">
            Intern
          </option>

          <option value="Contract">
            Contract
          </option>

        </select>


        {/* BASE SALARY */}

        <input
          type="number"
          name="base_salary"
          placeholder="Base Salary"
          value={formData.base_salary}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
          required
        />


        {/* STOCK */}

        <input
          type="number"
          name="stock_compensation"
          placeholder="Stock Compensation"
          value={formData.stock_compensation}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
        />


        {/* BONUS */}

        <input
          type="number"
          name="bonus"
          placeholder="Bonus"
          value={formData.bonus}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
        />


        {/* TOTAL COMP */}

        <input
          type="number"
          name="total_compensation"
          placeholder="Total Compensation"
          value={formData.total_compensation}
          onChange={handleChange}
          className="bg-slate-800 p-4 rounded-xl outline-none"
          required
        />


        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
          className="bg-cyan-500 hover:bg-cyan-600 disabled:bg-slate-600 p-4 rounded-xl font-bold col-span-2"
        >

          {
            loading
            ?
            "Analyzing Submission..."
            :
            "Analyze & Upload Submission"
          }

        </button>

      </form>

    </div>
  )
}
