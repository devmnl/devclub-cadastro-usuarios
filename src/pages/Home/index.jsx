import { useEffect, useState, useRef } from 'react'
import './style.css'
import Trash from '../../assets/trash.svg'
import api from '../../services/api'

function Home() {
  const [users, setUsers] = useState([]);
  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    try {
      const userFromApi = await api.get('/usuarios');
      setUsers(userFromApi.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  async function createUsers() {
    const name = inputName.current.value;
    const age = inputAge.current.value;
    const email = inputEmail.current.value;

    if (!name || !age || !email) {
      alert("Todos os campos são obrigatórios.");
      return;
    }

    try {
      await api.post('/usuarios', { name, age, email });
      getUsers();
    } catch (error) {
      console.error("Erro ao criar usuário:", error);
    }
  }

  async function deleteUsers(id) {
    try {
      await api.delete(`/usuarios/${id}`);
      getUsers();
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className='container'>
      <form>
        <h1>Cadastro de Usuários</h1>
        <input placeholder="Nome" name='nome' type='text' ref={inputName} />
        <input placeholder="Idade" name='idade' type='number' ref={inputAge} />
        <input placeholder="E-mail" name='email' type='email' ref={inputEmail} />
        <button type='button' onClick={createUsers}>Cadastrar</button>
      </form>

      {users.map(user => (
        <div key={user.id} className='card'>
          <div>
            <p>Nome: <span>{user.name}</span></p>
            <p>Idade: <span>{user.age}</span></p>
            <p>Email: <span>{user.email}</span></p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt='Excluir' />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Home
