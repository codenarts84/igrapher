import React from 'react';
import { Box, Card } from '@mui/material';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const CardStyle = {
  position: 'absolute',
  right: '80px',
  top: '100px',
  width: '220px',
  maxWidth: '100%',
  overflow: 'auto',
  zIndex: 1000
};

const DeleteStyle = {
  position: 'absolute',
  fontSize: '16px',
  right: '10px',
  color: 'red',
  top: '10px',
  fontWeight: 'bold',
  cursor: 'pointer'
};

const InfoBox = ({ content, onClose, properties }) => {
  return (
    <Card sx={CardStyle}>
      <CardContent>
        <Box sx={DeleteStyle} onClick={onClose}>
          ×
        </Box>
        <Typography
          variant="body2"
          component="p"
          style={{ fontSize: '1.5rem' }}
        >
          {properties &&
            Object.entries(properties).map(([key, value], index) => (
              <div key={index} style={{ marginTop: '10px' }}>
                <strong>{key}:</strong> {String(value)}
              </div>
            ))}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
