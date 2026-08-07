export const schoolTemplate = {
  id: "school",
  name: "School & Education",
  description: "Educational institution model with Students, Teachers, Courses, and Enrollments.",
  thumbnail: null,
  databaseType: "mysql",
  canvasData: {
    nodes: [
      {
        id: "tbl_students",
        type: "tableNode",
        position: { x: 50, y: 50 },
        data: {
          name: "Students",
          columns: [
            { id: "col_stu_1", name: "id", type: "INT", isPk: true, autoIncrement: true, nullable: false },
            { id: "col_stu_2", name: "roll_number", type: "VARCHAR", unique: true, nullable: false },
            { id: "col_stu_3", name: "first_name", type: "VARCHAR", nullable: false },
            { id: "col_stu_4", name: "last_name", type: "VARCHAR", nullable: false },
            { id: "col_stu_5", name: "grade_level", type: "INT", nullable: false },
          ],
        },
      },
      {
        id: "tbl_teachers",
        type: "tableNode",
        position: { x: 50, y: 300 },
        data: {
          name: "Teachers",
          columns: [
            { id: "col_tch_1", name: "id", type: "INT", isPk: true, autoIncrement: true, nullable: false },
            { id: "col_tch_2", name: "name", type: "VARCHAR", nullable: false },
            { id: "col_tch_3", name: "email", type: "VARCHAR", unique: true, nullable: false },
            { id: "col_tch_4", name: "department", type: "VARCHAR", nullable: false },
          ],
        },
      },
      {
        id: "tbl_courses",
        type: "tableNode",
        position: { x: 380, y: 300 },
        data: {
          name: "Courses",
          columns: [
            { id: "col_crs_1", name: "id", type: "INT", isPk: true, autoIncrement: true, nullable: false },
            { id: "col_crs_2", name: "teacher_id", type: "INT", isFk: true, nullable: false },
            { id: "col_crs_3", name: "course_name", type: "VARCHAR", nullable: false },
            { id: "col_crs_4", name: "course_code", type: "VARCHAR", unique: true, nullable: false },
          ],
        },
      },
      {
        id: "tbl_enrollments",
        type: "tableNode",
        position: { x: 380, y: 50 },
        data: {
          name: "Enrollments",
          columns: [
            { id: "col_enr_1", name: "id", type: "INT", isPk: true, autoIncrement: true, nullable: false },
            { id: "col_enr_2", name: "student_id", type: "INT", isFk: true, nullable: false },
            { id: "col_enr_3", name: "course_id", type: "INT", isFk: true, nullable: false },
            { id: "col_enr_4", name: "grade", type: "VARCHAR", nullable: true },
            { id: "col_enr_5", name: "enrolled_at", type: "DATE", nullable: false },
          ],
        },
      },
    ],
    edges: [
      {
        id: "edge_teachers_courses",
        source: "tbl_teachers",
        target: "tbl_courses",
        sourceHandle: "source-tbl_teachers-col_tch_1",
        targetHandle: "target-tbl_courses-col_crs_2",
        type: "smoothstep",
      },
      {
        id: "edge_students_enrollments",
        source: "tbl_students",
        target: "tbl_enrollments",
        sourceHandle: "source-tbl_students-col_stu_1",
        targetHandle: "target-tbl_enrollments-col_enr_2",
        type: "smoothstep",
      },
      {
        id: "edge_courses_enrollments",
        source: "tbl_courses",
        target: "tbl_enrollments",
        sourceHandle: "source-tbl_courses-col_crs_1",
        targetHandle: "target-tbl_enrollments-col_enr_3",
        type: "smoothstep",
      },
    ],
    viewport: { x: 0, y: 0, zoom: 1 },
  },
};

export default schoolTemplate;
