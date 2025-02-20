import { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardMedia, CardContent, Typography, CircularProgress, Button, Stack } from '@mui/material';
import CustomDialog from './CustomDialog';

const CharacterList = () => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;
  const [selectedCharacter, setSelectedCharacter] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://akabab.github.io/starwars-api/api/all.json');
        setCharacters(response.data);
      } catch (error) {
        console.error('Erro ao buscar personagens:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  const paginatedCharacters = characters.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleCharacterClick = (character) => {
    setSelectedCharacter(character);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCharacter(null);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Typography variant="h1" color="primary" align="center">
        Personagens de Star Wars
      </Typography>

      {loading ? (
        <CircularProgress color="primary" style={{ display: 'block', margin: '20px auto' }} />
      ) : (
        <>
          <Grid container spacing={3} justifyContent="center">
            {paginatedCharacters.map((character) => (
              <Grid item key={character.id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ backgroundColor: '#121212', color: 'white', cursor: 'pointer' }} onClick={() => handleCharacterClick(character)}>
                  <CardMedia component="img" height="300" image={character.image} alt={character.name} />
                  <CardContent>
                    <Typography variant="h5">{character.name}</Typography>
                    
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Botões de Paginação */}
          <Stack direction="row" spacing={2} justifyContent="center" sx={{ marginTop: '20px' }}>
            <Button variant="contained" color="secondary" onClick={() => setPage(page - 1)} disabled={page === 1}>
              Página Anterior
            </Button>
            <Button variant="contained" color="primary" onClick={() => setPage(page + 1)} disabled={page * itemsPerPage >= characters.length}>
              Próxima Página
            </Button>
          </Stack>
        </>
      )}


      <CustomDialog open={dialogOpen} handleClose={handleCloseDialog} characterId={selectedCharacter?.id} size={"md"} />
    </div>
  );
};

export default CharacterList;
