import React, { useState } from 'react';
import { MapPin, Calendar, Star, Heart, Users, Music } from 'lucide-react';

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

interface FestivalCardProps {
  festival: Festival;
  onLike: (id: string) => void;
  isLiked: boolean;
  onBookmark: (festival: Festival) => void;
}

const FestivalCard: React.FC<FestivalCardProps> = ({ 
  festival, 
  onLike, 
  isLiked, 
  onBookmark 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-600 to-pink-600 transform transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer ${
        isHovered ? 'shadow-2xl' : 'shadow-lg'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-80">
        <img 
          src={festival.image} 
          alt={festival.name}
          className={`w-full h-full object-cover transition-all duration-700 ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          } ${isHovered ? 'scale-110' : 'scale-100'}`}
          onLoad={() => setImageLoaded(true)}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        
        {/* Like Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onLike(festival.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all duration-300 ${
            isLiked 
              ? 'bg-red-500/80 text-white scale-110' 
              : 'bg-white/20 text-white hover:bg-white/30'
          }`}
        >
          <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
        </button>

        {/* Genre Badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-orange-500/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-white">
            {festival.genre}
          </span>
        </div>

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-2xl font-bold text-green-400">
              {festival.price}
            </span>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-white font-medium">{festival.rating}</span>
            </div>
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-2">{festival.name}</h3>
          
          <div className="flex items-center space-x-4 text-gray-200 mb-3">
            <div className="flex items-center space-x-1">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{festival.location}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{festival.date}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-4 w-4" />
              <span className="text-sm">{festival.attendees}</span>
            </div>
          </div>

          {/* Hover Content */}
          <div className={`transition-all duration-300 ${
            isHovered ? 'opacity-100 max-h-40' : 'opacity-0 max-h-0'
          } overflow-hidden`}>
            <p className="text-gray-300 text-sm mb-3">{festival.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {festival.highlights.map((highlight, index) => (
                <span 
                  key={index}
                  className="bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white"
                >
                  {highlight}
                </span>
              ))}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onBookmark(festival);
              }}
              className="w-full bg-gradient-to-r from-orange-500 to-pink-500 py-2 rounded-lg font-semibold text-white hover:from-orange-600 hover:to-pink-600 transition-all transform hover:scale-105"
            >
              Réserver maintenant
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FestivalCard;