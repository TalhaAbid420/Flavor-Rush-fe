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
  actionButton: React.ReactNode;
  imageFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
}

export function FoodCard({ name, desc, image, actionButton, imageFit = 'cover' }: FoodCardProps) {
  return (
    <Card sx={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ width: '100%', overflow: 'hidden', background: '#f5f5f5' }}>
        <img
          src={image}
          alt={name}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {desc}
        </Typography>
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        {actionButton}
      </CardActions>
    </Card>
  );
}
