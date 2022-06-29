import { Table, Dropdown } from "react-bootstrap";

const TableComponent = ({ actions, columns = [], items = [], refetch }) => {
  if (!items.length) {
    return <h3>There's not data created</h3>;
  }

  return (
    <Table striped bordered hover responsive>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.value}</th>
          ))}

          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            {columns.map((column, indexColumn) => {
              const value = item[column.id];

              return (
                <td key={indexColumn}>
                  {column.render ? column.render(value) : value}
                </td>
              );
            })}
            {actions && (
              <td key={`${index}+1`}>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Actions
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {actions.map((action) => (
                      <Dropdown.Item
                        onClick={() => action.action(item, refetch)}
                      >
                        {action.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableComponent;
