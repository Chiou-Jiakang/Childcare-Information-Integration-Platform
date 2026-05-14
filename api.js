const SUPABASE_URL = "https://rfzavcliggzlpkqqcrzr.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_48pF8e_sZQP5MQXKkeeTOQ_pfESdvZV";

const supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// =======================
// STAFF CRUD API
// =======================

async function getStaff() {
  const { data, error } = await supabaseClient
    .from("staff")
    .select("*")
    .order("staff_id", { ascending: true });

  if (error) {
    console.error("Get staff failed:", error);
    return [];
  }

  console.log("STAFF:", data);
  return data;
}

async function getStaffByCenter(centerId) {
  const { data, error } = await supabaseClient
    .from("staff")
    .select("*")
    .eq("center_id", centerId)
    .order("staff_id", { ascending: true });

  if (error) {
    console.error("Get staff by center failed:", error);
    return [];
  }

  console.log("CENTER STAFF:", data);
  return data;
}

async function createStaff(staff) {
  const { data, error } = await supabaseClient
    .from("staff")
    .insert([staff])
    .select();

  if (error) {
    console.error("Create staff failed:", error);
    return null;
  }

  console.log("Created staff:", data);
  return data;
}

async function updateStaff(staffId, updates) {
  const { data, error } = await supabaseClient
    .from("staff")
    .update(updates)
    .eq("staff_id", staffId)
    .select();

  if (error) {
    console.error("Update staff failed:", error);
    return null;
  }

  console.log("Updated staff:", data);
  return data;
}

async function deleteStaff(staffId) {
  const { error } = await supabaseClient
    .from("staff")
    .delete()
    .eq("staff_id", staffId);

  if (error) {
    console.error("Delete staff failed:", error);
    return false;
  }

  console.log("Deleted staff_id:", staffId);
  return true;
}

// =======================
// GOVERNMENT_EVALUATION CRUD API
// table: evaluation_record
// 注意：資料庫欄位實際名稱是 evalution_result
// =======================

async function getEvaluationRecords() {
  const { data, error } = await supabaseClient
    .from("evaluation_record")
    .select("*")
    .order("evaluation_id", { ascending: true });

  if (error) {
    console.error("Get evaluation records failed:", error);
    return [];
  }

  console.log("EVALUATION_RECORD:", data);
  return data;
}

async function getEvaluationRecordsByCenter(centerId) {
  const { data, error } = await supabaseClient
    .from("evaluation_record")
    .select("*")
    .eq("center_id", centerId)
    .order("completion_date", { ascending: false });

  if (error) {
    console.error("Get evaluation history by center failed:", error);
    return [];
  }

  console.log("CENTER EVALUATION HISTORY:", data);
  return data;
}

async function createEvaluationRecord(record) {
  const { data, error } = await supabaseClient
    .from("evaluation_record")
    .insert([record])
    .select();

  if (error) {
    console.error("Create evaluation record failed:", error);
    return null;
  }

  console.log("Created evaluation record:", data);
  return data;
}

async function updateEvaluationRecord(evaluationId, updates) {
  const { data, error } = await supabaseClient
    .from("evaluation_record")
    .update(updates)
    .eq("evaluation_id", evaluationId)
    .select();

  if (error) {
    console.error("Update evaluation record failed:", error);
    return null;
  }

  console.log("Updated evaluation record:", data);
  return data;
}

async function deleteEvaluationRecord(evaluationId) {
  const { error } = await supabaseClient
    .from("evaluation_record")
    .delete()
    .eq("evaluation_id", evaluationId);

  if (error) {
    console.error("Delete evaluation record failed:", error);
    return false;
  }

  console.log("Deleted evaluation_id:", evaluationId);
  return true;
}

// =======================
// Render data to admin.html
// =======================

async function renderStaffTable() {
  const staffData = await getStaff();
  const tbody = document.getElementById("staff-table-body");

  if (!tbody) return;

  tbody.innerHTML = "";

  staffData.forEach((staff) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${staff.staff_id}</td>
      <td>${staff.center_id}</td>
      <td>${staff.name}</td>
      <td>${staff.role}</td>
      <td>${staff.qualification}</td>
      <td>${staff.biography}</td>
    `;

    tbody.appendChild(row);
  });
}

async function renderEvaluationTable() {
  const evaluationData = await getEvaluationRecords();
  const tbody = document.getElementById("evaluation-table-body");

  if (!tbody) return;

  tbody.innerHTML = "";

  evaluationData.forEach((record) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${record.evaluation_id}</td>
      <td>${record.center_id}</td>
      <td>${record.evaluation_academic_year}</td>
      <td>${record.completion_date}</td>
      <td>${record.evalution_result}</td>
      <td>${record.non_compliance_details ?? "無"}</td>
    `;

    tbody.appendChild(row);
  });
}

async function initAdminPage() {
  await renderStaffTable();
  await renderEvaluationTable();
}

initAdminPage();
