export const hospitalTemplate = {
  id: "hospital",
  name: "Hospital Management",
  description: "Healthcare schema with Patients, Doctors, Appointments, and Prescriptions.",
  thumbnail: null,
  databaseType: "postgresql",
  canvasData: {
    nodes: [
      {
        id: "tbl_patients",
        type: "tableNode",
        position: { x: 50, y: 50 },
        data: {
          name: "Patients",
          columns: [
            { id: "col_pat_1", name: "id", type: "SERIAL", isPk: true, nullable: false },
            { id: "col_pat_2", name: "first_name", type: "VARCHAR", nullable: false },
            { id: "col_pat_3", name: "last_name", type: "VARCHAR", nullable: false },
            { id: "col_pat_4", name: "date_of_birth", type: "DATE", nullable: false },
            { id: "col_pat_5", name: "phone", type: "VARCHAR", nullable: true },
          ],
        },
      },
      {
        id: "tbl_doctors",
        type: "tableNode",
        position: { x: 50, y: 300 },
        data: {
          name: "Doctors",
          columns: [
            { id: "col_doc_1", name: "id", type: "SERIAL", isPk: true, nullable: false },
            { id: "col_doc_2", name: "name", type: "VARCHAR", nullable: false },
            { id: "col_doc_3", name: "specialty", type: "VARCHAR", nullable: false },
            { id: "col_doc_4", name: "license_no", type: "VARCHAR", unique: true, nullable: false },
          ],
        },
      },
      {
        id: "tbl_appointments",
        type: "tableNode",
        position: { x: 380, y: 170 },
        data: {
          name: "Appointments",
          columns: [
            { id: "col_app_1", name: "id", type: "SERIAL", isPk: true, nullable: false },
            { id: "col_app_2", name: "patient_id", type: "INTEGER", isFk: true, nullable: false },
            { id: "col_app_3", name: "doctor_id", type: "INTEGER", isFk: true, nullable: false },
            { id: "col_app_4", name: "appointment_date", type: "TIMESTAMP", nullable: false },
            { id: "col_app_5", name: "status", type: "VARCHAR", nullable: false },
          ],
        },
      },
      {
        id: "tbl_prescriptions",
        type: "tableNode",
        position: { x: 710, y: 170 },
        data: {
          name: "Prescriptions",
          columns: [
            { id: "col_pre_1", name: "id", type: "SERIAL", isPk: true, nullable: false },
            { id: "col_pre_2", name: "appointment_id", type: "INTEGER", isFk: true, nullable: false },
            { id: "col_pre_3", name: "medication_notes", type: "TEXT", nullable: false },
            { id: "col_pre_4", name: "issued_date", type: "DATE", nullable: false },
          ],
        },
      },
    ],
    edges: [
      {
        id: "edge_patient_appointment",
        source: "tbl_patients",
        target: "tbl_appointments",
        sourceHandle: "source-tbl_patients-col_pat_1",
        targetHandle: "target-tbl_appointments-col_app_2",
        type: "smoothstep",
      },
      {
        id: "edge_doctor_appointment",
        source: "tbl_doctors",
        target: "tbl_appointments",
        sourceHandle: "source-tbl_doctors-col_doc_1",
        targetHandle: "target-tbl_appointments-col_app_3",
        type: "smoothstep",
      },
      {
        id: "edge_appointment_prescription",
        source: "tbl_appointments",
        target: "tbl_prescriptions",
        sourceHandle: "source-tbl_appointments-col_app_1",
        targetHandle: "target-tbl_prescriptions-col_pre_2",
        type: "smoothstep",
      },
    ],
    viewport: { x: 0, y: 0, zoom: 1 },
  },
};

export default hospitalTemplate;
