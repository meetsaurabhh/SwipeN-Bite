import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { MapPin } from 'lucide-react';

const majorIndianCities = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Hyderabad",
  "Chennai",
  "Kolkata",
  "Ahmedabad",
  "Pune",
  "Jaipur",
  "Surat",
  "Lucknow",
  "Kanpur",
  "Nagpur",
  "Indore",
  "Thane",
  "Bhopal",
  "Visakhapatnam",
  "Patna",
  "Vadodara",
  "Ghaziabad"
];

interface LocationSelectProps {
  onLocationSelect: (city: string) => void;
}

export function LocationSelect({ onLocationSelect }: LocationSelectProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const navigate = useNavigate();

  const filteredCities = majorIndianCities.filter(city =>
    city.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
    onLocationSelect(city);
    navigate('/home');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Select Your City</CardTitle>
          <CardDescription className="text-center">
            Choose your location to discover amazing food around you
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search for your city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>

          <div className="grid grid-cols-2 gap-2 max-h-[400px] overflow-y-auto">
            {filteredCities.map((city) => (
              <Button
                key={city}
                variant={selectedCity === city ? "default" : "outline"}
                className="justify-start"
                onClick={() => handleCitySelect(city)}
              >
                <MapPin className="h-4 w-4 mr-2" />
                {city}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 