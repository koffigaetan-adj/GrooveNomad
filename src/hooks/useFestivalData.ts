import { useState, useEffect } from 'react';

interface Festival {
  id: string;
  name: string;
  location: string;
  date: string;
  image: string;
  genre: string;
  price: string;
  rating: number;
  attendees: string;
  description: string;
  highlights: string[];
}

const useFestivalData = () => {
  const [festivals, setFestivals] = useState<Festival[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFestivals = async () => {
      try {
        setLoading(true);
        
        // Simulate API call with mock data
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        const mockFestivals: Festival[] = [
          {
            id: '1',
            name: 'Tomorrowland',
            location: 'Boom, Belgique',
            date: 'Juillet 2025',
            image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
            genre: 'EDM',
            price: '1250€',
            rating: 4.9,
            attendees: '400K+',
            description: 'Le festival EDM le plus magique au monde avec des décors féeriques et une production exceptionnelle.',
            highlights: ['Mainstage légendaire', 'DreamVille camping', '15 stages', 'Artistes internationaux']
          },
          {
            id: '2',
            name: 'Coachella',
            location: 'Californie, USA',
            date: 'Avril 2025',
            image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
            genre: 'Multi-genre',
            price: '1800€',
            rating: 4.7,
            attendees: '250K+',
            description: 'L\'expérience festival ultime alliant musique, art et mode dans le désert californien.',
            highlights: ['Art installations', 'Fashion week', 'Célébrités', 'Desert vibes']
          },
          {
            id: '3',
            name: 'Burning Man',
            location: 'Nevada, USA',
            date: 'Août 2025',
            image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
            genre: 'Art & Music',
            price: '2200€',
            rating: 4.8,
            attendees: '80K+',
            description: 'Une expérience transformatrice unique mêlant art, musique et communauté dans le désert.',
            highlights: ['Art radical', 'Communauté', 'Survie désert', 'Transformation']
          },
          {
            id: '4',
            name: 'Glastonbury',
            location: 'Somerset, Angleterre',
            date: 'Juin 2025',
            image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
            genre: 'Rock/Pop',
            price: '950€',
            rating: 4.6,
            attendees: '200K+',
            description: 'Le festival britannique légendaire avec une programmation éclectique et une ambiance unique.',
            highlights: ['Pyramid Stage', 'Mud & music', 'Légendes rock', 'Ambiance british']
          },
          {
            id: '5',
            name: 'Ultra Music Festival',
            location: 'Miami, USA',
            date: 'Mars 2025',
            image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
            genre: 'EDM',
            price: '1600€',
            rating: 4.5,
            attendees: '165K+',
            description: 'Le temple de la musique électronique avec les plus grands DJs de la planète.',
            highlights: ['Main Stage épique', 'Miami vibes', 'Pool parties', 'DJ legends']
          },
          {
            id: '6',
            name: 'Sziget Festival',
            location: 'Budapest, Hongrie',
            date: 'Août 2025',
            image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
            genre: 'Multi-genre',
            price: '850€',
            rating: 4.4,
            attendees: '500K+',
            description: 'L\'île de la liberté avec 7 jours de musique non-stop et une ambiance européenne unique.',
            highlights: ['Île du Danube', '7 jours non-stop', 'Prix abordable', 'Diversité musicale']
          }
        ];
        
        setFestivals(mockFestivals);
        setError(null);
      } catch (err) {
        setError('Erreur lors du chargement des festivals');
        console.error('Error fetching festivals:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchFestivals();
  }, []);

  const getFestivalById = (id: string) => {
    return festivals.find(festival => festival.id === id);
  };

  const getFestivalsByGenre = (genre: string) => {
    return festivals.filter(festival => 
      festival.genre.toLowerCase().includes(genre.toLowerCase())
    );
  };

  const searchFestivals = (query: string) => {
    return festivals.filter(festival =>
      festival.name.toLowerCase().includes(query.toLowerCase()) ||
      festival.location.toLowerCase().includes(query.toLowerCase()) ||
      festival.genre.toLowerCase().includes(query.toLowerCase())
    );
  };

  return {
    festivals,
    loading,
    error,
    getFestivalById,
    getFestivalsByGenre,
    searchFestivals
  };
};

export default useFestivalData;