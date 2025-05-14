import { useEffect, useState, useRef } from 'react';
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  ListGroup,
  InputGroup,
} from 'react-bootstrap';
import {
  getLevels,
  createLevel,
  deleteLevel,
  updateLevel
} from '../services/api';
import { Modal } from 'react-bootstrap';

export default function LevelsPage() {
  const [levels, setLevels] = useState([]);
  const [newLevel, setNewLevel] = useState('');
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState('');
  const [success, setSuccess] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const debounceTimeoutRef = useRef();
  const [showModal, setShowModal] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [levelIdToDelete, setLevelIdToDelete] = useState(null);
  
  const loadLevels = async (search = '') => {
    try {
      const res = await getLevels(search);
      setLevels(res.data);
    } catch (err) {
      setError('Erro ao carregar níveis');
    }
  };

  const debounceSearch = (value) => {
    clearTimeout(debounceTimeoutRef.current);
    debounceTimeoutRef.current = setTimeout(() => {
      loadLevels(value);
    }, 400);
  };

  useEffect(() => {
    loadLevels();
  }, []);

  const handleAdd = async () => {
    if (!newLevel.trim()) return;

    try {
      await createLevel({ nivel: newLevel });
      setNewLevel('');
      setError('');
      loadLevels();
    } catch (err) {
      setError(err?.response?.data?.error || 'Erro ao adicionar nível');
    }
  };

  const askDelete = (id) => {
    setLevelIdToDelete(id);
    setShowConfirmDelete(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteLevel(levelIdToDelete);
      setSuccess('Nível deletado com sucesso');
      setTimeout(() => setSuccess(''), 3000);
      loadLevels();
    } catch (err) {
      setError(err?.response?.data?.error || 'Erro ao excluir nível');
      setTimeout(() => setError(''), 3000);
    } finally {
      setShowConfirmDelete(false);
      setLevelIdToDelete(null);
    }
  };

  const handleEdit = async () => {
    try {
      await updateLevel(editingId, { nivel: editingText });
      setEditingId(null);
      setEditingText('');
      setError('');
      loadLevels();
    } catch (err) {
      setError(err?.response?.data?.error || 'Erro ao editar nível');
    }
  };

  return (
    
    <Container className="mt-4">
    
      <h2 className="mb-4">Níveis</h2>

      {error && <Alert variant="danger" onClose={() => setError('')} dismissible>{error}</Alert>}
      {success && <Alert variant="success" onClose={() => setSuccess('')} dismissible>{success}</Alert>}

      <Row className="mb-3">
        <Col md={6}>
          <InputGroup>
            <Form.Control
              placeholder="Buscar nível"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                debounceSearch(e.target.value);
              }}
            />
          </InputGroup>
        </Col>

        <Col md={6}>
          <Button variant="dark" onClick={() => setShowModal(true)}>
            Incluir Nível
          </Button>
        </Col>

      </Row>
  <Modal show={showModal} onHide={() => setShowModal(false)}>
  <Modal.Header closeButton>
    <Modal.Title>Incluir Novo Nível</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form.Control
      placeholder="Digite o nome do nível"
      value={newLevel}
      onChange={(e) => setNewLevel(e.target.value)}
    />
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={() => setShowModal(false)}>
      Cancelar
    </Button>
    <Button
      variant="primary"
      onClick={async () => {
        await handleAdd();
        setShowModal(false);
      }}
    >
      Salvar
    </Button>
  </Modal.Footer>
</Modal>
      <ListGroup>
        {levels.map((nivel) => (
          <ListGroup.Item key={nivel.id}>
            {editingId === nivel.id ? (
              <>
                <Form.Control
                  className="mb-2"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <Button
                  variant="success"
                  size="sm"
                  onClick={handleEdit}
                  className="me-2"
                >
                  Salvar
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setEditingId(null);
                    setEditingText('');
                  }}
                >
                  Cancelar
                </Button>
              </>
            ) : (
              <>
                <strong>{nivel.nivel}</strong>
                <div className="float-end">
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => {
                      setEditingId(nivel.id);
                      setEditingText(nivel.nivel);
                    }}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => askDelete(nivel.id)}
                  >
                    Excluir
                  </Button>
                </div>
              </>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Modal show={showConfirmDelete} onHide={() => setShowConfirmDelete(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>Tem certeza que deseja excluir este nível?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmDelete(false)}>
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
