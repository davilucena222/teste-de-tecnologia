import { ToastContainer, toast } from 'react-toastify';
import { Box, ButtonProp, Container, Description, Header, Separator, Title } from './styles';
import { Form } from '../Form';
import { Table } from '../Table';
import { useEffect, useState } from "react";
import { api } from '../../lib/axios';
import "react-toastify/dist/ReactToastify.css";

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

export function Home() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [onEdit, setOnEdit] = useState<UserDataEdit | null>(null);
  const [nameButton, setNameButton] = useState("");
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [compareData, setCompareData] = useState<UserDataEdit | null>();
  const [modalDelete, setModalDelete] = useState(false);

  function toggleFormVisibility() {
    setIsFormVisible(!isFormVisible);
  }

  async function getUsers() {
    try {
      const response = await api.get("http://localhost:4000");
      setUsers(
        response.data.sort((previous: UserData, next: UserData) => (previous.name > next.name ? 1 : -1))
      );

      toast.success(response.data.message);
    } catch(error) {
      alert(error);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await api.delete("/" + id);
      const deletedUser: UserData = response.data;
  
      const newArray = users.filter((user) => user.id !== deletedUser.id);
      setUsers(newArray);

      getUsers();

      setModalDelete(false);

      toast.success(response.data);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  }

  async function handleEdit(user: UserDataEdit) {
    const findUserData = await api.get(`/findUser/${user.id}`).then(response => response.data).catch(({ data }) => toast.error(data));

    setCompareData({
      id: findUserData.id,
      name: findUserData.name,
      email: findUserData.email,
      phone: findUserData.phone,
      created_at: findUserData.created_at,
      upated_at: findUserData.updated_at,
      deleted_at: findUserData.deleted_at
    });

    setNameButton("atualizar");
    toggleFormVisibility();
    setOnEdit(user);
  }
  
  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <Box>
      <Header>
        <Title>Listagem de Usuários Cadastrados</Title>
        <ButtonProp onClick={toggleFormVisibility}>Adicionar usuário</ButtonProp>
      </Header>

      <Separator />

      <Container>
      {isFormVisible && (
        <Form
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getUsers={getUsers}
          toggleFormVisibility={toggleFormVisibility}
          nameButton={nameButton}
          setNameButton={setNameButton}
          setCompareData={setCompareData}
          compareData={compareData}
          users={users}
        />
      )}
      </Container>

      {users.length > 0 ? (
        <Table 
          users={users} 
          setUsers={setUsers} 
          setOnEdit={setOnEdit} 
          handleEdit={handleEdit} 
          handleDelete={handleDelete}
          setModalDelete={setModalDelete}
          modalDelete={modalDelete}
        />
      ) : (
        <Description>Por favor, insira um usuário no banco de cadastros!</Description>
      )}

      <ToastContainer 
        autoClose={3000}
        position={toast.POSITION.BOTTOM_LEFT}
      />
    </Box>
  )
}