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
}

export function FoodCard({ name, desc, image, actionButton }: FoodCardProps) {
  return (
    <Card sx={{ maxWidth: '100%', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <CardMedia
        component="img"
        alt={name}
        height="180"
        image={image}
        sx={{ height: 180, objectFit: 'cover' }}
      />
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
