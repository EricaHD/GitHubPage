import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import styles from '../styles/App';

const App = () => {
  return (
    <Box sx={styles.backgroundImage}>
      <Typography sx={styles.titleText}>
        GitHub Page
      </Typography>
      <Typography variant="subtitle1" marginTop={'20px'} sx={styles.subtitleText}>
        This is a GitHub page.
      </Typography>
    </Box>
  );
};

export default App;
