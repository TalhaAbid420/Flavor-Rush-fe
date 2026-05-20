"use client";

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

interface FoodCardProps {
  name: string;
  desc: string;
  image: string;
  price: string;
  actionButton: React.ReactNode;
  imageFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export function FoodCard({ name, desc, image, price, actionButton, imageFit = 'cover' }: FoodCardProps) {
  return (
    <Card sx={{ 
      maxWidth: '100%', 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100%',
      transition: 'transform 0.3s ease-in-out',
      '&:hover': {
        transform: 'rotate(5deg)',
      },
      '&:hover .food-title::after': {
        transform: 'scaleX(1)',
        transformOrigin: 'bottom left',
      }
    }}>
      <div style={{ width: '100%', overflow: 'hidden', background: '#f5f5f5' }}>
        <img
          src={image}
          alt={name}
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: imageFit }}
        />
      </div>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography 
          className="food-title"
          gutterBottom 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 'bold',
            display: 'inline-block',
            position: 'relative',
            '&::after': {
              content: '""',
              position: 'absolute',
              width: '100%',
              transform: 'scaleX(0)',
              height: '2px',
              bottom: 0,
              left: 0,
              backgroundColor: 'currentColor',
              transformOrigin: 'bottom right',
              transition: 'transform 0.25s ease-out'
            }
          }}
        >
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
          {desc}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'text.primary', m: 0 }}>
          {price}
        </Typography>
        {actionButton}
      </CardActions>
    </Card>
  );
}
