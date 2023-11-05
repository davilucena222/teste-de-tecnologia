import { TableContainer, Tbody, Td, Th, Thead, Tr } from "./styles";
import { FaTrash, FaEdit } from "react-icons/fa";

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

interface TableProps {
  users: UserData[];
  setUsers: (users: UserData[]) => void;
  setOnEdit: (user: UserDataEdit) => void;
  handleEdit: (user: UserDataEdit) => void;
  handleDelete: (id: string) => void;
}
 
export function Table({ users, handleEdit, handleDelete }: TableProps) {
  return (
    <TableContainer>
      <Thead>
        <Tr>
          <Th>Nome</Th>
          <Th>Email</Th>
          <Th>Telefone</Th>
          <Th></Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {users.map((user) => (
          <Tr key={user.id}>
            <Td width="30%">{user.name}</Td>
            <Td width="30%">{user.email}</Td>
            <Td width="30%">{user.phone}</Td>

            <Td align={"center"} width="5%">
              <FaEdit onClick={() => handleEdit(user)} />
            </Td>
            <Td align={"center"} width="5%">
              <FaTrash onClick={() => handleDelete(user.id)} />
            </Td>
          </Tr>
        ))}
      </Tbody>
    </TableContainer>
  );
}