import { RouterName } from '../../AppRoutes/RouterNames';
import Menu from '../../../components/Menu/Menu';
import { MenuOptions } from '../../../shared/types/component';
import { Avatar, Box, Theme } from '@mui/material';
import Logo from '../../../asset/image/v-alphabet-icon.svg';
import CustomContainer from '../../../components/Container/CustomContainer';
import './Header.scss';
import { useTheme } from '@mui/material/styles';

const Header = () => {
  const { palette: themeColor } = useTheme();
  const itemsMenu: MenuOptions[] = [
    {
      label: 'Acceuil',
      path: "#headline",
      actived: false,
    },
    {
      label: 'Competences',
      path: '#skills',
      actived: false,
    },
    {
      label: 'Portfolio',
      path: '#project',
      actived: false,
    },
    {
      label: 'Contact',
      path: '#contact',
      actived: false,
    },
  ];
  return (
    <header
      className="header"
      style={{ background: themeColor.background.paper }}>
      <CustomContainer>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Avatar
            alt="Victoire Ondelet"
            src={Logo}
          />
          <Menu list={itemsMenu} />
        </Box>
      </CustomContainer>
    </header>
  );
};
export default Header;
