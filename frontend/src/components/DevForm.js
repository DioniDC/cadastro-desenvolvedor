import { useState } from 'react';

export default function DevForm({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    nome: '',
    nivel_id: '',
    sexo: 'M',
    data_nascimento: '',
    hobby: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formData.nome}
        onChange={(e) => setFormData({...formData, nome: e.target.value})}
        placeholder="Nome"
        required
      />
      {/* Adicione os outros campos aqui */}
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}