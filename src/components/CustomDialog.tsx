import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, IconButton, CircularProgress, Tab, Tabs, Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';

const CustomDialog = ({ open, handleClose, characterId, size }) => {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState(0);

  useEffect(() => {
    if (open && characterId) {
      setLoading(true);
      axios.get(`https://akabab.github.io/starwars-api/api/id/${characterId}.json`)
        .then((response) => {
          setCharacter(response.data);
        })
        .catch((error) => {
          console.error('Erro ao buscar detalhes do personagem:', error);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [open, characterId]);

  if (!character) return null;

  return (
    <Dialog open={open} onClose={handleClose} maxWidth={size} fullWidth sx={{ backdropFilter: 'blur(10px)' }}>
      <DialogTitle sx={{ backgroundColor: '#121212', color: '#f2c12e' }}>
        {loading ? 'Carregando...' : character.name}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: 'white',
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          backgroundColor: '#121212',
          color: '#f2c12e',
          maxHeight: '70vh',
          overflowY: 'auto',
          padding: 3,
          '&::-webkit-scrollbar': {
            width: '6px',
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#f2c12e',
            borderRadius: '10px',
          },
        }}
      >
        {loading ? (
          <CircularProgress color="primary" style={{ display: 'block', margin: '20px auto' }} />
        ) : (
          <>
            <Box display="flex" justifyContent="center" marginBottom={2}>
              <img
                src={character.image}
                alt={character.name}
                style={{
                  width: '60%',
                  borderRadius: '10px',
                  maxHeight: '400px',
                  objectFit: 'contain',
                }}
              />
            </Box>

            {/* Tabs */}
            <Tabs value={tabIndex} onChange={(e, newIndex) => setTabIndex(newIndex)} centered sx={{ backgroundColor: '#1a1a1a', color: '#f2c12e' }}>
              <Tab label="Geral" />
              <Tab label="Aparência" />
              <Tab label="Afiliados" />
              <Tab label="Treinamento" />
            </Tabs>

            {/* Conteúdo das Abas */}
            <Box marginTop={2}>
              {tabIndex === 0 && (
                <Box>
                  <Typography><strong>Nome:</strong> {character.name}</Typography>
                  <Typography><strong>Nascimento:</strong> {character.born} ABY</Typography>
                  <Typography><strong>Local de Nascimento:</strong> {character.bornLocation}</Typography>
                  <Typography><strong>Morte:</strong> {character.died ? `${character.died} ABY` : 'N/A'}</Typography>
                  <Typography><strong>Local da Morte:</strong> {character.diedLocation || 'N/A'}</Typography>
                  <Typography><strong>Espécie:</strong> {character.species}</Typography>
                  <Typography><strong>Gênero:</strong> {character.gender}</Typography>
                  <Typography><a href={character.wiki} target="_blank" rel="noopener noreferrer" style={{ color: '#f2c12e' }}>Wiki</a></Typography>
                </Box>
              )}

              {tabIndex === 1 && (
                <Box>
                  <Typography><strong>Altura:</strong> {character.height}m</Typography>
                  <Typography><strong>Peso:</strong> {character.mass}kg</Typography>
                  <Typography><strong>Cor do Cabelo:</strong> {character.hairColor}</Typography>
                  <Typography><strong>Cor dos Olhos:</strong> {character.eyeColor}</Typography>
                  <Typography><strong>Cor da Pele:</strong> {character.skinColor}</Typography>
                  <Typography><strong>Cibernética:</strong> {character.cybernetics || 'Nenhuma'}</Typography>
                </Box>
              )}

              {tabIndex === 2 && (
                <Box>
                  <Typography><strong>Afiliado a:</strong></Typography>
                  <ul>
                    {character?.affiliations?.length > 0 ? character?.affiliations.map((aff, index) => (
                      <li key={index}>{aff}</li>
                    )) : <Typography>Nenhuma afiliação registrada.</Typography>}
                  </ul>
                  <Typography><strong>Afiliado anteriormente:</strong></Typography>
                  <ul>
                    {character?.formerAffiliations?.length > 0 ? character?.formerAffiliations?.map((aff, index) => (
                      <li key={index}>{aff}</li>
                    )) : <Typography>Nenhuma afiliação anterior.</Typography>}
                  </ul>
                </Box>
              )}

              {tabIndex === 3 && (
                <Box>
                  <Typography><strong>Mestres:</strong></Typography>
                  <ul>
                    {character?.masters?.length > 0 ? character?.masters?.map((master, index) => (
                      <li key={index}>{master}</li>
                    )) : <Typography>Sem mestres registrados.</Typography>}
                  </ul>
                  <Typography><strong>Aprendizes:</strong></Typography>
                  <ul>
                    {character?.apprentices?.length > 0 ? character?.apprentices?.map((apprentice, index) => (
                      <li key={index}>{apprentice}</li>
                    )) : <Typography>Sem aprendizes registrados.</Typography>}
                  </ul>
                </Box>
              )}
            </Box>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CustomDialog;
