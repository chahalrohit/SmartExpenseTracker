import { HomeTransactionItem } from '../types/home';
import images from '../assets/images';

export const HomeTransaction: HomeTransactionItem[] = [
  {
    id: 1,
    icon: images.grocery,
    name: 'Grocery Store',
    date: 'Apr 23',
    amount: 120.0,
  },
  {
    id: 2,
    icon: images.spotify,
    name: 'Spotify',
    date: 'Apr 20',
    amount: 30.0,
  },
  {
    id: 1,
    icon: images.online,
    name: 'Online Store',
    date: 'Apr 18',
    amount: 250.0,
  },
  {
    id: 1,
    icon: images.alice,
    name: 'Alice',
    date: 'Apr 16',
    amount: 5.0,
  },
  {
    id: 1,
    icon: images.restaurant,
    name: 'Restaurant',
    date: 'Apr 15',
    amount: 2.0,
  },
];
