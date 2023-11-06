import { ToastContainer, toast } from 'react-toastify';
import { Box, ButtonProp, Container, ContainerTable, Description, Header, InputArea, InputSearch, Label, Separator, Title } from './styles';
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

  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    if (searchQuery.length === 0) {
      getUsers();
    }
  }, [searchQuery]);

  useEffect(() => {
    const filteredUsers = users.filter((user) => {
      return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    });

    setUsers(filteredUsers);
  }, [searchQuery]);

  function toggleFormVisibility() {
    setIsFormVisible(!isFormVisible);
  }

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

      <InputArea>
        <Label>Buscar: </Label>
        <InputSearch 
          type="text"
          placeholder="Digite o nome do usuário"
          onChange={handleSearch} 
          value={searchQuery}
        />
      </InputArea>

      {users.length > 0 ? (
        <ContainerTable>
          <Table 
            users={users}
            setUsers={setUsers} 
            setOnEdit={setOnEdit} 
            handleEdit={handleEdit} 
            handleDelete={handleDelete}
            setModalDelete={setModalDelete}
            modalDelete={modalDelete}
          />
        </ContainerTable>
      ) : (
        <Description>Por favor, insira um usuário no banco de cadastros! Ou pesquise por outro nome.</Description>
      )}

      <ToastContainer 
        autoClose={3000}
        position={toast.POSITION.BOTTOM_LEFT}
      />
    </Box>
  )
}