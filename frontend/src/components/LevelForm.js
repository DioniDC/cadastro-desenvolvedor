import { useState } from 'react';

export default function LevelForm({ onSubmit, onCancel }) {
  const [nivel, setNivel] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nivel.trim()) return;
    onSubmit({ nivel });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={nivel}
        onChange={(e) => setNivel(e.target.value)}
        placeholder="Nome do nível"
        required
      />
      <button type="submit">Salvar</button>
      <button type="button" onClick={onCancel}>Cancelar</button>
    </form>
  );
}
