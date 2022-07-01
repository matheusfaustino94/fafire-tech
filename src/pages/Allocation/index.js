import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import Page from "../../components/Page";
import ListView from "../../components/ListView";
import Modal from "../../components/Modal";

import api from "../../services/axios";

const endpoint = "/allocations";

const columns = [
  { value: "ID", id: "id" },
  { value: "DayOfWeek", id: "dayOfWeek" },
  { value: "StartHour", id: "startHour" },
  { value: "EndHour", id: "endHour" },
  {
    value: "Professor",
    id: "professor",
    render: (professor) => professor.name,
  },
  {
    value: "Department",
    id: "professor",
    render: (professor) => professor?.department?.name,
  },
  //   {
  //     value: "Course",
  //     id: "course",
  //     render: (course) => course?.name,
  //   },
];

const daysOfWeek = [
  {
    id: "SUNDAY",
    name: "Sunday",
  },
  {
    id: "MONDAY",
    name: "Monday",
  },
  {
    id: "TUESDAY",
    name: "Tuesdays",
  },
  {
    id: "WEDNESDAY",
    name: "Wednesday",
  },
  {
    id: "THURSDAY",
    name: "Thursday",
  },
  {
    id: "FRIDAY",
    name: "Friday",
  },
  {
    id: "SATURDAY",
    name: "Saturday",
  },
];

const INITIAL_STATE = {
  id: 0,
  dayOfWeek: "",
  endHour: "",
  startHour: "",
  professorId: "",
  departmentId: "",
  courseId: "",
};

const Allocation = () => {
  const [allocation, setAllocation] = useState(INITIAL_STATE);
  const [visible, setVisible] = useState(false);

  const [courses, setCourses] = useState([]);
  const [professors, setProfessors] = useState([]);

  const getInitialData = async () => {
    const [responseCourse, responseProfessor] = await Promise.all([
      api.get("/courses"),
      api.get("/professors"),
    ]);

    setCourses(responseCourse.data);
    setProfessors(responseProfessor.data);
  };

  useEffect(() => {
    getInitialData();
  }, []);

  const actions = [
    {
      name: "Edit",
      action: ({
        id,
        dayOfWeek,
        endHour,
        startHour,
        professor: { id: professorId },
        department: { id: departmentId },
        course: { id: courseId },
      }) => {
        setAllocation({
          id,
          dayOfWeek,
          endHour,
          startHour,
          professorId,
          departmentId,
          courseId,
        });
        setVisible(true);
      },
    },
    {
      name: "Remove",
      action: async (allocation, refetch) => {
        if (window.confirm("Você tem certeza disso?")) {
          try {
            await api.delete(`${endpoint}/${allocation.id}`);
            await refetch();

            toast.info(`Alocação foi removida!`);
          } catch (error) {
            toast.info(error.message);
          }
        }
      },
    },
  ];

  const handleSave = async (refetch) => {
    try {
      if (allocation.id) {
        await api.put(`${endpoint}/${allocation.id}`, data);

        toast.success("Atualizado com sucesso!");
      } else {
        await api.post(endpoint, data);

        toast.success("Alocação cadastrada com sucesso!");
      }
      setVisible(false);

      await refetch();
    } catch (error) {
      toast.info(error.message);
    }
  };

  const onChange = ({ target: { name, value } }) => {
    setAllocation({
      ...allocation,
      [name]: value,
    });
  };

  return (
    <Page title="Allocation">
      <Button
        className="mb-2"
        onClick={() => {
          setAllocation(INITIAL_STATE);
          setVisible(true);
        }}
      >
        Create Allocation
      </Button>

      <ListView columns={columns} actions={actions} endpoint={endpoint}>
        {({ refetch }) => (
          <Modal
            title={`${allocation.id ? "Update" : "Create"} Allocation`}
            show={visible}
            handleSave={() => handleSave(refetch)}
            handleClose={() => setVisible(false)}
          >
            <Form>
              <Form.Group>
                <Form.Label>Day Of Week</Form.Label>
                <select
                  className="form-control"
                  name="dayOfWeek"
                  onChange={onChange}
                  value={allocation.dayOfWeek}
                >
                  {daysOfWeek.map(({ id, name }, index) => (
                    <option key={index} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Start Hour</Form.Label>
                <Form.Control
                  name="startHour"
                  onChange={onChange}
                  type="time"
                  value={allocation.startHour}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>End Hour</Form.Label>
                <Form.Control
                  name="endHour"
                  onChange={onChange}
                  type="time"
                  value={allocation.endHour}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Professor</Form.Label>
                <select
                  className="form-control"
                  name="professorId"
                  onChange={onChange}
                  value={allocation.professorId}
                >
                  <option>Select one professor</option>
                  {professors.map(({ id, name }, index) => (
                    <option key={index} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Course</Form.Label>
                <select
                  className="form-control"
                  name="courseId"
                  onChange={onChange}
                  value={allocation.courseId}
                >
                  <option>Select one course</option>
                  {courses.map(({ id, name }, index) => (
                    <option key={index} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </Form>
          </Modal>
        )}
      </ListView>
    </Page>
  );
};

export default Allocation;
