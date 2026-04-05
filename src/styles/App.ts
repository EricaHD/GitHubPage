import { textColor } from '../utils/colors';
import background from '../../images/nightsky_background.svg';

export default {
  backgroundImage: {
    backgroundImage: `url(${background})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    width: '100vw',
    height: '70vw',
    padding: 5,
  },
  titleText: {
    fontSize: '4rem',
    fontWeight: 700,
    lineHeight: '1.1',
    color: textColor,
  },
  subtitleText: {
    color: textColor,
    fontStyle: 'italic',
  },
};
