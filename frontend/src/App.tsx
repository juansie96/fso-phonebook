import { useEffect, useState } from "react";
import phonebookService from "../services/phonebook";
import "./App.css";
import { Person } from "../types/person";

interface PersonsState {
  data: Person[] | null;
  isLoading: boolean;
  error: unknown;
}

function App() {
  const [personsState, setPersonsState] = useState<PersonsState>({
    data: null,
    isLoading: false,
    error: null,
  });

  console.log(personsState);

  const fetchPersons = async () => {
    setPersonsState((prevState) => ({ ...prevState, isLoading: true }));
    try {
      const data = await phonebookService.getAll();
      setPersonsState({ data, isLoading: false, error: null });
    } catch (error) {
      console.error(error);
      setPersonsState({ data: null, isLoading: false, error });
    }
  };

  useEffect(() => {
    fetchPersons();
  }, []);

  const { data, isLoading, error } = personsState;

  const handleDeletePerson = async (id: number) => {
    try {
      await phonebookService.deleteById(id);
      setPersonsState((prevState) => ({
        ...prevState,
        data: prevState.data?.filter((p) => p.id !== id) || null,
      }));
    } catch (error) {
      console.error(error);
      alert(
        "Error when trying to delete person, please try again or go fuck yourself."
      );
    }
  };

  if (isLoading) return <p>Is loading madafka, be patient </p>;
  if (error)
    return <p>An error just occurred, please panic as hard as you can</p>;

  return (
    <>
      {data?.length &&
        data.map((person) => (
          <div key={person.number}>
            <span>{person.name}</span> - <span>{person.number}</span>
            <button onClick={() => handleDeletePerson(person.id)}>
              Delete person!
            </button>
            <br />
          </div>
        ))}
    </>
  );
}

export default App;
