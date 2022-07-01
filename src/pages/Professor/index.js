import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

import Page from "../../components/Page";
import ListView from "../../components/ListView";
import Modal from "../../components/Modal";

import api from "../../services/axios";

const endpoint = "/professors";

const columns = [
  { value: "ID", id: "id" },
  { value: "Name", id: "name" },
  { value: "CPF", id: "cpf" },
  {
    value: "Department",
    id: "department",
    render: (department) => department.name,
  },
];

const INITIAL_STATE = { id: 0, name: "", cpf: "", departmentId: 0 };

const Professor = () => {
  const [professor, setProfessor] = useState(INITIAL_STATE);
  const [visible, setVisible] = useState(false);
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    api
      .get("/departments")
      .then((response) => {
        //se o back der sucesso
        setDepartments(response.data);
      })
      .catch((error) => {
        //se o back der erro
        toast.error(error.message);
      });
  }, []);

  const actions = [
    {
      name: "Edit",
      action: ({ id, name, cpf, department: { id: departmentId } }) => {
        setProfessor({ id, name, cpf, departmentId });
        setVisible(true);
      },
    },
    {
      name: "Remove",
      action: async (professor, refetch) => {
        if (window.confirm("Você tem certeza disso?")) {
          try {
            await api.delete(`${endpoint}/${professor.id}`);
            await refetch();

            toast.info(`Professor(a) ${professor.name} foi removido(a)!`);
          } catch (error) {
            toast.info(error.message);
          }
        }
      },
    },
  ];

  const handleSave = async (refetch) => {
    const data = {
      name: professor.name,
      cpf: professor.cpf,
      departmentId: professor.departmentId,
    };

    try {
      if (professor.id) {
        await api.put(`${endpoint}/${professor.id}`, data);

        toast.success("Atualizado com sucesso!");
      } else {
        await api.post(endpoint, data);

        toast.success("Departamento foi cadastrado com sucesso!");
      }
      setVisible(false);

      await refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  //função genérica que pode ser reutilizada por todos os inputs do modal de professor
  const onChange = ({ target: { name, value } }) => {
    setProfessor({
      ...professor,
      [name]: value,
    });
  };

  return (
    <Page title="Professors">
      <Button
        className="mb-2"
        onClick={() => {
          setProfessor(INITIAL_STATE);
          setVisible(true);
        }}
      >
        Create Professor
      </Button>

      <ListView columns={columns} actions={actions} endpoint={endpoint}>
        {({ refetch }) => (
          <Modal
            title={`${professor.id ? "Update" : "Create"} Professor`}
            show={visible}
            handleSave={() => handleSave(refetch)}
            handleClose={() => setVisible(false)}
          >
            <Form>
              <Form.Group>
                <Form.Label>Professor Name</Form.Label>
                <Form.Control
                  name="name"
                  onChange={onChange}
                  value={professor.name}
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Professor CPF</Form.Label>
                <Form.Control
                  name="cpf"
                  onChange={onChange}
                  value={professor.cpf}
                />
              </Form.Group>
              <Form.Group className="mt-4">
                <Form.Label>Department</Form.Label>
                <select
                  className="form-control"
                  name="departmentId"
                  onChange={onChange}
                  value={professor.departmentId}
                >
                  <option>Select one department</option>
                  {departments.map((department, index) => {
                    return (
                      <option key={index} value={department.id}>
                        {department.name}
                      </option>
                    );
                  })}
                </select>
              </Form.Group>
            </Form>
          </Modal>
        )}
      </ListView>
    </Page>
  );
};

export default Professor;
