import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { UserMatch, userMatches, userPreferences, users } from '@/utils/mockData';
import { Users, Check, X, Clock, MessageSquare } from 'lucide-react';
import { Chat } from './Chat';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface FoodCupidProps {
  currentUserId: string;
}

export function FoodCupid({ currentUserId }: FoodCupidProps) {
  const [matches, setMatches] = useState<UserMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<UserMatch | null>(null);

  useEffect(() => {
    // In a real app, this would be an API call
    const userMatchesList = userMatches.filter(
      match => match.userId === currentUserId || match.matchedUserId === currentUserId
    );
    setMatches(userMatchesList);
    setLoading(false);
  }, [currentUserId]);

  const handleAcceptMatch = (matchId: string) => {
    setMatches(prevMatches =>
      prevMatches.map(match =>
        match.id === matchId ? { ...match, status: 'accepted' } : match
      )
    );
  };

  const handleRejectMatch = (matchId: string) => {
    setMatches(prevMatches =>
      prevMatches.map(match =>
        match.id === matchId ? { ...match, status: 'rejected' } : match
      )
    );
  };

  const getMatchStatus = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'accepted':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'rejected':
        return <X className="h-4 w-4 text-red-500" />;
      default:
        return null;
    }
  };

  const getMatchedUser = (match: UserMatch) => {
    const matchedUserId = match.userId === currentUserId ? match.matchedUserId : match.userId;
    return users.find(user => user.id === matchedUserId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Users className="h-6 w-6 text-primary" />
        <h2 className="text-2xl font-bold">Food Cupid</h2>
      </div>
      
      <p className="text-muted-foreground">
        Connect with food enthusiasts who share your taste preferences
      </p>

      {matches.length === 0 ? (
        <Card className="p-6 text-center">
          <p className="text-muted-foreground">No matches found yet. Start exploring to find your food soulmate!</p>
        </Card>
      ) : (
        <div className="grid gap-4">
          {matches.map((match) => {
            const matchedUser = getMatchedUser(match);
            const matchedUserPrefs = userPreferences[matchedUser?.id || ''];
            
            return (
              <Card key={match.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>{matchedUser?.username}</CardTitle>
                      <CardDescription className="flex items-center gap-2 mt-2">
                        {getMatchStatus(match.status)}
                        <span className="capitalize">{match.status}</span>
                      </CardDescription>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {match.matchScore}% Match
                    </Badge>
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Common Interests</h4>
                    <div className="flex flex-wrap gap-2">
                      {match.commonInterests.map((interest, index) => (
                        <Badge key={index} variant="outline">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2">Food Preferences</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Cuisine</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {matchedUserPrefs?.cuisine.map((cuisine, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {cuisine}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Dietary Restrictions</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {matchedUserPrefs?.dietaryRestrictions.length > 0 ? (
                            matchedUserPrefs.dietaryRestrictions.map((diet, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {diet}
                              </Badge>
                            ))
                          ) : (
                            <Badge variant="secondary" className="text-xs">None</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex justify-between items-center">
                  {match.status === 'pending' && (
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        onClick={() => handleRejectMatch(match.id)}
                      >
                        <X className="h-4 w-4 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleAcceptMatch(match.id)}
                      >
                        <Check className="h-4 w-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  )}
                  
                  {match.status === 'accepted' && (
                    <div className="flex items-center gap-4 w-full">
                      <p className="text-sm text-muted-foreground italic flex-1">
                        "Link between two Strangers: FOOD!"
                      </p>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button size="sm" variant="outline">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Chat
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <Chat
                            currentUserId={currentUserId}
                            matchedUserId={matchedUser?.id || ''}
                            matchedUsername={matchedUser?.username || ''}
                            onClose={() => setSelectedMatch(null)}
                          />
                        </DialogContent>
                      </Dialog>
                    </div>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
} 