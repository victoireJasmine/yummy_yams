import {
  Instagram,
  SvgIconComponent,
  LinkedIn,
  Language,
} from '@mui/icons-material';
import { Avatar, Box, Link, Typography } from '@mui/material';
import React from 'react';

export interface SocialNetwork {
  name: string;
  link: string | '#';
  IconSocial: SvgIconComponent;
}
const socials: SocialNetwork[] = [
  {
    name: 'instagram',
    link: '#',
    IconSocial: Instagram,
  },
  {
    name: 'linkedin',
    link: '#',
    IconSocial: LinkedIn,
  },
  {
    name: 'website',
    link: '#',
    IconSocial: Language,
  },
];

const Footer = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 4,
        pb: 10,
      }}>
      <Typography> merci d'avoir fait défiler, c'est tout les amis</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 2,
        }}>
        {socials.map((social, index) => (
          <Avatar
            key={index}
            sx={{ width: 25, height: 25 }}>
            <social.IconSocial />
          </Avatar>
        ))}
      </Box>
    </Box>
  );
};
export default Footer;
