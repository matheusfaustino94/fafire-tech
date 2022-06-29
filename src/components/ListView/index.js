import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import Loading from "../../components/Loading";
import api from "../../services/axios";
import Table from "../Table";

const ListView = ({ actions, children, columns, endpoint }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);

    try {
      const response = await api.get(endpoint);

      setItems(response.data);
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Table
          actions={actions}
          columns={columns}
          items={items}
          refetch={getData}
        />
      )}
      {children && children({ refetch: getData })}
    </>
  );
};

export default ListView;
