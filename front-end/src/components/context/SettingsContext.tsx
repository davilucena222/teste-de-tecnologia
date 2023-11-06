import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../../lib/axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

interface SettingsContextType {
  getUsers: () => void;
  handleDelete: (id: string) => void;
  handleEdit: (user: UserDataEdit) => void;
  toggleFormVisibility: () => void;
  users: UserData[];
  onEdit: UserDataEdit | null;
  nameButton: string;
  isFormVisible: boolean;
  compareData: UserDataEdit | null | undefined;
  modalDelete: boolean;
  setModalDelete: (modalDelete: boolean) => void;
  setOnEdit: (user: UserDataEdit | null) => void;
  setNameButton: (name: string) => void;
  setCompareData: (user: UserDataEdit | null) => void;
  setIsFormVisible: (isFormVisible: boolean) => void;
  setUsers: (users: UserData[]) => void;
}

const initialContextValue: SettingsContextType = {
  getUsers: () => {},
  handleDelete: () => {},
  handleEdit: () => {},
  toggleFormVisibility: () => {},
  users: [],
  onEdit: null,
  nameButton: "",
  isFormVisible: false,
  compareData: null,
  modalDelete: false,
  setModalDelete: () => {},
  setOnEdit: () => {},
  setNameButton: () => {},
  setCompareData: () => {},
  setIsFormVisible: () => {},
  setUsers: () => {},
}

export const SettingsContext = createContext(initialContextValue);

interface SettingsContextProps {
  children: ReactNode;
}

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  upated_at: Date;
  deleted_at: Date;
}[]

interface UserDataEdit {
  id: string;
  name: string;
  email: string;
  phone: string;
  created_at: Date;
  upated_at: Date;
  deleted_at: Date;
}

export const SettingsContextProvider = ({ children }: SettingsContextProps) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [modalDelete, setModalDelete] = useState(false);
  const [compareData, setCompareData] = useState<UserDataEdit | null>();
  const [onEdit, setOnEdit] = useState<UserDataEdit | null>(null);
  const [nameButton, setNameButton] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);

  async function getUsers() {
    try {
      const response = await api.get("http://localhost:4000");
      const allUsers: UserData[] = response.data;
      const filteredUsers = allUsers.filter((user) => user.deleted_at === null);

      const sortedUsers = filteredUsers.sort((previous: UserData, next: UserData) =>
      previous.name > next.name ? 1 : -1);

      setUsers(sortedUsers);

      toast.success(response.data.message);
    } catch(error) {
      alert(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await api.put(`/${id}/deleteUser`);
      const newArray = users.filter((user) => user.id !== id);
      setUsers(newArray);

      setModalDelete(false);

      toast.success(response.data);
    } catch (error) {
      alert(error);
    }
  }

  async function handleEdit(user: UserDataEdit) {
    const foundUser = await api.get(`/findUser/${user.id}`).then(response => response.data).catch(({ data }) => toast.error(data));

    if (foundUser) {
      setCompareData({
        id: foundUser.id,
        name: foundUser.name,
        email: foundUser.email,
        phone: foundUser.phone,
        created_at: foundUser.created_at,
        upated_at: foundUser.upated_at,
        deleted_at: foundUser.deleted_at,
      });

      setNameButton("atualizar");
      toggleFormVisibility();
      setOnEdit(user);
    } else {
      toast.error("Usuário não encontrado na lista de usuários!");
    }
  }

  function toggleFormVisibility() {
    setIsFormVisible(!isFormVisible);
  }

  return (
    <SettingsContext.Provider
      value={{
        compareData, 
        getUsers, 
        handleDelete, 
        handleEdit, 
        isFormVisible, 
        modalDelete, 
        nameButton, 
        onEdit, 
        setCompareData, 
        setIsFormVisible, 
        setModalDelete, 
        setNameButton, 
        setOnEdit, 
        setUsers, 
        users, 
        toggleFormVisibility
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettingsContext = () => {
  return useContext(SettingsContext);
}