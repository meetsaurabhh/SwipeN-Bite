import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Navbar } from '@/components/Navbar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { MessageCircle, Image as ImageIcon, Hash } from 'lucide-react';

interface Tweet {
  id: string;
  username: string;
  handle: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  hashtags: number;
}

const TweetAbout = () => {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [tweet, setTweet] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [tweets, setTweets] = useState<Tweet[]>([
    {
      id: '1',
      username: 'Jane Doe',
      handle: 'janedoe',
      content: 'Just discovered this amazing Italian restaurant! The pasta was absolutely divine 🍝 #FoodieAdventures #ItalianCuisine',
      timestamp: '2h',
      likes: 12,
      comments: 12,
      hashtags: 3
    },
    {
      id: '2',
      username: 'Mike Smith',
      handle: 'mikesmith',
      content: 'The new sushi place in town is a game-changer! 🍱 #SushiLovers #FoodDiscovery',
      timestamp: '5h',
      likes: 8,
      comments: 8,
      hashtags: 2
    }
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/auth');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tweet.trim() || !user) return;

    setIsSubmitting(true);
    
    // Create new tweet
    const newTweet: Tweet = {
      id: Date.now().toString(),
      username: user.username,
      handle: user.username.toLowerCase().replace(/\s+/g, ''),
      content: tweet,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      hashtags: (tweet.match(/#\w+/g) || []).length
    };

    // Add new tweet to the beginning of the list
    setTweets(prevTweets => [newTweet, ...prevTweets]);
    
    // Reset form
    setTweet('');
    setIsSubmitting(false);
  };

  const handleLike = (tweetId: string) => {
    setTweets(prevTweets =>
      prevTweets.map(tweet =>
        tweet.id === tweetId
          ? { ...tweet, likes: tweet.likes + 1 }
          : tweet
      )
    );
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 page-container py-12">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-10 animate-fade-in">
            <h1 className="text-3xl font-bold">Share Your Food Journey</h1>
            <p className="text-muted-foreground mt-2">
              Tweet about your food experiences and connect with other food lovers
            </p>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Create a Tweet</CardTitle>
              <CardDescription>
                Share your thoughts about food, restaurants, or your latest food adventure
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">
                      {user.username[0].toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1">
                    <Textarea
                      placeholder="What's on your mind?"
                      value={tweet}
                      onChange={(e) => setTweet(e.target.value)}
                      className="min-h-[100px] resize-none"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Button type="button" variant="ghost" size="icon">
                      <ImageIcon className="h-5 w-5" />
                    </Button>
                    <Button type="button" variant="ghost" size="icon">
                      <Hash className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button 
                    type="submit" 
                    disabled={!tweet.trim() || isSubmitting}
                  >
                    {isSubmitting ? 'Posting...' : 'Post Tweet'}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <h2 className="text-2xl font-semibold">Recent Tweets</h2>
            <div className="space-y-4">
              {tweets.map((tweet) => (
                <Card key={tweet.id}>
                  <CardContent className="pt-6">
                    <div className="flex gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <span className="text-primary font-semibold">
                          {tweet.username[0].toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">{tweet.username}</span>
                          <span className="text-muted-foreground text-sm">@{tweet.handle}</span>
                          <span className="text-muted-foreground text-sm">· {tweet.timestamp}</span>
                        </div>
                        <p className="mb-4">{tweet.content}</p>
                        <div className="flex items-center gap-4 text-muted-foreground">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="gap-2"
                            onClick={() => handleLike(tweet.id)}
                          >
                            <MessageCircle className="h-4 w-4" />
                            <span>{tweet.likes}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <MessageCircle className="h-4 w-4" />
                            <span>{tweet.comments}</span>
                          </Button>
                          <Button variant="ghost" size="sm" className="gap-2">
                            <Hash className="h-4 w-4" />
                            <span>{tweet.hashtags}</span>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default TweetAbout;
