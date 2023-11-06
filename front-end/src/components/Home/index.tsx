import { ToastContainer, toast } from 'react-toastify';
import { Box, ButtonProp, Container, ContainerTable, Description, Header, InputArea, InputSearch, Label, Separator, Title } from './styles';
import { Form } from '../Form';
import { Table } from '../Table';
import { useEffect, useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { useSettingsContext } from '../context/SettingsContext';

export function Home() {
  const { getUsers, toggleFormVisibility, users, isFormVisible, setUsers } = useSettingsContext();

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

  return (
    <Box>
      <Header>
        <Title>Listagem de Usuários Cadastrados</Title>
        <ButtonProp onClick={toggleFormVisibility}>Adicionar usuário</ButtonProp>
      </Header>

      <Separator />

      <Container>
        {isFormVisible && (
          <Form />
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
          <Table />
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