import { ToastContainer, toast } from 'react-toastify';
import { Box, Container, Header, Separator, Title } from './styles';
import { Form } from '../Form';
import { Table } from '../Table';
import { useEffect, useState } from "react";
import { api } from '../../lib/axios';

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

  async function getUsers() {
    try {
      const response = await api.get("http://localhost:4000");
      setUsers(
        response.data.sort((previous: UserData, next: UserData) => (previous.name > next.name ? 1 : -1))
      );

      toast.success(response.data.message);
    } catch(error: any) {
      toast.error(error.data.message);
    }
  }

  async function handleDelete(id: string) {
    try {
      const response = await api.delete("/" + id);
      const deletedUser: UserData = response.data;
  
      const newArray = users.filter((user) => user.id !== deletedUser.id);
      setUsers(newArray);
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.data.message);
    }
  }

  function handleEdit(user: UserDataEdit) {
    setOnEdit(user);
  }
  
  useEffect(() => {
    getUsers();
  }, [setUsers]);

  return (
    <Box>
      <Header>
        <Title>Listagem de Usuários Cadastrados</Title>
      </Header>

      <Separator />

      <Container>
        <Form 
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getUsers={getUsers}
        />
      </Container>

      <Table 
        users={users} 
        setUsers={setUsers} 
        setOnEdit={setOnEdit} 
        handleEdit={handleEdit} 
        handleDelete={handleDelete}
      />

      <ToastContainer 
        autoClose={3000}
        position={toast.POSITION.BOTTOM_LEFT}
      />
    </Box>
  )
}