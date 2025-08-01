
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Gamepad2, Brain, Clock, Sparkles, Users, ExternalLink, Play } from "lucide-react";
import { games } from "@/data/games";
import { Badge } from "@/components/ui/badge";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter 
} from "@/components/ui/dialog";

const GameListing = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGame, setSelectedGame] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const gameCategories = Array.from(new Set(games.map(game => game.category)));

  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          game.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          game.benefits.some(benefit => 
                            benefit.toLowerCase().includes(searchTerm.toLowerCase())
                          );
    const matchesCategory = selectedCategory === "all" || game.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const openGameDetails = (game: any) => {
    setSelectedGame(game);
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold">Mental Health Games & Activities</h1>
        <p className="text-muted-foreground max-w-3xl">
          Engage with fun, interactive games designed to boost your mood, improve cognitive function, 
          and provide a positive distraction when you're feeling down or anxious.
        </p>
      </div>

      <div className="bg-meant-50 border border-meant-100 rounded-lg p-6 my-8">
        <h2 className="text-xl font-semibold text-meant-800 mb-2">Why Games for Mental Health?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center mb-2">
              <div className="bg-meant-100 rounded-full p-2 mr-3">
                <Brain className="h-5 w-5 text-meant-700" />
              </div>
              <h3 className="font-medium text-meant-800">Cognitive Benefits</h3>
            </div>
            <p className="text-sm text-meant-600">Improve focus, problem-solving, and mental flexibility through engaging gameplay</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center mb-2">
              <div className="bg-meant-100 rounded-full p-2 mr-3">
                <Sparkles className="h-5 w-5 text-meant-700" />
              </div>
              <h3 className="font-medium text-meant-800">Emotional Regulation</h3>
            </div>
            <p className="text-sm text-meant-600">Games provide a healthy outlet for emotions and can help stabilize mood</p>
          </div>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <div className="flex items-center mb-2">
              <div className="bg-meant-100 rounded-full p-2 mr-3">
                <Users className="h-5 w-5 text-meant-700" />
              </div>
              <h3 className="font-medium text-meant-800">Social Connection</h3>
            </div>
            <p className="text-sm text-meant-600">Multiplayer games foster connections and reduce feelings of isolation</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 my-8">
        <div className="flex-1">
          <Input
            placeholder="Search games by name, description or benefits..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          <Button 
            variant={selectedCategory === "all" ? "default" : "outline"}
            onClick={() => setSelectedCategory("all")}
            className="flex items-center"
          >
            <Gamepad2 className="mr-2 h-4 w-4" />
            All Games
          </Button>
          {gameCategories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {filteredGames.map((game) => (
          <Card key={game.id} className="overflow-hidden hover:shadow-lg transition-shadow h-full flex flex-col">
            <div className="relative">
              <img 
                src={game.image} 
                alt={game.title} 
                className="w-full h-48 object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                }}
              />
              <div className="absolute top-2 right-2">
                <Badge className="bg-meant-600">
                  {game.category}
                </Badge>
              </div>
            </div>
            <CardHeader className="pb-2">
              <CardTitle>{game.title}</CardTitle>
              <CardDescription className="flex items-center">
                <Clock size={16} className="mr-2" />
                {game.duration}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4 flex-grow">
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{game.description}</p>
              
              <div>
                <h4 className="text-sm font-medium mb-1">Benefits:</h4>
                <div className="flex flex-wrap gap-2">
                  {game.benefits.slice(0, 3).map((benefit, index) => (
                    <Badge key={index} variant="outline" className="bg-meant-50">
                      {benefit}
                    </Badge>
                  ))}
                  {game.benefits.length > 3 && (
                    <Badge variant="outline" className="bg-meant-50">
                      +{game.benefits.length - 3} more
                    </Badge>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              {game.externalLink ? (
                <a href={game.externalLink} target="_blank" rel="noopener noreferrer" className="w-full">
                  <Button 
                    variant="outline" 
                    className="w-full"
                  >
                    <ExternalLink className="mr-2 h-4 w-4" /> Play Online
                  </Button>
                </a>
              ) : (
                <Button 
                  variant="meant" 
                  className="w-full"
                  onClick={() => openGameDetails(game)}
                >
                  <Play className="mr-2 h-4 w-4" /> Learn More
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredGames.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium">No games found matching your criteria</h3>
          <p className="text-muted-foreground mt-2">Try adjusting your filters or search term</p>
        </div>
      )}

      {/* Game Details Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedGame && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-2">
                  <DialogTitle>{selectedGame.title}</DialogTitle>
                  <Badge className="bg-meant-600">
                    {selectedGame.category}
                  </Badge>
                </div>
                <DialogDescription>
                  <div className="flex items-center text-sm mt-1">
                    <Clock size={14} className="mr-1" />
                    {selectedGame.duration}
                  </div>
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="mb-6">
                  <img 
                    src={selectedGame.image} 
                    alt={selectedGame.title} 
                    className="w-full h-64 object-cover rounded-md"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80";
                    }}
                  />
                </div>
                
                <h3 className="font-medium text-lg mb-2">Description</h3>
                <p className="text-muted-foreground mb-4">{selectedGame.description}</p>
                
                <h3 className="font-medium text-lg mb-2">How to Play</h3>
                <ol className="list-decimal list-inside space-y-1 text-muted-foreground mb-4">
                  {selectedGame.howToPlay.map((step: string, index: number) => (
                    <li key={index}>{step}</li>
                  ))}
                </ol>
                
                <h3 className="font-medium text-lg mb-2">Benefits</h3>
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedGame.benefits.map((benefit: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-meant-50">
                      {benefit}
                    </Badge>
                  ))}
                </div>
                
                {selectedGame.tips && (
                  <>
                    <h3 className="font-medium text-lg mb-2">Tips</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {selectedGame.tips.map((tip: string, index: number) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
              
              <DialogFooter>
                {selectedGame.externalLink ? (
                  <a href={selectedGame.externalLink} target="_blank" rel="noopener noreferrer">
                    <Button>
                      <ExternalLink className="mr-2 h-4 w-4" /> Play Online
                    </Button>
                  </a>
                ) : (
                  <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GameListing;
