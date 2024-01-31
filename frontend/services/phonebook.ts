import axios from "axios";

const BASE_URL = "/api/persons";

const getAll = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

const deletePerson = async (id: number) => {
  const response = await axios.delete(BASE_URL + "/" + id);
  return response.data;
};

// getAll, getById, create, delete
export default { getAll, deletePerson };
