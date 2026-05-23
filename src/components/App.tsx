import { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from '../styles/App';
import { fetchFromAPI } from '../utils/api';

const App = () => {
  const [data, setData] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFromAPI('/data')
      .then((response) => setData(response.message))
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={styles.backgroundImage}>
      <Typography sx={styles.titleText}>
        GitHub Page
      </Typography>
      <Typography variant="subtitle1" marginTop={'20px'} sx={styles.subtitleText}>
        This is a GitHub page.
      </Typography>
      <Typography variant="subtitle1" marginTop={'20px'} sx={styles.subtitleText}>
        {data}
      </Typography>
    </Box>
  );
};

export default App;
