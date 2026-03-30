import { textColor } from '../utils/colors';
import titleBackground from '../../images/titleBackground.jpeg';

export default {
  titleBackgroundImage: {
    backgroundImage: `url(${titleBackground})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '145vw',
    padding: 5,
  },
  titleText: {
    fontSize: '4rem',
    fontWeight: 700,
    lineHeight: '1.1',
    color: textColor,
  },
  subtitleText: {
    fontStyle: 'italic',
  },
};
