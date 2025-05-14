import { useCallback, useEffect, useState } from 'react';
import {
  Container, Form, Button, Row, Col, Alert, Table, Modal
} from 'react-bootstrap';
import {
  getDevs, getLevels, createDev, deleteDev, updateDev
} from '../services/api';

export default function DevsPage() {
  const [devs, setDevs] = useState([]);
  const [levels, setLevels] = useState([]);
  const [formData, setFormData] = useState({
    nome: '',
    nivel_id: '',
    sexo: 'M',
    data_nascimento: '',
    hobby: ''
  });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [modalError, setModalError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [idToDelete, setIdToDelete] = useState(null);

  const loadDevs = useCallback(async () => {
    try {
      const response = await getDevs(debouncedSearch);
      setDevs(response.data);
      setError('');
    } catch (err) {
      setDevs([]);
      setError('Nenhum desenvolvedor encontrado');
      setTimeout(() => setError(''), 3000);
    }
  }, [debouncedSearch]);

  useEffect(() => {
    loadLevels();
    loadDevs();
  }, [loadDevs]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

  useEffect(() => {
    loadDevs();
  }, [debouncedSearch, loadDevs]);

  const loadLevels = async () => {
    try {
      const res = await getLevels();
      setLevels(res.data);
    } catch {
      setError('Erro ao carregar níveis');
      setTimeout(() => setError(''), 3000);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(formData.data_nascimento) > new Date()) {
      setModalError('Impossivel Cadastrar quem ainda nem nasceu! :)');
      setTimeout(() => setModalError(''), 3000);
      return;
    }

    try {
      if (editingId) {
        await updateDev(editingId, formData);
        setSuccess('Desenvolvedor atualizado com sucesso');
      } else {
        await createDev(formData);
        setSuccess('Desenvolvedor cadastrado com sucesso');
      }
      setFormData({ nome: '', nivel_id: '', sexo: 'M', data_nascimento: '', hobby: '' });
      setEditingId(null);
      setShowForm(false);
      setModalError('');
      setTimeout(() => setSuccess(''), 3000);
      await loadDevs();
    } catch (err) {
      if (err.response && err.response.data && err.response.data.error) {
        setModalError(err.response.data.error);
      } else {
        setModalError('Erro ao salvar desenvolvedor');
      }
      setTimeout(() => setModalError(''), 3000);
    }
    
  };

  const handleEdit = (dev) => {
    setEditingId(dev.id);
    setFormData({
      nome: dev.nome,
      nivel_id: dev.nivel.id,
      sexo: dev.sexo,
      idade: dev.idade,
      data_nascimento: dev.data_nascimento.slice(0, 10),
      hobby: dev.hobby
    });
    setShowForm(true);
  };

  const askDelete = (id) => {
    setIdToDelete(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteDev(idToDelete);
      setSuccess('Desenvolvedor excluído com sucesso');
      setTimeout(() => setSuccess(''), 3000);
      await loadDevs();
    } catch (err) {
      setError(err?.response?.data?.error || 'Erro ao excluir desenvolvedor');
      setTimeout(() => setError(''), 3000);
    } finally {
      setShowConfirm(false);
      setIdToDelete(null);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Desenvolvedores</h2>

      {error && <Alert variant="danger" dismissible onClose={() => setError('')}>{error}</Alert>}
      {success && <Alert variant="success" dismissible onClose={() => setSuccess('')}>{success}</Alert>}

      <Form className="mb-3">
        <Row>
          <Col md={6}>
            <Form.Control
              placeholder="Digite o nome para buscar..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Col>
          <Col md="auto">
            <Button
              variant="dark"
              onClick={() => {
                setShowForm(true);
                setEditingId(null); // <-- limpa edição
                setFormData({ nome: '', nivel_id: '', sexo: 'M', data_nascimento: '', hobby: '' }); // <-- limpa formulário
              }}
            >
              Incluir novo
            </Button>
          </Col>
        </Row>
      </Form>

      <Modal show={showForm} onHide={() => setShowForm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{editingId ? 'Editar Desenvolvedor' : 'Novo Desenvolvedor'}</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {modalError && <Alert variant="danger" dismissible onClose={() => setModalError('')}>{modalError}</Alert>}
            <Form.Group className="mb-3">
              <Form.Label>Nome</Form.Label>
              <Form.Control name="nome" value={formData.nome} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Nível</Form.Label>
              <Form.Select name="nivel_id" value={formData.nivel_id} onChange={handleChange} required>
                <option value="">Selecione</option>
                {levels.map((nivel) => (
                  <option key={nivel.id} value={nivel.id}>{nivel.nivel}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Sexo</Form.Label>
              <Form.Select name="sexo" value={formData.sexo} onChange={handleChange}>
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Data de Nascimento</Form.Label>
              <Form.Control type="date" name="data_nascimento" value={formData.data_nascimento} onChange={handleChange} required />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Hobby</Form.Label>
              <Form.Control name="hobby" value={formData.hobby} onChange={handleChange} />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => {
              setShowForm(false);
              setEditingId(null);
              setFormData({ nome: '', nivel_id: '', sexo: 'M', data_nascimento: '', hobby: '' });
              setModalError('');
            }}>Cancelar</Button>
            <Button variant="dark" type="submit">
              {editingId ? 'Salvar Edição' : 'Cadastrar'}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Table bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Nível</th>
            <th>Sexo</th>
            <th>Idade</th>
            <th>Nascimento</th>
            <th>Hobby</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {devs.map((dev) => (
            <tr key={dev.id}>
              <td>{dev.nome}</td>
              <td>{dev.nivel?.nivel}</td>
              <td>{dev.sexo}</td>
              <td>{dev.idade}</td>
              <td>{dev.data_nascimento.split('-').reverse().join('/')}</td>
              <td>{dev.hobby}</td>
              <td>
                <Button
                  size="sm"
                  variant="outline-primary"
                  onClick={() => handleEdit(dev)}
                  className="me-2"
                >
                  Editar
                </Button>
                <Button
                  size="sm"
                  variant="outline-danger"
                  onClick={() => askDelete(dev.id)}
                  type="button"
                >
                  Excluir
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este desenvolvedor?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}