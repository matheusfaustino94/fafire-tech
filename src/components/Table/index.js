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
            <th key={`thead-tr-${index}`}>{column.value}</th>
          ))}

          {actions && <th>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={`tbody-tr-${index}`}>
            {columns.map((column, indexColumn) => {
              const value = item[column.id];

              return (
                <td key={`td-${indexColumn}-${value}`}>
                  {column.render ? column.render(value) : value}
                </td>
              );
            })}
            {actions && (
              <td key={`${index}-${Math.random()}`}>
                <Dropdown>
                  <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                    Actions
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {actions.map((action, index) => (
                      <Dropdown.Item
                        key={`actions-option-${index}`}
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
